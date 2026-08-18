"use client";

import { useEffect, useState } from "react";
import {
  canShareFiles,
  fileFromSource,
  filenameFor,
  probeCanShareMedia,
  shareMediaFile,
} from "@/lib/save-to-photos";

export default function PhotoViewer({ photo, onClose, shareTitle }) {
  const [resolvedFile, setResolvedFile] = useState(null);
  const [shareSupported, setShareSupported] = useState(false);
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setShareSupported(probeCanShareMedia());
  }, []);

  useEffect(() => {
    if (!photo) {
      setResolvedFile(null);
      setHint("");
      setBusy(false);
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    const initialFile = photo.file instanceof File ? photo.file : null;
    setResolvedFile(initialFile);
    if (initialFile) {
      setShareSupported(canShareFiles([initialFile]));
    }
    setHint(
      probeCanShareMedia()
        ? "Açılan menüden Fotoğraflara Kaydet’i seçin."
        : photo.kind === "video"
          ? "Videoya basılı tutun ve Fotoğraflara Kaydet’i seçin."
          : "Görsele basılı tutun ve Fotoğraflara Kaydet’i seçin.",
    );

    if (!(photo.file instanceof File) && photo.src) {
      fileFromSource({
        src: photo.src,
        filename: filenameFor(photo.kind, photo.id),
        mimeType: photo.kind === "video" ? "video/mp4" : "image/jpeg",
      })
        .then((file) => {
          if (!cancelled) {
            setResolvedFile(file);
            setShareSupported(canShareFiles([file]));
          }
        })
        .catch(() => {
          if (!cancelled) setResolvedFile(null);
        });
    }

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  async function handleSave() {
    const holdHint =
      photo.kind === "video"
        ? "Videoya basılı tutun ve Fotoğraflara Kaydet’i seçin."
        : "Görsele basılı tutun ve Fotoğraflara Kaydet’i seçin.";

    setBusy(true);
    setHint(
      shareSupported
        ? "Açılan menüden Fotoğraflara Kaydet’i seçin."
        : holdHint,
    );

    try {
      const file =
        resolvedFile ||
        (await fileFromSource({
          file: photo.file,
          src: photo.src,
          filename: filenameFor(photo.kind, photo.id),
          mimeType: photo.kind === "video" ? "video/mp4" : "image/jpeg",
        }));

      if (file && canShareFiles([file])) {
        setHint("Açılan menüden Fotoğraflara Kaydet’i seçin.");
        await shareMediaFile(file, shareTitle);
        return;
      }

      setHint(holdHint);
    } catch (error) {
      if (error?.name === "AbortError") return;
      setHint(holdHint);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-ivory"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-viewer-title"
    >
      <div className="flex items-center justify-between px-6 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
        <p
          id="photo-viewer-title"
          className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze"
        >
          Anı
        </p>
        <button
          type="button"
          onClick={onClose}
          className="touch-manipulation font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-muted transition-colors hover:text-ink"
        >
          Kapat
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4">
        {photo.kind === "video" ? (
          <video
            src={photo.src}
            controls
            playsInline
            className="max-h-full max-w-full bg-ink/5 object-contain"
          />
        ) : (
          <img
            src={photo.src}
            alt={photo.alt || "Düğün anısı"}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-center sm:px-8">
        <button
          type="button"
          onClick={handleSave}
          disabled={busy}
          className="inline-flex min-h-12 w-full max-w-xs touch-manipulation items-center justify-center border border-bronze/50 px-6 py-3 font-sans text-[11px] font-medium tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory disabled:opacity-50"
        >
          FOTOĞRAFLARA KAYDET
        </button>
        <p className="mx-auto mt-4 max-w-xs font-serif text-sm font-light italic leading-6 text-muted">
          {hint}
        </p>
      </div>
    </div>
  );
}

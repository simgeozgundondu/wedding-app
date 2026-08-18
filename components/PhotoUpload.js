"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhotoViewer from "./PhotoViewer";
import { wedding } from "@/lib/wedding-data";

export default function PhotoUpload() {
  const fileInputId = useId();
  const fileInputRef = useRef(null);
  const closeButtonRef = useRef(null);
  const itemsRef = useRef([]);
  const albumRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [album, setAlbum] = useState([]);
  const [status, setStatus] = useState("idle");
  const [viewerPhoto, setViewerPhoto] = useState(null);

  const isUploading = status === "uploading";
  const isSuccess = status === "success";
  const photos = album;
  itemsRef.current = items;
  albumRef.current = album;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.preview));
      albumRef.current.forEach((photo) => {
        if (photo.src?.startsWith("blob:")) {
          URL.revokeObjectURL(photo.src);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape" && !isUploading) {
        closeSheet();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isUploading]);

  function resetForm(nextItems = []) {
    items.forEach((item) => {
      if (!nextItems.includes(item)) {
        URL.revokeObjectURL(item.preview);
      }
    });
    setItems(nextItems);
    setGuestName("");
    setMessage("");
    setStatus("idle");
  }

  function openSheet() {
    resetForm();
    setIsOpen(true);
  }

  function closeSheet() {
    if (isUploading) return;
    setIsOpen(false);
    items.forEach((item) => {
      const kept = album.some((photo) => photo.src === item.preview);
      if (!kept) URL.revokeObjectURL(item.preview);
    });
    setItems([]);
    setGuestName("");
    setMessage("");
    setStatus("idle");
  }

  function handleFiles(fileList) {
    const selected = Array.from(fileList || []).filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (selected.length === 0) return;

    setItems((current) => [
      ...current,
      ...selected.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        kind: file.type.startsWith("video/") ? "video" : "image",
      })),
    ]);
    setStatus("idle");
  }

  function removeItem(id) {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      const removed = current.find((item) => item.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (items.length === 0 || isUploading) return;

    setStatus("uploading");

    window.setTimeout(() => {
      const saved = items.map((item) => ({
        id: item.id,
        src: item.preview,
        kind: item.kind,
        file: item.file,
        alt: guestName.trim() || "Düğün anısı",
      }));
      setAlbum((current) => [...current, ...saved]);
      setItems([]);
      setGuestName("");
      setMessage("");
      setStatus("success");
    }, 800);
  }

  return (
    <section
      id="photos"
      className="scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze">
          Photos
        </p>

        <h2 className="mt-10 font-serif text-[1.65rem] font-light leading-snug tracking-[0.06em] text-ink sm:text-3xl sm:leading-snug">
          <span className="block">BU GECENİN ANILARINI</span>
          <span className="block">BİRLİKTE BİRİKTİRELİM</span>
        </h2>

        <div className="mx-auto mt-8 h-px w-10 bg-bronze/40" />

        <p className="mt-8 font-serif text-lg font-light italic leading-8 text-ink/80">
          <span className="block">Bu gece çektiğiniz fotoğraf ve videoları</span>
          <span className="block">bizimle paylaşın.</span>
        </p>

        <button
          type="button"
          onClick={openSheet}
          className="mt-14 inline-flex min-h-12 w-full max-w-xs touch-manipulation items-center justify-center border border-bronze/50 px-6 py-3 font-sans text-[11px] font-medium tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory"
        >
          FOTOĞRAF / VİDEO YÜKLE
        </button>

        {album.length > 0 && !isOpen && (
          <p className="mt-8 font-serif text-base font-light italic text-muted">
            Anınız albüme eklendi.
          </p>
        )}

        {photos.length > 0 && (
          <ul className="mt-16 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.id}>
                <button
                  type="button"
                  onClick={() => setViewerPhoto(photo)}
                  className="relative block aspect-[3/4] w-full overflow-hidden border border-line/80 bg-ivory-deep"
                >
                  {photo.kind === "video" ? (
                    <video
                      src={photo.src}
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.alt || "Düğün anısı"}
                      className="h-full w-full object-cover"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PhotoViewer
        photo={viewerPhoto}
        onClose={() => setViewerPhoto(null)}
        shareTitle={`${wedding.bride} & ${wedding.groom}`}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Kapat"
              className="absolute inset-0 bg-ink/25"
              onClick={closeSheet}
              disabled={isUploading}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="photo-upload-title"
              className="paper-grain relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden border-t border-line sm:border sm:border-line/80"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-6 pb-2 pt-5 sm:px-8">
                <p
                  id="photo-upload-title"
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze"
                >
                  Paylaş
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeSheet}
                  disabled={isUploading}
                  className="touch-manipulation font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-muted transition-colors hover:text-ink disabled:opacity-40"
                >
                  Kapat
                </button>
              </div>

              <div className="overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
                {isSuccess ? (
                  <div className="flex min-h-[18rem] flex-col items-center justify-center py-16 text-center">
                    <div className="h-px w-10 bg-bronze/40" />
                    <p className="mt-8 font-serif text-2xl font-light italic leading-snug text-ink">
                      Anınız albüme eklendi.
                    </p>
                    <button
                      type="button"
                      onClick={closeSheet}
                      className="mt-12 inline-flex min-h-12 items-center justify-center border border-bronze/50 px-10 py-3 font-sans text-[11px] font-medium tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory"
                    >
                      TAMAM
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div>
                      <input
                        ref={fileInputRef}
                        id={fileInputId}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="sr-only"
                        onChange={(event) => {
                          handleFiles(event.target.files);
                          event.target.value = "";
                        }}
                      />
                      <label
                        htmlFor={fileInputId}
                        className="flex min-h-32 cursor-pointer touch-manipulation flex-col items-center justify-center border border-bronze/40 px-6 py-10 text-center transition-colors hover:border-bronze/70"
                      >
                        <span className="font-sans text-[11px] font-medium tracking-[0.26em] text-ink">
                          FOTOĞRAF / VİDEO SEÇ
                        </span>
                        <span className="mt-3 max-w-[16rem] font-serif text-sm font-light italic leading-6 text-muted">
                          Birden fazla fotoğraf veya video seçebilirsiniz.
                        </span>
                      </label>

                      {items.length > 0 && (
                        <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {items.map((item) => (
                            <li
                              key={item.id}
                              className="relative aspect-square overflow-hidden border border-line/80 bg-ivory-deep"
                            >
                              {item.kind === "video" ? (
                                <video
                                  src={item.preview}
                                  muted
                                  playsInline
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <img
                                  src={item.preview}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              )}
                              {item.kind === "video" && (
                                <span className="absolute bottom-1 left-1 font-sans text-[8px] uppercase tracking-[0.18em] text-ivory">
                                  Video
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-ivory/90 font-sans text-[10px] text-ink"
                                aria-label="Kaldır"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="text-left">
                      <label
                        htmlFor="guest-name"
                        className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-muted"
                      >
                        Adınız{" "}
                        <span className="normal-case tracking-normal">
                          (opsiyonel)
                        </span>
                      </label>
                      <input
                        id="guest-name"
                        type="text"
                        autoComplete="name"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        className="mt-2 w-full border-0 border-b border-line bg-transparent py-2.5 font-serif text-lg font-light text-ink outline-none placeholder:text-muted/50 focus:border-bronze"
                        placeholder="Adınız"
                      />
                    </div>

                    <div className="text-left">
                      <label
                        htmlFor="guest-note"
                        className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-muted"
                      >
                        Notunuz{" "}
                        <span className="normal-case tracking-normal">
                          (opsiyonel)
                        </span>
                      </label>
                      <textarea
                        id="guest-note"
                        rows={3}
                        maxLength={180}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className="mt-2 w-full resize-none border-0 border-b border-line bg-transparent py-2.5 font-serif text-lg font-light leading-7 text-ink outline-none placeholder:text-muted/50 focus:border-bronze"
                        placeholder="Kısa bir not"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={items.length === 0 || isUploading}
                      className="mb-4 inline-flex min-h-12 touch-manipulation items-center justify-center border border-bronze/50 px-8 py-3 font-sans text-[11px] font-medium tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
                    >
                      {isUploading ? "EKLENİYOR" : "ALBÜME EKLE"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

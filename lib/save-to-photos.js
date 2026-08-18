export function probeCanShareMedia() {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.share !== "function" ||
    typeof navigator.canShare !== "function" ||
    typeof File === "undefined"
  ) {
    return false;
  }

  try {
    const probe = new File(["probe"], "probe.jpg", { type: "image/jpeg" });
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}

export function canShareFiles(files) {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.canShare !== "function" ||
    !files?.length
  ) {
    return false;
  }

  try {
    return navigator.canShare({ files });
  } catch {
    return false;
  }
}

export function filenameFor(kind, id) {
  const extension = kind === "video" ? "mp4" : "jpg";
  return `dugun-anisi-${id}.${extension}`;
}

export async function fileFromSource({ file, src, filename, mimeType }) {
  if (file instanceof File) return file;

  if (file instanceof Blob) {
    return new File([file], filename, {
      type: file.type || mimeType || "image/jpeg",
    });
  }

  const response = await fetch(src);
  if (!response.ok) {
    throw new Error("Medya açılamadı");
  }

  const blob = await response.blob();
  return new File([blob], filename, {
    type: blob.type || mimeType || "image/jpeg",
  });
}

export async function shareMediaFile(file, title) {
  await navigator.share({
    files: [file],
    title,
  });
}

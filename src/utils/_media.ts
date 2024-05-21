export const getImgData = (img: { naturalWidth: number; naturalHeight: number }) => {
  let w = 1;
  let h = 1;
  const ratio = img.naturalWidth / img.naturalHeight;

  if (ratio > 1) {
    // image is horizontal
    h = img.naturalHeight / img.naturalWidth;
  } else if (ratio < 1) {
    // image is vertical
    w = ratio;
  }

  return { w, h };
};

import { useState, useEffect } from 'react';

export type MediaDimension = {
  width: number;
  height: number;
  ratio: number;
};

export const useRemoteMediaDimensions = (url: string): MediaDimension => {
  const [size, setSize] = useState({ width: 0, height: 0, ratio: 1 });
  const dimensionSetter = (error: null, image: HTMLImageElement) =>
    setSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
      ratio: image.naturalWidth / image.naturalHeight,
    });

  const getMeta = (url: string, cb: (error: null, image: HTMLImageElement) => void) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.src = url;
  };
  useEffect(() => {
    getMeta(url, dimensionSetter);
  }, [url]);

  return size;
};

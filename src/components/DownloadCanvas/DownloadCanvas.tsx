"use client";
import { useRef } from "react";
import styles from "./DownloadCanvas.module.css";

type DownloadCanvasProps = {
  pixels: string[][];
};

export const DownloadCanvas = ({ pixels }: DownloadCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleDownload() {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const pixelSize = 20;
    canvas.width = pixels[0].length * pixelSize;
    canvas.height = pixels.length * pixelSize;

    pixels.forEach((row, y) => {
      row.forEach((color, x) => {
        context.fillStyle = color;
        context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      });
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "pixel-art.png";
    link.click();
  }

  return (
    <>
      <canvas className={styles.canvas} ref={canvasRef} />
      <button
        className={styles.button}
        onClick={handleDownload}
        title="Download as PNG"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={styles.downloadIcon}
        >
          <g
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15M12 3v13m0 0 4-4.375M12 16l-4-4.375" />
          </g>
        </svg>
      </button>
    </>
  );
};

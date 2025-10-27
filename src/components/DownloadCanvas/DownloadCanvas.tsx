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
    <div>
      <canvas className={styles.canvas} ref={canvasRef} />
      <button className={styles.button} onClick={handleDownload}>
        Download as PNG
      </button>
    </div>
  );
};

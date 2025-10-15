"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./PixelGrid.module.css";

type PixelGridProps = {
  currentColor: string;
  selectedSize: string;
};

const canvasSizeMap = new Map([
  ["small", 16],
  ["medium", 32],
  ["large", 40],
]);

function createEmptyCanvas(size: number) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "white")
  );
}

export const PixelGrid = ({ currentColor, selectedSize }: PixelGridProps) => {
  const currentSize = canvasSizeMap.get(selectedSize) ?? 32;

  const [pixels, setPixels] = useState(createEmptyCanvas(currentSize));

  useEffect(() => {
    setPixels(createEmptyCanvas(currentSize));
  }, [currentSize]);

  function paintCell(rowIndex: number, columnIndex: number) {
    const newPixels = [...pixels];
    newPixels[rowIndex] = [...newPixels[rowIndex]];
    newPixels[rowIndex][columnIndex] =
      newPixels[rowIndex][columnIndex] === currentColor
        ? "white"
        : currentColor;
    setPixels(newPixels);
  }

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.small]: selectedSize === "small",
        [styles.medium]: selectedSize === "medium",
        [styles.large]: selectedSize === "large",
      })}
    >
      <div className={styles.grid}>
        {pixels.map((row, rowIndex) =>
          row.map((pixel, columnIndex) => (
            <button
              className={styles.cell}
              style={{ backgroundColor: pixel }}
              key={`${rowIndex}_${columnIndex}`}
              onClick={() => paintCell(rowIndex, columnIndex)}
            ></button>
          ))
        )}
      </div>
    </div>
  );
};

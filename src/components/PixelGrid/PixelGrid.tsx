"use client";
import { useState } from "react";
import styles from "./PixelGrid.module.css";

type PixelGridProps = {
  currentColor: string;
};

export const PixelGrid = ({ currentColor }: PixelGridProps) => {
  const size = 16;

  const [pixels, setPixels] = useState(
    Array.from({ length: size }, () =>
      Array.from({ length: size }, () => "white")
    )
  );

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
    <div className={styles.wrapper}>
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

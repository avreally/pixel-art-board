"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ClearConfirmation } from "@/components/ClearConfirmation/ClearConfirmation";
import { ClearCanvas } from "@/components/ClearCanvas/ClearCanvas";
import { Modal } from "@/components/Modal/Modal";
import styles from "./PixelGrid.module.css";

type PixelGridProps = {
  currentColor: string;
  selectedSize: string | undefined;
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
  const [pixels, setPixels] = useState<string[][] | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const currentSize = canvasSizeMap.get(selectedSize) ?? 32;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(selectedSize);

    if (!stored) {
      setPixels(createEmptyCanvas(currentSize));
      return;
    }

    const parsed = JSON.parse(stored);

    setPixels(parsed);
  }, [currentSize, selectedSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (selectedSize) {
      window.localStorage.setItem(selectedSize, JSON.stringify(pixels));
    }
  }, [selectedSize, pixels]);

  function clearCanvas(currentSize: number) {
    setShowModal(false);
    setPixels(createEmptyCanvas(currentSize));
  }

  function handleClearCanvasClick() {
    setShowModal(true);
  }

  if (!pixels) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>🎨</div>
        </div>
      </div>
    );
  }

  function paintCell(rowIndex: number, columnIndex: number) {
    if (!pixels) {
      return;
    }
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
      <ClearCanvas handleClearCanvasClick={handleClearCanvasClick} />

      {showModal && (
        <Modal isShown={showModal} onCancel={() => setShowModal(false)}>
          <ClearConfirmation
            onConfirm={() => clearCanvas(currentSize)}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

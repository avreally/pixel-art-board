"use client";
import { useEffect, useState } from "react";
import { ClearConfirmation } from "@/components/ClearConfirmation/ClearConfirmation";
import { ClearCanvas } from "@/components/ClearCanvas/ClearCanvas";
import { Modal } from "@/components/Modal/Modal";
import { createPortal } from "react-dom";
import { DownloadCanvas } from "../DownloadCanvas/DownloadCanvas";
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

  const clearButtonElement =
    typeof window !== "undefined"
      ? document.getElementById("pixelgrid-clear-button")
      : undefined;

  const downloadButtonElement =
    typeof window !== "undefined"
      ? document.getElementById("pixelgrid-download-button")
      : undefined;

  const currentSize = canvasSizeMap.get(selectedSize ?? "medium") ?? 32;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!selectedSize) return;
    const stored = window.localStorage.getItem(selectedSize);

    if (!stored) {
      setPixels(createEmptyCanvas(currentSize));
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setPixels(parsed);
    } catch {
      setPixels(createEmptyCanvas(currentSize));
    }
  }, [currentSize, selectedSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (selectedSize && pixels) {
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
      <div className={styles.loaderContainer}>
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
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        style={{ width: `${pixels[0].length}rem` }}
      >
        <div className={styles.grid}>
          {pixels.map((row, rowIndex) =>
            row.map((pixel, columnIndex) => (
              <div
                className={styles.cell}
                style={{ backgroundColor: pixel }}
                key={`${rowIndex}_${columnIndex}`}
                onClick={() => paintCell(rowIndex, columnIndex)}
              ></div>
            ))
          )}
        </div>
        {clearButtonElement &&
          createPortal(
            <ClearCanvas handleClearCanvasClick={handleClearCanvasClick} />,
            clearButtonElement
          )}
        {downloadButtonElement &&
          createPortal(
            <DownloadCanvas pixels={pixels} />,
            downloadButtonElement
          )}
        {showModal && (
          <Modal isShown={showModal} onCancel={() => setShowModal(false)}>
            <ClearConfirmation
              onConfirm={() => clearCanvas(currentSize)}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

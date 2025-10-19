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

  function handleUndoClick() {
    console.log("undo");
  }

  function handleRedoClick() {
    console.log("redo");
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
      <div className={styles.options}>
        <button className={styles.button} onClick={handleUndoClick}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6.5 9.50026H14.0385C15.9502 9.50026 17.5 11.05 17.5 12.9618C17.5 14.8736 15.9502 16.4233 14.0385 16.4233H9.5M6.5 9.50026L8.75 7.42334M6.5 9.50026L8.75 11.5772"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button className={styles.button} onClick={handleRedoClick}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M17.5 9.50026H9.96155C8.04979 9.50026 6.5 11.05 6.5 12.9618C6.5 14.8736 8.04978 16.4233 9.96154 16.4233H14.5M17.5 9.50026L15.25 7.42334M17.5 9.50026L15.25 11.5772"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      <ClearCanvas handleClearCanvasClick={handleClearCanvasClick} />
      </div>
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

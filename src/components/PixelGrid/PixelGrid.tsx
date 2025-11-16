"use client";
import { useEffect, useRef, useState } from "react";
import { ClearConfirmation } from "@/components/ClearConfirmation/ClearConfirmation";
import { ClearCanvas } from "@/components/ClearCanvas/ClearCanvas";
import { Modal } from "@/components/Modal/Modal";
import { createPortal } from "react-dom";
import { DownloadCanvas } from "../DownloadCanvas/DownloadCanvas";
import { get, set, del } from "idb-keyval";
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
    Array.from({ length: size }, () => "transparent")
  );
}

export const PixelGrid = ({ currentColor, selectedSize }: PixelGridProps) => {
  const [pixels, setPixels] = useState<string[][] | undefined>(undefined);
  const [showClearCanvasModal, setShowClearCanvasModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [paintActive, setPaintActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === "string") {
        setReferenceImage(reader.result);
        await set(`referenceImage-${selectedSize}`, reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleImageRemove() {
    await del(`referenceImage-${selectedSize}`);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setReferenceImage(null);
    setShowDeleteImageModal(false);
  }

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
    if (typeof window === "undefined") {
      return;
    }
    if (!selectedSize) {
      return;
    }

    if (fileRef.current) {
      fileRef.current.value = "";
    }

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

  useEffect(() => {
    if (!selectedSize) {
      return;
    }

    setReferenceImage(null);
    (async () => {
      const stored = await get(`referenceImage-${selectedSize}`);
      if (stored) {
        setReferenceImage(stored);
      }
    })();
  }, [selectedSize]);

  function clearCanvas(currentSize: number) {
    setShowClearCanvasModal(false);
    setPixels(createEmptyCanvas(currentSize));
  }

  function handleClearCanvasClick() {
    setShowClearCanvasModal(true);
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
    newPixels[rowIndex][columnIndex] = currentColor;
    setPixels(newPixels);
  }

  function handlePointerEnter(rowIndex: number, columnIndex: number) {
    if (!paintActive) {
      return;
    }

    paintCell(rowIndex, columnIndex);
  }

  function handlePointerDown(rowIndex: number, columnIndex: number) {
    setPaintActive(true);
    paintCell(rowIndex, columnIndex);
  }

  return (
    <div className={styles.container}>
      <div className={styles.uploadSection}>
        <div className={styles.uploadContainer}>
          <label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={handleImageUpload}
              className={styles.hiddenInput}
              ref={fileRef}
            />
            <div className={styles.uploadButton}>
              {referenceImage ? "Change image" : "Choose image"}
            </div>
          </label>
          {referenceImage && <p className={styles.fileName}>Image uploaded</p>}
        </div>
        <button
          className={styles.button}
          onClick={() => setShowDeleteImageModal(true)}
        >
          Delete
        </button>
      </div>
      <div
        className={styles.wrapper}
        style={{
          width: `${pixels[0].length}rem`,
          backgroundImage: referenceImage ? `url(${referenceImage})` : "none",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: referenceImage ?? "white",
        }}
      >
        <div
          className={styles.grid}
          onPointerLeave={() => setPaintActive(false)}
        >
          {pixels.map((row, rowIndex) =>
            row.map((pixel, columnIndex) => (
              <div
                className={styles.cell}
                style={{ backgroundColor: pixel }}
                key={`${rowIndex}_${columnIndex}`}
                onPointerDown={() => handlePointerDown(rowIndex, columnIndex)}
                onPointerUp={() => setPaintActive(false)}
                onPointerEnter={() => handlePointerEnter(rowIndex, columnIndex)}
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
        <Modal
          isShown={showClearCanvasModal}
          onCancel={() => setShowClearCanvasModal(false)}
        >
          <ClearConfirmation
            onConfirm={() => clearCanvas(currentSize)}
            onCancel={() => setShowClearCanvasModal(false)}
            headerText="Clear canvas?"
            text="Are you sure you want to clear current canvas?"
            confirmButtonText="Clear"
          />
        </Modal>
        <Modal
          isShown={showDeleteImageModal}
          onCancel={() => setShowDeleteImageModal(false)}
        >
          <ClearConfirmation
            onConfirm={handleImageRemove}
            onCancel={() => setShowDeleteImageModal(false)}
            headerText="Delete image?"
            text="Are you sure you want to delete image?"
            confirmButtonText="Delete"
          />
        </Modal>
      </div>
    </div>
  );
};

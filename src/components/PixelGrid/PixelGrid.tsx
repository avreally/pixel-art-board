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
            <>
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
                    <div
                      className={styles.uploadButton}
                      title="Upload reference image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className={styles.uploadIcon}
                      >
                        <g fill="#000">
                          <path d="M12.553 2.494a.75.75 0 0 0-1.107 0l-4 4.375A.75.75 0 0 0 8.554 7.88l2.696-2.95V16a.75.75 0 0 0 1.5 0V4.932l2.697 2.95a.75.75 0 1 0 1.107-1.013l-4-4.375Z" />
                          <path d="M3.75 15a.75.75 0 0 0-1.5 0v.055c0 1.367 0 2.47.117 3.337.12.9.38 1.658.981 2.26.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h6.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337V15a.75.75 0 0 0-1.5 0c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103H9c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191Z" />
                        </g>
                      </svg>
                    </div>
                  </label>
                  {referenceImage && (
                    <p className={styles.uploadStatus} title="Image uploaded!">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M4 12.611 8.923 17.5 20 6.5"
                        />
                      </svg>
                    </p>
                  )}
                </div>
                <button
                  className={styles.button}
                  onClick={() => setShowDeleteImageModal(true)}
                  title="Delete reference image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className={styles.deleteIcon}
                  >
                    <g
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.44"
                    >
                      <path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
                    </g>
                  </svg>
                </button>
              </div>
              <div className={styles.divider} />
              <DownloadCanvas pixels={pixels} />
            </>,
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

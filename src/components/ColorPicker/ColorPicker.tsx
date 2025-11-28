"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./ColorPicker.module.css";

type ColorPickerProps = {
  currentColor: string;
  setCurrentColor: Dispatch<SetStateAction<string>>;
};

const palettes = {
  Initial: [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#00bfff",
    "#0000ff",
    "#800080",
  ],
  "Ocean Sunset": [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#e9d8a6",
    "#ee9b00",
    "#ca6702",
    "#bb3e03",
    "#ae2012",
    "#9b2226",
  ],
  "Purple Raindrops": [
    "#f72585",
    "#b5179e",
    "#7209b7",
    "#560bad",
    "#480ca8",
    "#3a0ca3",
    "#3f37c9",
    "#4361ee",
    "#4895ef",
    "#4cc9f0",
  ],
  "Vibrant Tones": [
    "#f94144",
    "#f3722c",
    "#f8961e",
    "#f9844a",
    "#f9c74f",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#277da1",
  ],
  "Soft Rainbow": [
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
  ],
  "Warm Neutral Tones": [
    "#582f0e",
    "#7f4f24",
    "#936639",
    "#a68a64",
    "#b6ad90",
    "#c2c5aa",
    "#a4ac86",
    "#656d4a",
    "#414833",
    "#333d29",
  ],
};

export const ColorPicker = ({
  currentColor,
  setCurrentColor,
}: ColorPickerProps) => {
  const [selectedPaletteName, setSelectedPaletteName] = useState<
    string | undefined
  >(undefined);

  function verifyPaletteName(
    key: string | undefined
  ): key is keyof typeof palettes {
    return key !== undefined && key in palettes;
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedPalette = window.localStorage.getItem("selectedPalette");

    if (!storedPalette) {
      setSelectedPaletteName("Initial");
      return;
    }

    if (storedPalette && verifyPaletteName(storedPalette)) {
      setSelectedPaletteName(storedPalette);
    }
  }, []);

  function handlePaletteChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const paletteName = event.target.value;
    setSelectedPaletteName(paletteName);
    window.localStorage.setItem("selectedPalette", paletteName);
  }

  if (!verifyPaletteName(selectedPaletteName)) {
    return null;
  }

  const currentPalette = palettes[selectedPaletteName];

  return (
    <div className={styles.wrapper}>
      <div className={styles.paletteIconWrapper}>
        <div className={styles.paletteIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 73 73"
          >
            <rect width="73" height="73" strokeWidth="0" rx="0" />
            <g fill="none" fillRule="nonzero">
              <rect
                width="71"
                height="71"
                x="1"
                y="1"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                rx="14"
              />
              <path
                fill="#FF4B00"
                d="m62.114 43.73-4.092-4.252-4.835 1.86-7.812 10.168 1.171 6.337 3.397 1.575c5.744-3.316 10.323-8.792 12.171-15.689Z"
              />
              <path
                fill="#FF9F00"
                d="m49.943 59.418-4.568-7.912-12.712 1.68-4.2 3.903 1.808 5.025c6.897 1.848 13.929.62 19.672-2.696Z"
              />
              <path
                fill="#6B0"
                d="m32.663 53.187-10.169-7.812-6.248-1.368-1.664 5.936c3.316 5.744 8.792 10.323 15.689 12.171l2.392-8.927Z"
              />
              <path
                fill="#00CC71"
                d="m22.494 45.375-1.68-12.712-4.087-4.25-4.841 1.858c-1.848 6.897-.62 13.929 2.696 19.672l7.912-4.568Z"
              />
              <path
                fill="#0095FF"
                d="m28.625 22.494 1.637-5.782-6.205-2.13c-5.744 3.316-10.323 8.792-12.171 15.689l8.927 2.392 7.812-10.169Z"
              />
              <path
                fill="#6B77E8"
                d="m41.337 20.813 4.102-3.534-1.71-5.393c-6.897-1.848-13.929-.62-19.672 2.696l4.568 7.912 12.712-1.68Z"
              />
              <path
                fill="#B760EA"
                d="m57.61 27.589 1.808-3.532c-3.316-5.744-8.792-10.323-15.689-12.171l-2.392 8.927 10.169 7.812 6.104-1.036Z"
              />
              <path
                fill="#FF193D"
                d="m53.187 41.337 8.927 2.392c1.848-6.897.62-13.929-2.696-19.672l-7.912 4.568a16.706 16.706 0 0 1 1.68 12.712Z"
              />
              <path
                fill="#FF7816"
                d="m53.187 41.337-3.626-4.126-5.203 1.76-3.551 4.622 1.33 6.612 3.238 1.3a16.706 16.706 0 0 0 7.812-10.168Z"
              />
              <path
                fill="#FDBF00"
                d="m45.375 51.506-4.568-7.913-5.778.765-4.038 3.294 1.672 5.535a16.706 16.706 0 0 0 12.712-1.681Z"
              />
              <path
                fill="#7D0"
                d="m35.029 44.358-4.622-3.551-3.827-.279-4.086 4.847a16.706 16.706 0 0 0 10.169 7.812l2.366-8.83Z"
              />
              <path
                fill="#00DD7B"
                d="m30.407 40.807-.765-5.778-3.81-4.176-5.019 1.81a16.706 16.706 0 0 0 1.681 12.712l7.913-4.568Z"
              />
              <path
                fill="#3AAAFF"
                d="m33.193 30.407 1.3-6.368-5.868-1.545a16.706 16.706 0 0 0-7.812 10.169l8.83 2.366 3.55-4.622Z"
              />
              <path
                fill="#7984EB"
                d="m38.971 29.642 4.044-3.319-1.678-5.51a16.706 16.706 0 0 0-12.712 1.681l4.568 7.913 5.778-.765Z"
              />
              <path
                fill="#CB75F6"
                d="m49.883 34.538 1.623-5.913a16.706 16.706 0 0 0-10.169-7.812l-2.366 8.83 4.622 3.55 6.29 1.345Z"
              />
              <path
                fill="#FF4949"
                d="m51.506 28.625-7.913 4.568.765 5.778 8.829 2.366a16.706 16.706 0 0 0-1.681-12.712Z"
              />
              <path
                fill="#FF9F00"
                d="M40.807 43.593a7.594 7.594 0 0 0 3.55-4.622l-2.108-3.719L37 37l1.115 6.24 2.692.353Z"
              />
              <path
                fill="#FFD400"
                d="M35.029 44.358a7.594 7.594 0 0 0 5.778-.765L37 37l-4.2 3.902 2.229 3.456Z"
              />
              <path
                fill="#89F900"
                d="M30.407 40.807a7.594 7.594 0 0 0 4.622 3.55L37 37l-6.24 1.115-.353 2.692Z"
              />
              <path
                fill="#00EE84"
                d="m37 37-3.35-4.052-4.008 2.08a7.594 7.594 0 0 0 .765 5.779L37 37Z"
              />
              <path
                fill="#73BCFF"
                d="m37 37-.289-4.809-3.518-1.784a7.594 7.594 0 0 0-3.55 4.622L37 37Z"
              />
              <path
                fill="#979FEF"
                d="M38.971 29.642a7.594 7.594 0 0 0-5.778.765L37 37l2.63-3.928-.659-3.43Z"
              />
              <path
                fill="#DA90F8"
                d="M43.593 33.193a7.594 7.594 0 0 0-4.622-3.55L37 37l4.809-.289 1.784-3.518Z"
              />
              <path
                fill="#FF6C6C"
                d="M44.358 38.971a7.594 7.594 0 0 0-.765-5.778L37 37l7.358 1.971Z"
              />
            </g>
          </svg>
        </div>
        <select
          className={styles.paletteSelect}
          onChange={handlePaletteChange}
          value={selectedPaletteName}
        >
          {Object.keys(palettes).map((palette) => (
            <option key={palette} value={palette}>
              {palette}
            </option>
          ))}
        </select>
      </div>
      {selectedPaletteName && (
        <div className={styles.paletteWrapper}>
          {currentPalette.map((color, index) => (
            <button
              aria-label={`Select color ${color}`}
              key={index}
              className={styles.paletteItem}
              style={{
                backgroundColor: color,
                border:
                  currentColor === color
                    ? "2px solid hsl(307, 40%, 66%)"
                    : undefined,
                boxShadow:
                  currentColor === color
                    ? "0 0 4px 0px hsl(258, 80%, 30%)"
                    : undefined,
              }}
              onClick={() => setCurrentColor(color)}
            ></button>
          ))}
          <label className={styles.colorControl}>
            <div className={styles.divider} />
            <input
              className={clsx(styles.paletteItem, styles.customColor)}
              type="color"
              value={currentColor}
              onChange={(event) => setCurrentColor(event.target.value)}
            />
          </label>
          <div className={styles.eraserContainer}>
            <div className={styles.divider} />
            <button
              className={clsx(styles.paletteItem, styles.eraser)}
              value={currentColor}
              onClick={() => setCurrentColor("transparent")}
              style={{
                border:
                  currentColor === "transparent"
                    ? "2px solid hsl(307, 40%, 66%)"
                    : undefined,
                boxShadow:
                  currentColor === "transparent"
                    ? "0 0 4px 0px hsl(258, 80%, 30%)"
                    : undefined,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={styles.eraserIcon}
              >
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M13.083 19.063c-.444.444-.843.843-1.21 1.187H21a.75.75 0 0 1 0 1.5H9c-.018 0-.037 0-.055-.002-.703-.027-1.3-.331-1.886-.778-.588-.448-1.244-1.104-2.046-1.907l-.076-.076c-.803-.802-1.459-1.458-1.907-2.046-.468-.614-.78-1.24-.78-1.989 0-.748.312-1.375.78-1.989.448-.587 1.104-1.243 1.907-2.046l5.98-5.98c.803-.803 1.459-1.459 2.046-1.907.614-.468 1.24-.78 1.99-.78.748 0 1.374.312 1.988.78.588.448 1.244 1.104 2.046 1.907l.076.076c.803.802 1.459 1.458 1.907 2.046.468.614.78 1.24.78 1.989 0 .748-.312 1.375-.78 1.989-.448.587-1.104 1.243-1.907 2.046l-5.98 5.98ZM11.94 6.035c.85-.85 1.435-1.433 1.933-1.812.48-.367.79-.473 1.08-.473.288 0 .598.106 1.079.473.497.38 1.083.962 1.933 1.812.85.85 1.433 1.436 1.813 1.933.366.481.472.79.472 1.08 0 .289-.106.599-.473 1.079-.38.498-.962 1.083-1.812 1.933l-4.194 4.193-6.024-6.024 4.193-4.194ZM9.048 20.25c.289 0 .599-.106 1.079-.473.498-.38 1.083-.962 1.933-1.812l.65-.651-6.024-6.025-.65.65c-.85.85-1.434 1.436-1.813 1.934-.367.48-.473.79-.473 1.08 0 .288.106.598.473 1.079.38.497.962 1.083 1.812 1.933.85.85 1.436 1.433 1.933 1.813.481.366.79.472 1.08.472Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

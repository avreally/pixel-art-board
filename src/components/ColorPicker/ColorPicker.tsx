"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
      <label className={styles.paletteControl}>
        Palette:
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
      </label>
      {selectedPaletteName && (
        <div className={styles.paletteWrapper}>
          {currentPalette.map((color, index) => (
            <button
              aria-label={`Select color ${color}`}
              key={index}
              className={styles.color}
              style={{
                backgroundColor: color,
                border:
                  currentColor === color ? "2px solid hsl(307, 40%, 66%)" : "",
                boxShadow:
                  currentColor === color
                    ? "0 0 4px 0px hsl(258, 80%, 30%)"
                    : "",
              }}
              onClick={() => setCurrentColor(color)}
            ></button>
          ))}
          <label className={styles.colorControl}>
            <div className={styles.divider} />
            <input
              className={styles.customColor}
              type="color"
              value={currentColor}
              onChange={(event) => setCurrentColor(event.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
};

"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./ColorPicker.module.css";

type ColorPickerProps = {
  currentColor: string;
  setCurrentColor: Dispatch<SetStateAction<string>>;
};

export const ColorPicker = ({
  currentColor,
  setCurrentColor,
}: ColorPickerProps) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "deepskyblue",
    "blue",
    "purple",
    "white",
    "black",
  ];

  return (
    <div className={styles.wrapper}>
      {colors.map((color, index) => (
        <button
          key={index}
          className={styles.color}
          style={{
            backgroundColor: color,
            border: currentColor === color ? "2px solid black" : "none",
          }}
          onClick={() => setCurrentColor(color)}
        ></button>
      ))}
    </div>
  );
};

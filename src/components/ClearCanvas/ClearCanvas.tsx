"use client";
import styles from "./ClearCanvas.module.css";

type ClearCanvasProps = {
  handleClearCanvasClick: () => void;
};

export const ClearCanvas = ({ handleClearCanvasClick }: ClearCanvasProps) => {
  return (
    <button className={styles.button} onClick={handleClearCanvasClick}>
      Clear
    </button>
  );
};

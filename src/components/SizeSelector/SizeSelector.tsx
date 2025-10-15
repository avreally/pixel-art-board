"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./SizeSelector.module.css";

type SizeSelectorProps = {
  selectedSize: string;
  setSelectedSize: Dispatch<SetStateAction<string>>;
};

export const SizeSelector = ({
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      Select canvas size:
      <select
        name="size"
        id="size"
        value={selectedSize}
        onChange={(event) => setSelectedSize(event.target.value)}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
};

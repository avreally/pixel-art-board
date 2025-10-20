"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./SizeSelector.module.css";

type SizeSelectorProps = {
  selectedSize: string | undefined;
  setSelectedSize: Dispatch<SetStateAction<string | undefined>>;
};

export const SizeSelector = ({
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  function setSize(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSize(event.target.value);
    window.localStorage.setItem("storedSize", event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      Select canvas size:
      <select
        name="size"
        id="size"
        value={selectedSize}
        onChange={(event) => setSize(event)}
        className={styles.select}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  );
};

"use client";
import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid/PixelGrid";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import styles from "./page.module.css";
import { SizeSelector } from "@/components/SizeSelector/SizeSelector";

export default function Home() {
  const [currentColor, setCurrentColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("medium");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SizeSelector
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <div className={styles.canvas}>
          <PixelGrid currentColor={currentColor} selectedSize={selectedSize} />
          <ColorPicker
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

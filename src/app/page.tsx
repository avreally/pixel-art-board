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
        <div>Pixel Art Board</div>
        <SizeSelector
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
        <div className={styles.canvas}>
          <ColorPicker
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
          <PixelGrid currentColor={currentColor} selectedSize={selectedSize} />
        </div>
      </main>
    </div>
  );
}

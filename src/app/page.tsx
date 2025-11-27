"use client";
import { useEffect, useState } from "react";
import { PixelGrid } from "@/components/PixelGrid/PixelGrid";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { Header } from "@/components/Header/Header";
import styles from "./page.module.css";

export default function Home() {
  const [currentColor, setCurrentColor] = useState("transparent");
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedSize = window.localStorage.getItem("storedSize");

    if (!storedSize) {
      setSelectedSize("medium");
      window.localStorage.setItem("storedSize", "medium");
      return;
    }

    setSelectedSize(storedSize);
  }, [selectedSize]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        <div className={styles.canvas}>
          <ColorPicker
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
          <PixelGrid currentColor={currentColor} selectedSize={selectedSize} />
          <div className={styles.wrapper} id="pixelgrid-download-button" />
        </div>
      </main>
    </div>
  );
}

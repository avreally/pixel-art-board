"use client";
import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid/PixelGrid";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import styles from "./page.module.css";

export default function Home() {
  const [currentColor, setCurrentColor] = useState("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PixelGrid currentColor={currentColor}></PixelGrid>
        <ColorPicker
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        ></ColorPicker>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

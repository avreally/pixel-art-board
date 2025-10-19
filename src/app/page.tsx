"use client";
import { useEffect, useState } from "react";
import { PixelGrid } from "@/components/PixelGrid/PixelGrid";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { SizeSelector } from "@/components/SizeSelector/SizeSelector";

export default function Home() {
  const [currentColor, setCurrentColor] = useState("");
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

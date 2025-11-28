import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixel Art Board",
  description: "Create, edit, and download pixel art directly in your browser.",
  openGraph: {
    title: "Pixel Art Board",
    description:
      "Create, edit, and download pixel art directly in your browser.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Pixel Art Board preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Art Board",
    description:
      "Create, edit, and download pixel art directly in your browser.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  keywords: ["pixel art", "drawing", "editor", "grid art", "browser drawing"],
  authors: [{ name: "Valeria Shadrina" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.variable}>{children}</body>
    </html>
  );
}

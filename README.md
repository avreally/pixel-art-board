# Pixel Art Board

A pixel drawing app built with **Next.js** and **React**, where users can paint on a customizable canvas using different color palettes or a custom color picker. The board state is stored in **localStorage** to preserve artwork between sessions.

The canvas, color palette, and controls are implemented as separate reusable components. React state handles user interactions and updates the board, while **localStorage** ensures persistence.

## Features

- Paint pixels by clicking on canvas cells
- Choose colors from predefined palettes or a custom color picker
- Switch between three canvas sizes
- Download your artwork as a PNG image
- Clear the canvas
- Persistent board data via localStorage

## Deployment

The project is deployed on **Vercel**.  
You can try it live here: [https://pixel-art-board-avreally.vercel.app/](https://pixel-art-board-avreally.vercel.app/)

## Installation

```bash
git clone https://github.com/avreally/pixel-art-board.git
cd pixel-art-board
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

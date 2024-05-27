import React from "react";
import { Graphics } from "@pixi/react";
import type { FC } from "react";

interface TileGridProps {
  tileSize: number;
  rows: number;
  cols: number;
  colors: number[];
}

const TileGrid: FC<TileGridProps> = ({ tileSize, rows, cols, colors }) => {
  const drawTile = (g: any, x: number, y: number, color: number) => {
    g.beginFill(color);
    g.drawRect(x, y, tileSize, tileSize);
    g.endFill();
  };

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const color = colors[(row + col) % 2];
            drawTile(g, col * tileSize, row * tileSize, color);
          }
        }
      }}
    />
  );
};

export default TileGrid;

import { getRandomColor } from "./getRandomColor";

// create single tile
export const createTile = (width: number, height: number): HTMLDivElement => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.width = `${width}px`;
    tile.style.height = `${height}px`;
    tile.style.backgroundColor = getRandomColor();
    return tile;
  };
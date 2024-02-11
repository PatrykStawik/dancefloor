import {
  CONTAINER_ELEMENT,
  TILES_X_ELEMENT,
  TILES_Y_ELEMENT,
  DANCE_FLOOR_ELEMENT,
  GENERATE_BUTTON_ELEMENT,
  COLUMN_OFFSET,
} from "./constants";
import { createTile } from "./createTile";
import "./style.css";

// total count of tiles in X
let tilesX = 0;
// total count of tiles in Y
let tilesY = 0;

// func for counting how many rows can fit in the view (visible)
const rowsCountPerView = (offset: number): number => {
  const tileSize = window.innerWidth / tilesX;
  const tilesYSize = Math.ceil(window.innerHeight / tileSize);

  if(tilesY - offset > 0){
    return tilesYSize + offset;
  }

  return tilesYSize ;
};


// func for generating dance floor in visible view
const generateDanceFloor = (danceFloorElement: HTMLElement): void => {
  console.time("generate")
  const tileSize = window.innerWidth / tilesX;
  const tilsesYSize = rowsCountPerView(COLUMN_OFFSET);
  let multipler = 1;
  if(tileSize < 150) {
    multipler = 5
  }
  for (let i = 0; i < tilsesYSize * multipler; i++) {
    for (let j = 0; j < tilesX; j++) {
      const tile = createTile(tileSize, tileSize);
      danceFloorElement.appendChild(tile);
    }
  }

  console.timeEnd("generate")
};

// generate button handle func, render first part of dancefloor
const onGenerateButtonClick = (): void => {
  const containerElement = <HTMLDivElement>(
    document.getElementById(CONTAINER_ELEMENT)
  );
  const danceFloorElement = <HTMLDivElement>(
    document.getElementById(DANCE_FLOOR_ELEMENT)
  );


  generateDanceFloor(danceFloorElement);

  containerElement.classList.add("hide");
};

// main listener
document.addEventListener("DOMContentLoaded", () => {
  const generateButtonElement = <HTMLButtonElement>(
    document.getElementById(GENERATE_BUTTON_ELEMENT)
  );
  const tilesXElement = <HTMLInputElement>(
    document.getElementById(TILES_X_ELEMENT)
  );
  const tilesYElement = <HTMLInputElement>(
    document.getElementById(TILES_Y_ELEMENT)
  );
  const danceFloorElement = <HTMLDivElement>(
    document.getElementById(DANCE_FLOOR_ELEMENT)
  );

  tilesXElement.addEventListener("input", (e) => {
    tilesX = Number((e.target as HTMLInputElement).value);
  });

  tilesYElement.addEventListener("input", (e) => {
    tilesY = Number((e.target as HTMLInputElement).value);
  });

  generateButtonElement.addEventListener("click", onGenerateButtonClick);

  // scroll listener, when user is scrolling down next parts of dancefloor are loading
  let lastScrollPosition = 0;
  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollPosition) {
      const maximumScrollY =
        Math.ceil(tilesY / rowsCountPerView(COLUMN_OFFSET)) *
        window.innerHeight;
      const difference = Math.abs(window.scrollY - lastScrollPosition);
      if (
        window.scrollY > window.innerHeight + 100 &&
        difference >= window.innerHeight &&
        window.scrollY <= maximumScrollY
      ) {
        generateDanceFloor(danceFloorElement);
        lastScrollPosition = window.scrollY;
      }
    }
  });
});

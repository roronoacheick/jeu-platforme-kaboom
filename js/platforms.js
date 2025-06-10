// js/platforms.js

import k from "./kaboom.js";
const { add, sprite, pos, area, body, width, height } = k;

// Taille d’une tuile (tile_0030.png) du pack Kenney
const TILE_SIZE = 18;

export function createPlatforms() {
  const w = width();
  const h = height();

  // 1) Sol principal (une rangée de tuiles en bas)
  for (let x = 0; x < w; x += TILE_SIZE) {
    add([
      sprite("ground"),           // ton sprite sol
      pos(x, h - TILE_SIZE),        // placé juste au-dessus du bas
      area(),                       // collision hitbox
      body({ isStatic: true }),     // bloc immobile qui arrête la chute
    ]);
  }

  // 2) Plateforme flottante 1
  const p1Count = 7;                  // 7 tuiles de long
  const p1X = w * 0.2;                // 20% depuis la gauche
  const p1Y = h * 0.6;                // 60% depuis le haut
  for (let i = 0; i < p1Count; i++) {
    add([
      sprite("ground"),
      pos(p1X + i * TILE_SIZE, p1Y),
      area(),
      body({ isStatic: true }),
    ]);
  }

  // 3) Plateforme flottante 2
  const p2Count = 7;
  const p2X = w * 0.55;               // 55% depuis la gauche
  const p2Y = h * 0.4;                // 40% depuis le haut
  for (let i = 0; i < p2Count; i++) {
    add([
      sprite("ground"),
      pos(p2X + i * TILE_SIZE, p2Y),
      area(),
      body({ isStatic: true }),
    ]);
  }
}

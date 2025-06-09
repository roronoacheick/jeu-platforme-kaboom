// js/coin.js

import k from "./kaboom.js";

const {
  add,
  circle,
  pos,
  area,
  color,
  rand,
  width,
  height,
} = k;

const MARGIN_FLOOR     = 40;   // marge au-dessus du sol (plateforme)
const REACHABLE_HEIGHT = 150;  // hauteur maxi qu'on peut atteindre (2 sauts)

export function spawnCoins(nombre) {
  const minY = height() - REACHABLE_HEIGHT - MARGIN_FLOOR;
  const maxY = height() - MARGIN_FLOOR;

  for (let i = 0; i < nombre; i++) {
    add([
      circle(12),                          // pièces un peu plus grosses
      pos(rand(0, width()), rand(minY, maxY)),
      area(),
      color(255, 215, 0),                  // or
      "coin",
    ]);
  }
}

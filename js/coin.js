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

// Constantes physiques (doivent correspondre à celles de player.js)
const JUMP_FORCE = 600;
const GRAVITY    = 2400;
const TILE_SIZE  = 18;

export function spawnCoins(nb) {
  const w = width();
  const h = height();

  // Calcul de la hauteur double saut
  const singleH  = (JUMP_FORCE ** 2) / (2 * GRAVITY);
  const maxReach = singleH * 2;
  const maxY     = h - TILE_SIZE;         // juste au-dessus du sol
  const minY     = maxY - maxReach;       // hauteur maximale atteignable

  for (let i = 0; i < nb; i++) {
    add([
      circle(8),
      pos(rand(8, w - 8), rand(minY, maxY)),
      area(),
      color(255, 215, 0),
      "coin",
    ]);
  }
}

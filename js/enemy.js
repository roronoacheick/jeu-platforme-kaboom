// js/enemy.js

import k from "./kaboom.js";

const {
  add,
  rect,
  pos,
  area,
  body,
  color,
  onUpdate,
  rand,
  width,
} = k;

const ENEMY_SPEED = 100;   // un peu plus rapide
const ENEMY_SIZE  = 32;    // taille plus grande

export function spawnEnemies(nombre, player) {
  for (let i = 0; i < nombre; i++) {
    const enemy = add([
      rect(ENEMY_SIZE, ENEMY_SIZE),
      pos(rand(0, width()), 0),
      area(),
      body(),
      color(255, 0, 0),
      "enemy",
    ]);
    enemy.onUpdate(() => {
      if (!player.exists()) return;
      if (player.pos.x > enemy.pos.x) {
        enemy.move( ENEMY_SPEED, 0);
      } else {
        enemy.move(-ENEMY_SPEED, 0);
      }
    });
  }
}

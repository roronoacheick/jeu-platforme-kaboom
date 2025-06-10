// js/enemy.js

import k from "./kaboom.js";

const {
  add,
  sprite,
  pos,
  area,
  body,
  scale,
  color,
  onUpdate,
  rand,
  width,
} = k;

const ENEMY_SPEED = 100;

export function spawnEnemies(nombre, player, spriteName) {
  for (let i = 0; i < nombre; i++) {
    const enemy = add([
      sprite(spriteName),     // ex: "enemy1", "enemy2", "enemy3"
      pos(rand(0, width()), 0),
      area(),
      body(),
      scale(2),               // même échelle que le joueur
      "enemy",
    ]);
    // Comportement basique : poursuite horizontale
    enemy.onUpdate(() => {
      if (!player.exists()) return;
      const dir = player.pos.x > enemy.pos.x ? 1 : -1;
      enemy.move(dir * ENEMY_SPEED, 0);
    });
  }
}

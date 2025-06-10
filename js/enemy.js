// js/enemy.js

import k from "./kaboom.js";
const {
  add,
  sprite,
  pos,
  area,
  body,
  scale,
  onUpdate,
  rand,
  width,
} = k;

// Configuration par défaut des ennemis
const SPRITE_W     = 16;
const SPRITE_H     = 16;
const SCALE_FACTOR = 2;
const HB_W         = SPRITE_W * SCALE_FACTOR;
const HB_H         = SPRITE_H * SCALE_FACTOR;
const DEFAULT_SPEED  = 100;

/**
 * spawnEnemies(count, player, spriteName, fromRight = false, speed = DEFAULT_SPEED)
 * - count       : nombre d’ennemis à générer
 * - player      : référence au joueur (GameObj)
 * - spriteName  : clé du sprite à utiliser (ex: "enemy3")
 * - fromRight   : si true, apparaissent hors-écran à droite
 * - speed       : vitesse de déplacement horizontal de chaque ennemi
 */
export function spawnEnemies(count, player, spriteName, fromRight = false, speed = DEFAULT_SPEED) {
  for (let i = 0; i < count; i++) {
    // Position de départ : soit aléatoire partout, soit juste à droite
    const startX = fromRight
      ? rand(width(), width() + 100)
      : rand(0, width());
    const enemy = add([
      sprite(spriteName),
      pos(startX, 0),
      area({ width: HB_W, height: HB_H }),  // hitbox adaptée au sprite agrandi
      body(),
      scale(SCALE_FACTOR),
      "enemy",
    ]);
    // Comportement : poursuite horizontale du joueur
    enemy.onUpdate(() => {
      if (!player.exists()) return;
      const dir = player.pos.x > enemy.pos.x ? 1 : -1;
      enemy.move(dir * speed, 0);
    });
  }
}

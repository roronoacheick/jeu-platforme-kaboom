// js/boss.js

import k from "./kaboom.js";

const { add, sprite, pos, area, body, scale, color } = k;

// Crée un boss statique à droite, sans déplacement
export function spawnBoss(position) {
  return add([
    sprite("boss"),                // sprite Kenney tile_0022.png
    pos(position.x, position.y),    // position souhaitée en haut à droite
    area({ width: 32 * 2, height: 48 * 2 }), // hitbox adaptée au sprite agrandi
    scale(2),                        // agrandissement x2 pour pixel art
    body({ isStatic: true }),        // statique : pas de gravité, pas de déplacement
    color(128, 0, 128),              // couleur (optionnelle, le sprite couvre la couleur)
    "boss",
  ]);
}

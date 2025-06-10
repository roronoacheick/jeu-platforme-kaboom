// js/player.js

import k from "./kaboom.js";

const {
  add,
  sprite,
  pos,
  area,
  body,
  scale,
  onKeyDown,
  onKeyPress,
  onUpdate,
  width,
  vec2,
} = k;

const MOVE_SPEED = 240;
const JUMP_FORCE = 600;

export function addPlayer(startPos) {
  const player = add([
    sprite("player"),      // utilise le sprite tile_0001.png
    pos(startPos.x, startPos.y),
    area(),
    body(),
    scale(2),              // agrandit le sprite si nécessaire
    "player",
  ]);

  let canDouble = false;

  onKeyDown("left",  () => player.move(-MOVE_SPEED, 0));
  onKeyDown("right", () => player.move( MOVE_SPEED, 0));

  onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      canDouble = true;
    } else if (canDouble) {
      player.jump(JUMP_FORCE);
      canDouble = false;
    }
  });

  onUpdate(() => {
    if (player.isGrounded()) canDouble = false;
    // Empêche de sortir de l'écran à droite et à gauche
    player.pos.x = Math.max(0, Math.min(width() - player.width, player.pos.x));
  });

  return player;
}

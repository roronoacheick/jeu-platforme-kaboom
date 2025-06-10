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

// Configuration du joueur
const SPRITE_NAME   = "player";    // tile_0001.png
const SPRITE_W      = 16;          // taille d’origine en px
const SPRITE_H      = 16;
const SCALE_FACTOR  = 2;           // échelle x2
const HB_W          = SPRITE_W * SCALE_FACTOR;
const HB_H          = SPRITE_H * SCALE_FACTOR;
const MOVE_SPEED    = 240;
const JUMP_FORCE    = 600;

export function addPlayer(startPos) {
  const player = add([
    sprite(SPRITE_NAME),
    pos(startPos.x, startPos.y),
    area({ width: HB_W, height: HB_H }),  // hitbox adaptée
    body(),               // gravité + collisions
    scale(SCALE_FACTOR),
    "player",
  ]);

  let canDoubleJump = false;

  onKeyDown("left",  () => player.move(-MOVE_SPEED, 0));
  onKeyDown("right", () => player.move( MOVE_SPEED, 0));

  onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      canDoubleJump = true;
    } else if (canDoubleJump) {
      player.jump(JUMP_FORCE);
      canDoubleJump = false;
    }
  });

  onUpdate(() => {
    if (player.isGrounded()) canDoubleJump = false;
    // Clamp X pour rester à l’écran
    player.pos.x = Math.max(0, Math.min(width() - HB_W, player.pos.x));
  });

  return player;
}

// js/player.js

import k from "./kaboom.js";

const {
  add,
  rect,
  pos,
  area,
  body,
  color,
  onKeyDown,
  onKeyPress,
  onUpdate,
} = k;

// Constants de gameplay
const MOVE_SPEED = 240;   // déplacement plus rapide
const JUMP_FORCE = 600;   // force de saut pour atteindre ~75px par saut
const PLAYER_SIZE = 40;   // taille du joueur en pixels

export function addPlayer(startPos) {
  const player = add([
    rect(PLAYER_SIZE, PLAYER_SIZE),
    pos(startPos.x, startPos.y),
    area(),
    body(),                // application de la physique (gravité)
    color(0, 0, 255),      // joueur bleu
    "player",
  ]);

  // Variable pour gérer le double-saut
  let canDoubleJump = false;

  // Déplacement horizontal
  onKeyDown("left",  () => player.move(-MOVE_SPEED, 0));
  onKeyDown("right", () => player.move( MOVE_SPEED, 0));

  // Saut + double saut
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      canDoubleJump = true;        // autorise le second saut
    } else if (canDoubleJump) {
      player.jump(JUMP_FORCE);
      canDoubleJump = false;       // on a utilisé le double saut
    }
  });

  // Réinitialisation du double-saut dès qu’on retouche le sol
  onUpdate(() => {
    if (player.isGrounded()) {
      canDoubleJump = false; // sera remis à true au prochain saut au sol
    }
  });

  return player;
}

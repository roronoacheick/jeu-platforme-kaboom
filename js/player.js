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
    width,
    vec2,
    // clamp is not provided, use Math
} = k;

// Constants de gameplay
const MOVE_SPEED = 240;   // déplacement plus rapide
const JUMP_FORCE = 600;   // force de saut
const PLAYER_SIZE = 40;   // taille du joueur

export function addPlayer(startPos) {
    const player = add([
        rect(PLAYER_SIZE, PLAYER_SIZE),
        pos(startPos.x, startPos.y),
        area(),
        body(),          // physique
        color(0, 0, 255),
        "player",
    ]);

    // Double-saut
    let canDoubleJump = false;

    // Déplacement
    onKeyDown("left",  () => player.move(-MOVE_SPEED, 0));
    onKeyDown("right", () => player.move( MOVE_SPEED, 0));

    // Saut et double saut
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
            canDoubleJump = true;
        } else if (canDoubleJump) {
            player.jump(JUMP_FORCE);
            canDoubleJump = false;
        }
    });

    // Mise à jour pour gérer double saut et limites X
    onUpdate(() => {
        // Reset double jump si au sol
        if (player.isGrounded()) {
            canDoubleJump = false;
        }
        // Empêcher de sortir des bords
        const px = player.pos.x;
        // Clamp entre 0 et width()
        player.pos.x = Math.max(0, Math.min(width() - PLAYER_SIZE, px));  // Clamp à droite selon la taille du joueur
    });

    return player;
}

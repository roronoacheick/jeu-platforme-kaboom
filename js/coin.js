// js/coin.js

import k from "./kaboom.js";
const { add, circle, pos, area, color, rand, width, height } = k;

// Même constantes que dans player.js
const JUMP_FORCE = 600;       // force de saut utilisée
const GRAVITY     = 2400;     // gravité définie dans kaboom.js
const TILE_SIZE   = 18;       // taille d’une tuile de sol

export function spawnCoins(nb) {
    const w = width();
    const h = height();

    // Calcul de la hauteur maximale atteignable :
    // hauteur simple saut = (JUMP_FORCE^2) / (2 * GRAVITY)
    // double saut double cette hauteur
    const singleJumpHeight = (JUMP_FORCE * JUMP_FORCE) / (2 * GRAVITY);
    const maxReach = singleJumpHeight * 2;

    // Y minimal pour que la pièce soit atteignable : 
    // sol à h-TILE_SIZE, on retire maxReach
    const maxY  = h - TILE_SIZE;  
    const minY  = maxY - maxReach;

    for (let i = 0; i < nb; i++) {
        const x = rand(8, w - 8);
        const y = rand(minY, maxY);
        add([
            circle(8),
            pos(x, y),
            area(),
            color(255, 215, 0),
            "coin",
        ]);
    }
}

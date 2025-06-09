// js/player.js

// Vitesse de déplacement (px/s)
const MOVE_SPEED = 200;

export function createPlayer() {
    const player = add([
        rect(20, 20),         // carré 20×20
        color(0, 128, 255),   // bleu ciel
        pos(50, 0),           // position initiale
        area(),               // collision
        body(),               // soumis à la gravité
    ]);

    // Déplacements latéraux
    keyDown("left",  () => {
        player.move(-MOVE_SPEED, 0);
    });
    keyDown("right", () => {
        player.move( MOVE_SPEED, 0);
    });

    // Saut
    keyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    return player;
}

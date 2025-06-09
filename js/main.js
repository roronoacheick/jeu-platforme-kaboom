// js/main.js

// 1) Import Kaboom v2000 (avec physique incluse)
 
 import kaboom from "https://unpkg.com/kaboom@2000.1.7/dist/kaboom.mjs";


// 2) Initialise Kaboom (injecte add(), body(), solid(), layer(), gravity(), etc.)
kaboom({
    global: true,
    fullscreen: true,
    debug: true,
    background: [0, 0, 0],
});

// 3) Régler la gravité du monde (v2000)
gravity(2400);

// 4) Import des modules du jeu
import { createPlayer }    from "./player.js";
import { createPlatforms } from "./platforms.js";
import { createScore }     from "./score.js";

// 5) Création des entités
const player     = createPlayer();
createPlatforms();
const scoreLabel = createScore();

// 6) Mise à jour du score (chronomètre)
onUpdate(() => {
    scoreLabel.value += dt();
    scoreLabel.text  = "Score: " + scoreLabel.value.toFixed(1);
});

// 7) Game Over (si le joueur tombe)
player.onUpdate(() => {
    if (player.pos.y > height()) {
        player.destroy();
        destroyAll("ui");  // supprime le score
        add([
            text("GAME OVER", { size: 32 }),
            pos(width() / 2, height() / 2),
            origin("center"),
            color(255, 0, 0),
        ]);
    }
});

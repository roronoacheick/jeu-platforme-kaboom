// js/platforms.js

export function createPlatforms() {
    // Sol : large plateforme fixe en bas
    add([
        rect(600, 20),
        pos(0, 400),
        color(100, 100, 100),
        area(),
        solid(),           // plateforme solide
    ]);

    // Plateforme intermédiaire gauche
    add([
        rect(120, 15),
        pos(150, 300),
        color(100, 100, 100),
        area(),
        solid(),
    ]);

    // Plateforme intermédiaire droite
    add([
        rect(120, 15),
        pos(400, 200),
        color(100, 100, 100),
        area(),
        solid(),
    ]);
}

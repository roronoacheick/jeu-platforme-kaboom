// js/score.js

export function createScore() {
    const scoreLabel = add([
        text("Score: 0", { size: 24 }),
        pos(10, 10),
        color(255, 255, 255),
        layer("ui"),        // calque UI
        "ui",               // tag pour pouvoir le détruire
    ]);
    scoreLabel.value = 0;
    return scoreLabel;
}

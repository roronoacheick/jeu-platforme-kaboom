// js/platforms.js

import k from "./kaboom.js";

const { add, rect, pos, color, area, body, width, height } = k;

export function createPlatforms() {
  // Sol (statique) :
  add([
    rect(width(), 20),
    pos(0, height() - 20),
    color(100, 100, 100),
    area(),
    body({ isStatic: true }),   // <-- on remplace solid() par body({ isStatic: true })
  ]);

  // Plateforme flottante 1 (statique) :
  add([
    rect(120, 15),
    pos(width() * 0.2, height() * 0.6),
    color(100, 100, 100),
    area(),
    body({ isStatic: true }),
  ]);

  // Plateforme flottante 2 (statique) :
  add([
    rect(120, 15),
    pos(width() * 0.55, height() * 0.4),
    color(100, 100, 100),
    area(),
    body({ isStatic: true }),
  ]);
}

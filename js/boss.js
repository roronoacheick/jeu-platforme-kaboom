// js/boss.js

import k from "./kaboom.js";

const {
  add,
  rect,
  pos,
  area,
  body,
  color,
} = k;

const BOSS_SIZE_X = 64;
const BOSS_SIZE_Y = 96;

export function spawnBoss(position) {
  return add([
    rect(BOSS_SIZE_X, BOSS_SIZE_Y),
    pos(position.x, position.y),
    area(),
    body({ isStatic: true }),  // boss statique
    color(128, 0, 128),
    "boss",
  ]);
}

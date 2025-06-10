// js/boss.js

import k from "./kaboom.js";
const { add, sprite, pos, area, body, color } = k;

export function spawnBoss(position){
  return add([
    sprite("boss"),
    pos(position.x, position.y),
    area(), body(), color(128,0,128), "boss"
  ]);
}

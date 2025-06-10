// js/score.js

import k from "./kaboom.js";
const { add, text, pos, fixed, destroy } = k;
let scoreLabel = null;

export function initScore(total){
  if(scoreLabel) destroy(scoreLabel);
  scoreLabel = add([
    text(`Pièces : 0/${total}`, {size:18}),
    pos(10,10), fixed(), {value:0,total}
  ]);
}

export function incrementScore(){
  if(!scoreLabel) return;
  scoreLabel.value++;
  scoreLabel.text = `Pièces : ${scoreLabel.value}/${scoreLabel.total}`;
}

export function allCoinsCollected(){
  return scoreLabel && scoreLabel.value>=scoreLabel.total;
}

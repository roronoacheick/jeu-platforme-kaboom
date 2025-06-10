// js/main.js

import k from "./kaboom.js";

import { addPlayer }       from "./player.js";
import { createPlatforms } from "./platforms.js";
import { spawnCoins }      from "./coin.js";
import { spawnEnemies }    from "./enemy.js";
import { initScore, incrementScore, allCoinsCollected } from "./score.js";
import { spawnBoss }       from "./boss.js";

const {
  loadSprite, scene, go, add, sprite, text, rect, pos,
  area, body, scale, anchor, color, onKeyPress, onKeyDown,
  onCollide, onUpdate, wait, lifespan, destroy,
  fixed, width, height, vec2, outline, dt
} = k;

// --- Chargement des sprites ---
loadSprite("player", "assets/sprites/Characters/tile_0001.png");
loadSprite("enemy1", "assets/sprites/Characters/tile_0015.png");
loadSprite("enemy2", "assets/sprites/Characters/tile_0019.png");
loadSprite("enemy3", "assets/sprites/Characters/tile_0012.png");
loadSprite("boss",   "assets/sprites/Characters/tile_0022.png");
loadSprite("ground", "assets/sprites/Tiles/tile_0030.png");

// --- Scène Game Over ---
scene("gameover", () => {
  add([ text("GAME OVER", { size: 32 }), pos(width()/2, height()/2-20), anchor("center"), color(255,0,0) ]);
  add([ text("Entrée pour rejouer", { size: 16 }), pos(width()/2, height()/2+20), anchor("center"), color(255,255,255) ]);
  onKeyPress("enter", () => go("level1"));
});

// --- Scène Victoire ---
scene("win", () => {
  add([ text("Victoire !", { size: 32 }), pos(width()/2, height()/2-20), anchor("center"), color(0,255,0) ]);
  add([ text("Entrée pour rejouer", { size: 16 }), pos(width()/2, height()/2+20), anchor("center"), color(255,255,255) ]);
  onKeyPress("enter", () => go("level1"));
});

// --- Niveau 1 ---
scene("level1", () => {
  createPlatforms();  
  const player = addPlayer(vec2(50, 0));

  initScore(5);
  spawnCoins(5);
  spawnEnemies(1, player, "enemy1");

  let vies = 2;
  const livesLabel = add([ text(`Vies : ${vies}`, { size: 18 }), pos(width()-80,10), fixed(), color(255,255,255) ]);

  onCollide("player","coin",(p,c)=>{
    c.use(lifespan(0.3,{fade:0.1}));
    incrementScore();
    if(allCoinsCollected()) wait(0.4,()=>go("level2"));
  });

  onCollide("player","enemy",(p,e)=>{
    vies--; livesLabel.text = `Vies : ${vies}`;
    if(vies<=0) go("gameover");
    else { destroy(e); wait(1,()=>spawnEnemies(1,player,"enemy1")); }
  });
});

// --- Niveau 2 ---
scene("level2", () => {
  createPlatforms();
  const player = addPlayer(vec2(50, 0));

  initScore(10);
  spawnCoins(10);
  spawnEnemies(2, player, "enemy2");

  let vies = 2;
  const livesLabel = add([ text(`Vies : ${vies}`, { size: 18 }), pos(width()-80,10), fixed(), color(255,255,255) ]);

  onCollide("player","coin",(p,c)=>{
    c.use(lifespan(0.3,{fade:0.1}));
    incrementScore();
    if(allCoinsCollected()) wait(0.4,()=>go("boss"));
  });

  onCollide("player","enemy",(p,e)=>{
    vies--; livesLabel.text = `Vies : ${vies}`;
    if(vies<=0) go("gameover");
    else { destroy(e); wait(1,()=>spawnEnemies(1,player,"enemy2")); }
  });
});

// --- Niveau 3 (Boss) ---
scene("boss", () => {
  createPlatforms();
  const player = addPlayer(vec2(50, 0));
  const boss   = spawnBoss(vec2(width()-100,0));

  // Le boss envoie 3 ennemis
  spawnEnemies(3, player, "enemy3");

  let bossHP = 100, timer = 25;

  // Barre de vie
  add([ rect(104,12), pos(width()/2-52,10), color(80,80,80), outline(2), fixed() ]);
  const hpBar = add([ rect(100,8), pos(width()/2-50,12), color(255,0,0), fixed() ]);
  const timerText = add([ text(`Temps : ${timer.toFixed(1)}`,{size:18}), pos(width()/2,30), anchor("center"), fixed(), color(255,255,255) ]);

  // Tir de lasers vers le boss
  onKeyPress("r",()=>{
    const laser = add([ rect(16,4), pos(player.pos), color(255,0,0), area(), "laser" ]);
    const dir = boss.pos.sub(player.pos).unit();
    const speedLaser = 100000;
    laser.onUpdate(()=>{
      laser.move(dir.scale(speedLaser*dt()));
      if(laser.pos.x<0||laser.pos.x>width()||laser.pos.y<0||laser.pos.y>height()) destroy(laser);
    });
  });

  onCollide("laser","boss",(l)=>{
    destroy(l);
    bossHP = Math.max(0,bossHP-3);
    hpBar.width = (bossHP/100)*100;
    if(bossHP<=0) go("win");
  });

  onCollide("player","enemy",()=>go("gameover"));

  boss.onUpdate(()=>{
    timer = Math.max(0,timer-dt());
    timerText.text = `Temps : ${timer.toFixed(0)}`;
    if(timer<=0 && bossHP>0) go("gameover");
  });
});

// --- Lancement du jeu ---
go("level1");

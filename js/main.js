// js/main.js

import k from "./kaboom.js";

// Import des modules du jeu
import { addPlayer } from "./player.js";
import { createPlatforms } from "./platforms.js";
import { spawnCoins } from "./coin.js";
import { spawnEnemies } from "./enemy.js";
import { initScore, incrementScore, allCoinsCollected } from "./score.js";
import { spawnBoss } from "./boss.js";

// Destructuration de l'API Kaboom (incluant anchor, area, rect, color, etc.)
const {
  scene,
  go,
  add,
  text,
  rect,
  pos,
  anchor,
  color,
  onKeyPress,
  onKeyDown,
  onCollide,
  onUpdate,
  wait,
  lifespan,
  destroy,
  fixed,
  width,
  height,
  vec2,
  outline,
  area,
  dt,
} = k;

// Scène Game Over
scene("gameover", () => {
  add([
    text("GAME OVER", { size: 32 }),
    pos(width() / 2, height() / 2 - 20),
    anchor("center"),
    color(255, 0, 0),
  ]);
  add([
    text("Appuie sur Entrée pour recommencer", { size: 16 }),
    pos(width() / 2, height() / 2 + 20),
    anchor("center"),
    color(255, 255, 255),
  ]);
  onKeyPress("enter", () => go("level1"));
});

// Scène Victoire
scene("win", () => {
  add([
    text("Vous avez vaincu le boss !", { size: 24 }),
    pos(width() / 2, height() / 2 - 20),
    anchor("center"),
    color(0, 255, 0),
  ]);
  add([
    text("Félicitations, tu as gagné :)", { size: 18 }),
    pos(width() / 2, height() / 2 + 10),
    anchor("center"),
    color(255, 255, 255),
  ]);
  add([
    text("Appuie sur Entrée pour rejouer", { size: 16 }),
    pos(width() / 2, height() / 2 + 50),
    anchor("center"),
    color(255, 255, 0),
  ]);
  onKeyPress("enter", () => go("level1"));
});

// Niveau 1
scene("level1", () => {
  createPlatforms();
  const player = addPlayer(vec2(50, 0));

  initScore(5);
  spawnCoins(5);
  spawnEnemies(1, player);

  let vies = 2;
  const livesLabel = add([
    text(`Vies : ${vies}`, { size: 18 }),
    pos(width() - 80, 10),
    fixed(),
    color(255, 255, 255),
  ]);

  onCollide("player", "coin", (p, c) => {
    c.scale = vec2(1.5);
    c.use(lifespan(0.3, { fade: 0.1 }));
    incrementScore();
    if (allCoinsCollected()) {
      wait(0.4, () => go("level2"));
    }
  });

  onCollide("player", "enemy", (p, e) => {
    vies -= 1;
    livesLabel.text = `Vies : ${vies}`;
    if (vies <= 0) {
      go("gameover");
    } else {
      destroy(e);
      wait(1, () => spawnEnemies(1, player));
    }
  });
});

// Niveau 2
scene("level2", () => {
  createPlatforms();
  const player = addPlayer(vec2(50, 0));

  initScore(10);
  spawnCoins(10);
  spawnEnemies(2, player);

  let vies = 2;
  const livesLabel = add([
    text(`Vies : ${vies}`, { size: 18 }),
    pos(width() - 80, 10),
    fixed(),
    color(255, 255, 255),
  ]);

  onCollide("player", "coin", (p, c) => {
    c.scale = vec2(1.5);
    c.use(lifespan(0.3, { fade: 0.1 }));
    incrementScore();
    if (allCoinsCollected()) {
      wait(0.4, () => go("boss"));
    }
  });

  onCollide("player", "enemy", (p, e) => {
    vies -= 1;
    livesLabel.text = `Vies : ${vies}`;
    if (vies <= 0) {
      go("gameover");
    } else {
      destroy(e);
      wait(1, () => spawnEnemies(1, player));
    }
  });
});

// Niveau 3 (Boss)
scene("boss", () => {
  createPlatforms();
  const player = addPlayer(vec2(50, 0));
  const boss = spawnBoss(vec2(width() - 100, 0));

  let bossHP = 100;
  const maxHP = 100;
  let timer = 10;

  // Barre de vie du boss (fond)
  add([
    rect(104, 12),
    pos(width() / 2 - 52, 10),
    color(80, 80, 80),
    outline(2),
    fixed(),
  ]);
  // Barre de vie du boss (rouge)
  const hpBar = add([
    rect(100, 8),
    pos(width() / 2 - 50, 12),
    color(255, 0, 0),
    fixed(),
  ]);

  // Timer à l'écran
  const timerText = add([
    text(`Temps : ${timer.toFixed(1)}`, { size: 18 }),
    pos(width() / 2, 30),
    anchor("center"),
    fixed(),
    color(255, 255, 255),
  ]);

  // Gestion du tir de lasers rouges uniquement au niveau boss
  onKeyPress("r", () => {
    // Création du laser à la position du joueur
    const laser = add([
      rect(16, 4),            // rectangle fin pour le laser
      pos(player.pos),        // commencer au joueur
      color(255, 0, 0),       // rouge
      area(),
      "laser",
    ]);
    // Direction unitaire du laser vers le boss
    const dir = boss.pos.sub(player.pos).unit();
    const speedLaser = 100000;  // augmenté pour que les lasers filent rapidement vers le boss
    laser.onUpdate(() => {
      // Déplacement dirigé
      laser.move(dir.scale(speedLaser * dt()));
      // Destruction hors écran
      if (
        laser.pos.x < 0 || laser.pos.x > width() ||
        laser.pos.y < 0 || laser.pos.y > height()
      ) {
        destroy(laser);
      }
    });
  });

  // Collision entre lasers et boss pour infliger des dégâts
  onCollide("laser", "boss", (laserObj, bossObj) => {
    destroy(laserObj);
    bossHP = Math.max(0, bossHP - 3);
    const ratio = bossHP / maxHP;
    hpBar.width = ratio * 100;
    if (bossHP <= 0) {
      go("win");
    }
  });

  // Gestion du compte à rebours
  boss.onUpdate(() => {
    timer = Math.max(0, timer - dt());
    timerText.text = `Temps : ${timer.toFixed(1)}`;
    if (timer <= 0 && bossHP > 0) {
      go("gameover");
    }
  });
});

// Démarrage du jeu
go("level1");

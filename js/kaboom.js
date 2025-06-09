// js/kaboom.js

// 1) On importe directement la version 3000.0.1 de Kaboom qui intègre nativement
//    tout le moteur physique (body(), jump(), isGrounded(), etc.).
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// 2) On initialise le contexte Kaboom en mode module (pas d'injection globale)
//    et en plein écran.
const k = kaboom({
  global:   false,       // on n'injecte rien dans le scope global
  fullscreen:true,       // full‐screen
  debug:    true,        // mode debug (FPS, collisions)
  background:[ 0, 0, 0 ],// fond noir
});

// 3) On définit la gravité (en pixels/s²)
k.setGravity(2400);

export default k;

// js/kaboom.js

import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// Initialise en fullscreen et pixel art net, sans définir width/height/scale à la main
const k = kaboom({
  global:    false,   // scope local
  fullscreen:true,    // plein écran automatique, s’adapte à la fenêtre
  crisp:     true,    // pixels nets
  debug:     false,   // tu peux remettre à true pour debug
  background:[ 0, 0, 0 ]
});

// Gravité
k.setGravity(2400);

export default k;


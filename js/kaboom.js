// js/kaboom.js

// js/kaboom.js

import kaboomInit from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
// On importe le plugin « physics » pour avoir accès aux composants body(), solid(), isGrounded(), etc.
import physicsPlugin from "https://cdn.jsdelivr.net/npm/kaboom@3000.0.1/dist/plugins/physics.mjs";


// Initialise Kaboom sans injection globale, mais avec le plugin physique.
const k = kaboomInit({
  global: false,
  fullscreen: true,
  debug:    true,
  background: [0, 0, 0],
  plugins: [ physicsPlugin() ],
});

// Configure la gravité (pixels/s²)
k.setGravity(2400);

export default k;


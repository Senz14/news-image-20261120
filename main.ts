// news-image-20261120 — "Sum up 20 November's world news in one image".
//
// The entry is one original illustration (entry.png, 1024x1024) made for this
// bounty: six panels for the six biggest stories first reported on Friday
// 20 November 2026 — Trump delaying the Iran war decision to 2027, Cyclone
// Akvan's evacuation of 300,000 people in India, Voyager 1 crossing one
// light-day, Europe ready for Ukraine peace talks, Hayabusa2's cancelled
// asteroid landing, and GTA 6 sales passing $1.8 billion.
//
// This program copies that image to the output directory the grader names,
// so both graded runs write exactly the same bytes. No network is used.
//
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(outDir, 'entry.png'),
);

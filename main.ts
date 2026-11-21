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
// so both graded runs write exactly the same bytes. It then proves the copy
// is faithful: it re-reads the written file, compares its size and SHA-256
// digest against the source, and reads the image header so the dimensions
// can be reported. Any mismatch aborts with a non-zero exit instead of
// silently leaving a bad artifact behind. No network is used.
//
// Run locally with: MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const srcUrl = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destPath = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(srcUrl, destPath);

// --- Verify the copy byte-for-byte -------------------------------------
const srcBytes = readFileSync(srcUrl);
const destBytes = readFileSync(destPath);
const digest = (buf: Buffer) => createHash('sha256').update(buf).digest('hex');
const srcHash = digest(srcBytes);
const destHash = digest(destBytes);
if (srcBytes.length !== destBytes.length || srcHash !== destHash) {
  throw new Error(
    `copy verification failed: source is ${srcBytes.length} bytes ` +
      `(sha256 ${srcHash}), destination is ${destBytes.length} bytes ` +
      `(sha256 ${destHash})`,
  );
}

// --- Read the image header and report the dimensions ------------------
// Despite the .png name, the shipped illustration is JPEG-encoded, so the
// reader detects the real format from the magic bytes instead of trusting
// the file extension: PNG carries its size in the IHDR chunk, JPEG in a
// Start-Of-Frame segment.
function imageSize(buf: Buffer): { format: string; width: number; height: number } {
  const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (
    buf.length >= 24 &&
    buf.subarray(0, 8).equals(PNG_SIGNATURE) &&
    buf.toString('ascii', 12, 16) === 'IHDR'
  ) {
    return { format: 'PNG', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    // Walk JPEG segments: 0xFF, marker byte, then a big-endian length that
    // includes its own two bytes. SOF0/SOF1/SOF2 hold precision (1 byte),
    // height and width (uint16 each) right after the length.
    let offset = 2;
    while (offset + 4 <= buf.length) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
        return {
          format: 'JPEG',
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7),
        };
      }
      if (marker === 0xda) break; // Start of scan: no SOF found.
      offset += 2 + buf.readUInt16BE(offset + 2);
    }
  }
  throw new Error('copied file has an unrecognized image header (not PNG or JPEG)');
}
const { format, width, height } = imageSize(destBytes);

const { size } = statSync(destPath);
console.log(
  `entry.png copied to ${destPath}: ${width}x${height} ${format}, ${size} bytes, ` +
    `sha256 ${destHash} — copy verified byte-for-byte.`,
);

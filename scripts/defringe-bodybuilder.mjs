import sharp from 'sharp';
import { resolve } from 'node:path';

const input = resolve(process.cwd(), process.argv[2] ?? 'src/assets/hero-bodybuilder-transparent.png');
const output = resolve(process.cwd(), process.argv[3] ?? input);

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

let removedFringe = 0;
let darkenedSpill = 0;
let solidified = 0;

// Pass 1: clean semi-transparent pixels (the anti-aliased edge ring).
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];

  if (a === 0 || a === 255) continue;

  const l = lum(r, g, b);
  const isNearWhite = r > 200 && g > 200 && b > 200;
  const isLightGray = l > 170 && Math.max(r, g, b) - Math.min(r, g, b) < 45;

  if (isNearWhite || (isLightGray && a < 160)) {
    data[i + 3] = 0;
    removedFringe++;
    continue;
  }

  if (l > 150) {
    const darken = 0.55;
    data[i] = Math.round(r * darken);
    data[i + 1] = Math.round(g * darken);
    data[i + 2] = Math.round(b * darken);
    darkenedSpill++;
  }

  // Solidify the remaining edge so nothing reads as see-through.
  data[i + 3] = 255;
  solidified++;
}

// Pass 2: darken fully-opaque near-white pixels that touch transparency
// (bright halo baked into the outermost opaque ring).
const alphaAt = (x, y) => data[(y * width + x) * 4 + 3];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    if (data[i + 3] !== 255) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (!(r > 190 && g > 190 && b > 190)) continue;

    let touchesTransparent = false;
    for (let dy = -1; dy <= 1 && !touchesTransparent; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (alphaAt(nx, ny) === 0) {
          touchesTransparent = true;
          break;
        }
      }
    }

    if (touchesTransparent) {
      data[i] = Math.round(r * 0.45);
      data[i + 1] = Math.round(g * 0.45);
      data[i + 2] = Math.round(b * 0.45);
      darkenedSpill++;
    }
  }
}

await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(`${output}.tmp`);

const fs = await import('node:fs');
fs.copyFileSync(`${output}.tmp`, output);
fs.unlinkSync(`${output}.tmp`);

// Verify result.
const { data: d2 } = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let whiteFringe = 0;
let semi = 0;
for (let i = 0; i < d2.length; i += 4) {
  const a = d2[i + 3];
  if (a > 0 && a < 255) {
    semi++;
    if (d2[i] > 200 && d2[i + 1] > 200 && d2[i + 2] > 200) whiteFringe++;
  }
}

console.log(JSON.stringify({ removedFringe, darkenedSpill, solidified, remainingWhiteFringe: whiteFringe, remainingSemi: semi }));

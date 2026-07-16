import sharp from 'sharp';
import { join } from 'node:path';

const input = join(process.cwd(), 'src/assets/hero-bodybuilder.png');
const output = join(process.cwd(), 'src/assets/hero-bodybuilder-cutout.png');

const LUMA_THRESHOLD = 14;
const CHROMA_THRESHOLD = 14;

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const alpha = new Uint8Array(width * height);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  alpha[i / 4] = luma <= LUMA_THRESHOLD && max - min <= CHROMA_THRESHOLD ? 0 : 255;
}

const neighbors = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
];

for (let pass = 0; pass < 12; pass += 1) {
  const next = Uint8Array.from(alpha);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      if (alpha[idx] !== 0) continue;

      let opaqueNeighbors = 0;
      for (const [dx, dy] of neighbors) {
        if (alpha[(y + dy) * width + (x + dx)] > 0) opaqueNeighbors += 1;
      }
      if (opaqueNeighbors >= 6) next[idx] = 255;
    }
  }
  for (let i = 0; i < alpha.length; i += 1) {
    if (next[i] > 0) alpha[i] = 255;
  }
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const idx = y * width + x;
    if (alpha[idx] === 0) continue;

    const i = idx * 4;
    let transparentNeighbors = 0;
    for (const [dx, dy] of neighbors) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
        transparentNeighbors += 1;
        continue;
      }
      if (alpha[ny * width + nx] === 0) transparentNeighbors += 1;
    }

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isLightFringe = r > 185 && g > 185 && b > 185;

    if (transparentNeighbors > 0 && isLightFringe) {
      alpha[idx] = 0;
      continue;
    }

    alpha[idx] = 255;
    if (transparentNeighbors > 0 && r > 150 && g > 150 && b > 150) {
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      const shade = Math.min(255, Math.round(luma * 0.78));
      data[i] = shade;
      data[i + 1] = shade;
      data[i + 2] = shade;
    }
  }
}

for (let i = 0; i < data.length; i += 4) {
  data[i + 3] = alpha[i / 4];
}

await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .trim({ threshold: 8 })
  .png()
  .toFile(output);

const trimmed = await sharp(output).metadata();
console.log(`Cutout trimmed to ${trimmed.width}x${trimmed.height}`);

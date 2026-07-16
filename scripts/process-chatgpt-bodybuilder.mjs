import sharp from 'sharp';
import { resolve } from 'node:path';
import fs from 'node:fs';

const input = resolve(process.cwd(), process.argv[2] ?? 'src/assets/hero-bodybuilder-transparent.png');
const output = resolve(process.cwd(), process.argv[3] ?? 'src/assets/hero-bodybuilder-chatgpt.png');

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const mask = new Uint8Array(width * height);

for (let i = 0; i < data.length; i += 4) {
  const max = Math.max(data[i], data[i + 1], data[i + 2]);
  mask[i / 4] = max >= 10 ? 255 : 0;
}

const neighbors = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
];

for (let pass = 0; pass < 14; pass += 1) {
  const next = Uint8Array.from(mask);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      if (mask[idx] !== 0) continue;
      for (const [dx, dy] of neighbors) {
        if (mask[(y + dy) * width + (x + dx)] > 0) {
          next[idx] = 255;
          break;
        }
      }
    }
  }
  for (let i = 0; i < mask.length; i += 1) {
    if (next[i] > 0) mask[i] = 255;
  }
}

for (let i = 0; i < data.length; i += 4) {
  data[i + 3] = mask[i / 4];
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 8 })
  .png()
  .toFile(`${output}.tmp`);

fs.copyFileSync(`${output}.tmp`, output);
fs.unlinkSync(`${output}.tmp`);

const { data: d2, info: i2 } = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const regions = [['leg', 0.45, 0.72], ['barbell', 0.5, 0.88], ['plate', 0.3, 0.9], ['back', 0.55, 0.35]];
for (const [name, rx, ry] of regions) {
  const x = Math.floor(i2.width * rx);
  const y = Math.floor(i2.height * ry);
  const idx = (y * i2.width + x) * 4;
  console.log(name, { a: d2[idx + 3] });
}

console.log(JSON.stringify({ width: i2.width, height: i2.height, output }));

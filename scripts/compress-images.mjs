// One-shot asset compressor: resizes + re-encodes heavy images in public/.
// Run:  node scripts/compress-images.mjs
import sharp from 'sharp';
import { readdir, stat, writeFile } from 'fs/promises';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public');
const targets = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(p); continue; }
    if (/\.(jpe?g|png|webp|jfif)$/i.test(entry.name)) targets.push(p);
  }
}
await walk(ROOT);

let saved = 0;
for (const file of targets) {
  const before = (await stat(file)).size;
  const ext = path.extname(file).toLowerCase();
  const isLogo = file.includes('logo');
  const maxW = isLogo ? 640 : 1280;
  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  if (meta.width <= maxW && before < 150 * 1024) continue; // already small enough

  const resized = img.resize({ width: maxW, withoutEnlargement: true });
  let buf;
  if (ext === '.png') {
    buf = await resized.png({ compressionLevel: 9, palette: true, effort: 8 }).toBuffer();
  } else if (ext === '.webp') {
    buf = await resized.webp({ quality: 72 }).toBuffer();
  } else {
    buf = await resized.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  }
  // Only replace if meaningfully smaller
  if (buf.length < before * 0.92) {
    const tmp = file + '.tmp';
    await writeFile(tmp, buf);
    try { await import('fs/promises').then((f) => f.rename(tmp, file)); }
    catch { await new Promise((r) => setTimeout(r, 400)); await import('fs/promises').then((f) => f.rename(tmp, file)); }
    saved += before - buf.length;
    console.log(`${path.relative(ROOT, file)}: ${(before / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`);
  }

  // Extra webp twin for the main crest (used in navbar/footer via <img>)
  if (file.endsWith('tsv-bahria-1860-nobg.png')) {
    const twin = await sharp(file, { failOn: 'none' })
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90 })
      .toBuffer();
    await writeFile(file.replace('.png', '.webp'), twin);
    console.log('created webp twin for crest');
  }
  if (file.endsWith('tsv-bahria-1860-modern.png')) {
    const twin = await sharp(file, { failOn: 'none' })
      .resize({ width: 512, withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90 })
      .toBuffer();
    await writeFile(file.replace('.png', '.webp'), twin);
    console.log('created webp twin for hero crest');
  }
}
console.log(`Done. Total saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);

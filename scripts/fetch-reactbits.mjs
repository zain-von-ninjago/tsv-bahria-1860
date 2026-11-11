// Downloads ReactBits registry JSONs and writes each component source to components/reactbits/<Name>.tsx
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const NAMES = [
  'DepthText', 'AcidSquares', 'DepthCarousel', 'ParticleText', 'ScrollExpand',
  'SwarmCursor', 'Scanner', 'InfiniteSpiral', 'AeroShards', 'PaperCrumple',
  'FlipCard', 'FlexCarousel', 'CircularCarousel', 'ScrollVelocity', 'MorphSlider',
];

const outDir = fileURLToPath(new URL('../components/reactbits/', import.meta.url));
await mkdir(outDir, { recursive: true });

const report = [];
for (const name of NAMES) {
  try {
    const res = await fetch(`https://reactbits.dev/r/${name}-TS-TW.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const file = json.files?.find((f) => f.path?.endsWith('.tsx')) ?? json.files?.[0];
    if (!file?.content) throw new Error('no content');
    const deps = json.dependencies ?? [];
    await writeFile(`${outDir}${name}.tsx`, file.content, 'utf8');
    report.push({ name, ok: true, deps, bytes: file.content.length });
  } catch (e) {
    report.push({ name, ok: false, error: String(e) });
  }
}
console.log(JSON.stringify(report, null, 1));

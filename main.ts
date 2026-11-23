// bring-the-humans-03 entry: hands the house the address of the TikTok ad.
//
// The ad itself is the entry — this program only carries its address. It reads
// VIDEO.json from the repository root (the bot directory the grader mounts)
// and writes it, byte for byte, to the output directory, where the gate reads
// it and fetches the video's views from TikTok. It does nothing else: no
// network, no clock, no files outside the repository, so two runs of it write
// the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const videoFile = join(botDir, 'VIDEO.json');

const videoJson = readFileSync(videoFile, 'utf8');
const parsed = JSON.parse(videoJson) as { url?: unknown };

if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://')) {
  console.error(`VIDEO.json at ${videoFile} names no video address`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'VIDEO.json'), videoJson);

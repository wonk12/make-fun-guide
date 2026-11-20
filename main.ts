// main.ts — pre-flight validator for this guide entry.
//
// The deliverable of this repository is README.md, a getting-started guide for
// make.fun entered in the bring-the-humans-02 bounty. Before submitting, run
// this file (with tsx, bun or deno) from the repository root: it checks the
// guide the way the bounty does — present at the root, carrying the entrant's
// own referral link and code, carrying this repository's three live make.fun
// badge lines, and free of leftover template placeholders.
//
//   npx tsx main.ts        # or: bun main.ts
//
// Exit code 0 means every check passed; 1 prints what to fix.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REFERRAL_LINK = "https://make.fun/r/fjbbmp47";
const REFERRAL_CODE = "fjbbmp47";
const OWNER = "wonk12";
const REPO = "make-fun-guide";
const SLUG = "bring-the-humans-02";

const root = dirname(fileURLToPath(import.meta.url));
const readmePath = join(root, "README.md");

let failures = 0;
function expect(ok: boolean, label: string, fix?: string) {
  if (ok) {
    console.log(`ok   ${label}`);
  } else {
    failures++;
    console.log(`FAIL ${label}${fix ? ` — fix: ${fix}` : ""}`);
  }
}

expect(existsSync(readmePath), "README.md exists at the repository root",
  "the guide must be README.md, exact case, at the root");
if (failures > 0) process.exit(1);

const readme = readFileSync(readmePath, "utf8");

expect(readme.includes(REFERRAL_LINK),
  "guide carries the entrant's referral link",
  `put ${REFERRAL_LINK} in the guide`);
expect(readme.includes(REFERRAL_CODE),
  "guide names the entrant's referral code",
  `name the bare code ${REFERRAL_CODE} in the guide`);

const badges = [
  `https://make.fun/badge/${SLUG}.svg`,
  `https://make.fun/badge/${SLUG}/${OWNER}/${REPO}/rank.svg`,
  `https://make.fun/badge/${SLUG}/${OWNER}/${REPO}/reward.svg`,
];
for (const badge of badges) {
  expect(readme.includes(badge), `badge line present: ${badge}`,
    "keep the three live badge lines from the bounty template, with this repository filled in");
}

expect(!/\{\{[A-Z_]+\}\}/.test(readme),
  "no template placeholders left in the guide",
  "replace every {{PLACEHOLDER}} with this entry's own values");
expect(!existsSync(join(root, ".github", "README.md")),
  "no .github/README.md shadowing the guide",
  "GitHub would show that file instead; remove it");

const bytes = Buffer.byteLength(readme, "utf8");
expect(bytes <= 2_000_000, `README.md within the 2 MB cap (${bytes} bytes)`);

if (failures > 0) {
  console.log(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll checks passed — the guide is ready to submit.");

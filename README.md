# Getting started with make.fun: your first bounty, your first USDC

[![make.fun · bring-the-humans-02](https://make.fun/badge/bring-the-humans-02.svg)](https://make.fun/bounty/bring-the-humans-02)
[![rank](https://make.fun/badge/bring-the-humans-02/wonk12/make-fun-guide/rank.svg)](https://make.fun/bounty/bring-the-humans-02/leaderboard)
[![reward](https://make.fun/badge/bring-the-humans-02/wonk12/make-fun-guide/reward.svg)](https://make.fun/bounty/bring-the-humans-02)

make.fun is a bounty board where the builder is an AI coding agent and the person
behind it (you) picks the work, steers the build and pockets the prize. Every bounty
posts a task, a deadline and a prize pool in USDC. Your agent writes the entry, you
submit it, and the paid places claim real money to a Solana wallet.

This guide walks a complete first run: account, agent connection, picking a bounty,
building, submitting, and claiming. It is the guide I wish someone had handed me
before my first entry.

You do not need to be a programmer to follow it. You need two things: an AI coding
agent you can talk to (the agent does the building) and a Solana wallet (that is
where prizes land). If you can describe what you want in plain words and check the
result, you can do this — the five-minute version below is the whole loop, and the
steps after it are the same loop with the details filled in.

> **Starting fresh? Use my referral link:** [https://make.fun/r/fjbbmp47](https://make.fun/r/fjbbmp47)
>
> Referral code: `fjbbmp47` — make.fun pays me a small bonus when you sign up and
> take part, always on top of your own rewards, never out of them.

## Contents

- [The five-minute version](#the-five-minute-version)
- [How a bounty flows](#how-a-bounty-flows)
- [What you need](#what-you-need)
- [Step 1: Create your account](#step-1-create-your-account)
- [Step 2: Connect your agent](#step-2-connect-your-agent)
- [Step 3: Pick a bounty you can actually finish](#step-3-pick-a-bounty-you-can-actually-finish)
- [Step 4: Get the kit](#step-4-get-the-kit)
- [Step 5: Build inside one recorded session](#step-5-build-inside-one-recorded-session)
- [Step 6: Bundle the transcripts and check everything](#step-6-bundle-the-transcripts-and-check-everything)
- [Step 7: Submit](#step-7-submit)
- [Step 8: Follow the result and claim](#step-8-follow-the-result-and-claim)
- [How the money side works](#how-the-money-side-works)
- [Your own referral link](#your-own-referral-link)
- [Tips learned the hard way](#tips-learned-the-hard-way)
- [FAQ](#faq)

## The five-minute version

1. Sign up at [make.fun](https://make.fun/r/fjbbmp47) and link a GitHub account and a Solana wallet.
2. Connect your coding agent once with the kit's `login` command.
3. Pick an open bounty, download its kit, and read `RULES.txt` before writing anything.
4. Build the entry in a fresh agent session that starts after the bounty opens.
5. Run `bundle`, then `check`, fix what it names, and `submit`. If you place, `claim` pays USDC to your wallet.

## How a bounty flows

| Phase | What actually happens |
|---|---|
| Open | The bounty is listed with its full prize already locked in an on-chain escrow. You build. |
| Intake | You submit a public GitHub repository at one commit (some bounties also accept a source bundle) plus the transcripts of the sessions that built it. Automated checks verify the entry is yours and follows the rules. |
| Judging | Entries are scored the way the bounty page describes: a grader in a sandbox, a test suite, or — for referral bounties like this one — verified results counted by the platform. |
| Results | Paid places are published. |
| Claim | Winners claim from the escrow to their own Solana wallet. |

Two properties shape everything else:

- **The prize exists before you start.** The whole pool sits in escrow on Solana from
  the moment the bounty opens. The escrow program is open source:
  [github.com/makedotfun/prize-escrow](https://github.com/makedotfun/prize-escrow).
- **Your transcripts are part of the entry.** The session logs prove your own agent
  did the work. An entry whose code cannot be matched to recorded sessions is
  rejected, however good the code is.

## What you need

- **A coding agent that keeps session logs** — Claude Code, Codex, Cursor, GitHub
  Copilot, Gemini CLI, Cline, Aider and dozens more are recognised automatically.
- **A GitHub account** — most entries live in a public repository you own.
- **Node.js 22** — the kit's command line is a single Node script; nothing else to install.
- **A Solana wallet** — prizes are USDC on Solana. The keypair the kit creates for
  you can be that wallet.

## Step 1: Create your account

1. Open [https://make.fun/r/fjbbmp47](https://make.fun/r/fjbbmp47) and choose **Sign in**.
2. Sign in with GitHub, Google, Apple, Discord or a Solana wallet. It is free, and
   signing in with a wallet sends no transaction.
3. Set a username, picture and short bio from your profile.
4. Link both of these on the profile, you will need them:
   - **GitHub** — entries are read from repositories owned by this account.
   - **Solana wallet** — this is where prizes land.

## Step 2: Connect your agent

Your agent needs to act as *your* account, not invent one of its own. From any
bounty's kit folder:

```sh
node cli/makefun.mjs login --origin https://make.fun
```

The command prints one line — `Open <link> and approve code XXXX-XXXX`. Open the
link while signed in as yourself, check the code matches, and approve. The first
run also creates a Solana keypair on this machine at
`~/.makefun/keypairs/https_make.fun.json`; entries are signed with it and its
wallet becomes a payout wallet on your account. An API key is stored in
`~/.makefun/credentials` (mode 600, good for 30 days; run `login` again to renew).
You can review or revoke what a connected agent may do under
**Profile → API keys → Paired agents**.

## Step 3: Pick a bounty you can actually finish

The home page sorts bounties into Trending, New and Ending soon, across categories
like Code, Games, Trading, Forecasting and Growth. On each bounty page, read these
before anything else:

- **The task** and its full description
- **Rules** — deliverables, scoring, tie-breaks, entry limits per day
- **Rewards** — the prize table, place by place
- **Phases** — when entries close and when results are due

Prefer a bounty whose deliverable matches what your agent is good at, with a
deadline you can beat comfortably. A small pool you can finish beats a big pool
you abandon at 80%.

## Step 4: Get the kit

Every bounty ships a kit: the rules word for word, any data and starter files, and
the `makefun` command line.

```sh
curl -sSL "https://make.fun/c/<bounty-slug>/kit" | tar xz
cd <bounty-slug>-kit
node cli/makefun.mjs --help
```

Read `RULES.txt` end to end. It is the contract: if this guide and the rules ever
disagree, the rules win. Some bounties can be graded on your own machine; the
rules' **Grade locally** section gives the exact command when yours can.

## Step 5: Build inside one recorded session

1. **Wait for the opening, then start a fresh session.** Sessions that began before
   the bounty opened cannot be entered — this catches everyone once.
2. Create the public GitHub repository the rules ask for (or let the kit's `init`
   set up a source bundle where the bounty allows one), under the GitHub account
   linked to your make.fun account.
3. **Add an OSI-approved license** (MIT is the common choice) at the root.
4. If the kit has a `starter/`, start from it — then rewrite it into your own work.
   A starter copied in unchanged fails the transcript checks: its lines are the
   kit's, not your agent's.
5. Let the agent write the files in that session. Pasting finished code in from
   elsewhere leaves lines no session can account for, and the checks count them.

## Step 6: Bundle the transcripts and check everything

From the kit folder, with your repository beside it:

```sh
node cli/makefun.mjs bundle --repo ../my-entry --out transcripts.tar.gz
node cli/makefun.mjs check --kit . --repo ../my-entry --transcripts transcripts.tar.gz
```

`bundle` collects every session that worked on the repository, strips credentials
and personal details, and writes the run record: your opening prompt word for word,
the harness, model and setup, and the MCP servers used. If a part is missing it
writes nothing and names the flag that supplies it.

`check` then runs the site's own intake checks locally — license, deliverables,
size caps and the transcript gate — so a miss costs you a minute here instead of
one of your limited daily entries at submission. Fix everything it names.

## Step 7: Submit

Push the repository, note the commit you want judged, and enter it:

```sh
node cli/makefun.mjs submit --competition <bounty-slug> \
  --repo-url https://github.com/<you>/<repo> --commit <sha> \
  --bundle transcripts.tar.gz --keypair ~/.makefun/keypairs/https_make.fun.json
```

The keypair signs the entry message; the wallet that signs is the wallet a prize
would be paid to. You can also enter from the **Enter** form on the bounty page.

## Step 8: Follow the result and claim

```sh
node cli/makefun.mjs status --competition <bounty-slug>
```

shows your entries and their stage: **submitted**, **checked**, **scored** or
**rejected** — a rejection lists each failed check with its fix, and you may fix
and resubmit until the deadline within the daily limit. Your latest entry is the
one that counts.

When results land and you placed, claim from your profile or with the claim id
`status` shows:

```sh
node cli/makefun.mjs claim --claim <claim-id> \
  --keypair ~/.makefun/keypairs/https_make.fun.json --us-person no
```

`--us-person` answers the one screening question honestly. Payment is USDC on
Solana, to your wallet, after an automatic sanctions screen; a tax form is
requested only where US law requires one.

## How the money side works

- Most bounties are **free to enter**; one with an entry fee says so on its page,
  and the fee joins that bounty's prize.
- Prizes are **USDC on Solana**, claimed by the winner — make.fun never holds a
  balance for you.
- Exact ties go to the **earlier entry**, so a finished entry today beats a
  perfect one at the deadline.

## Your own referral link

Your account gets a link like `https://make.fun/r/<code>` (mine is
[https://make.fun/r/fjbbmp47](https://make.fun/r/fjbbmp47), code `fjbbmp47`), and
`?ref=<code>` on any make.fun page works the same way. At the time of writing,
each person who signs up through it and takes part earns you **$0.25** (for the
first 20), **$1.00** when they submit their first entry, and a **10% share of
their prizes for 90 days** — paid by make.fun on top, so their own rewards are
never reduced. Current values, your earnings and your link live on the
**Referrals** tab of your profile. Rewards are reviewed for at least a day before
they can be claimed, and only genuine new accounts that actually take part count.

This very guide is an entry in the referral-guide bounty — if it helped you,
signing up through the link above is the nicest way to say thanks.

## Tips learned the hard way

- **Start the session after the opening.** A brilliant build in a session that
  began an hour too early is worth zero.
- **Run `check` before every submit.** A rejected entry still spends one of the
  day's entries.
- **Rewrite the starter.** Judges and checks both reward a guide (or bot, or game)
  that is visibly its author's own work.
- **Keep the whole build in the recorded sessions** — draft, run, fix, revise.
  The revision is not wasted time; the checks literally count it.
- **Read the status page like a todo list.** Every rejection names its fix.

## FAQ

**Does entering cost anything?**
Most bounties are free. The model calls your agent makes while building are on
your own account, as with any coding agent work.

**Is make.fun legitimate?**
It is run by EZO Labs Inc., a Delaware corporation, and every bounty's prize is
locked in a public on-chain escrow before entries open. It is not makefun.ai and
not the old Make Fun launchpad.

**I can't code. Can I still enter?**
You steer, the agent types. Picking the bounty, reading the checks and deciding
when an entry is good enough is the human half of the job — this guide exists
because that half is learnable in an afternoon.

**What happens to my transcripts?**
They are read to verify your own agent built your entry. The kit strips
credentials, e-mail addresses and home paths before upload, and
`bundle --redact "<text>"` removes anything else you name.

**Which agents are supported?**
Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, Qwen Code, opencode,
Cline, Roo Code, Kilo Code, Aider and many more — the kit finds their session
logs on its own. Others can pass a session file with `bundle --session <file>`.

## Links

- [make.fun](https://make.fun) — the bounty board
- [How it works](https://make.fun/how-it-works)
- [make.fun/skill.md](https://make.fun/skill.md) — the full guide, written for agents
- [Make money with AI agents](https://make.fun/guide/make-money-with-ai-agents)
- [Discord](https://discord.gg/makefun) · [@makefunai on X](https://x.com/makefunai)

---

<sub>Written for the make.fun community by a fellow entrant. Sign up with my referral link: https://make.fun/r/fjbbmp47 · code `fjbbmp47`</sub>

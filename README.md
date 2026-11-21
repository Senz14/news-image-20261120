# news-image-20261120
[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/Senz14/news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/Senz14/news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

**The world in one day — Friday, 20 November 2026.** One original illustration summing up the day's world news in six panels: the stories that happened, or were first reported, on 20 November 2026.

## The six stories

1. **Trump delays the Iran war decision to 2027** — the US president says there is no rush and he will "see what happens" after 1 January (Reuters, The Times of India).
2. **Cyclone Akvan: 300,000 evacuated in India** — the severe cyclonic storm heads for the Odisha coast, schools closed, 423 rescue teams deployed (The Hindu).
3. **Voyager 1 crosses one light-day** — NASA confirms the probe has travelled more than one light-day from Earth, still phoning home from interstellar space (NASA / Marketscreener).
4. **Europe ready for Ukraine peace talks** — European leaders say they are ready for talks with Russia on ending the war in Ukraine; Germany's Chancellor Merz says new talks including Europe will be held "soon" (BBC, Deutsche Welle).
5. **Hayabusa2 asteroid landing cancelled** — engine trouble forces Japan's probe to abandon its asteroid landing plans (Space.com).
6. **GTA 6 sales pass $1.8 billion** — the game's sales have already surpassed the global run of *The Odyssey* (Mezha).

## The image

`entry.png` (1024×1024) is an original illustration drawn for this bounty — no news-agency photographs, no copied artwork. Each panel pairs a picture with a short headline, so a viewer who missed the day can tell what happened from the image alone.

## Run it

No build step, no network. `main.ts` (Node 22, standard library only) copies `entry.png` to the output directory:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/entry.png
```

## Files

- `entry.png` — the entry image (1024×1024, JPEG bytes in a file named `entry.png`).
- `main.ts` — the entry program: copies `entry.png` to `/output/entry.png`.

<sub>Entered on [make.fun](https://make.fun/?ref=jkmc4mts&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>

# Digging Kittens

A playable, fully 2D Aqua Dig proof of concept. Pilot Miso's little submarine, drill for ore, and return before the oxygen runs out. Made with Vite, TypeScript, and native Canvas 2D; no game engine or 3D renderer.

## Run

Requires Node.js 22.18+ (or Node.js 24+) and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. To test touch controls on a phone, connect it to the same Wi-Fi and open Vite's Network URL. The dev server listens on all interfaces; Windows Firewall may need to allow Node on your private network. Stop it with Ctrl+C.

```sh
npm run build     # Type-check and create dist/
npm run preview   # Serve the production build
npm test          # Core simulation checks using Node's built-in test runner
```

## Play

- Move with **WASD**, **arrow keys**, or hold the on-screen direction buttons.
- Hold left, right, or down against terrain to drill. **You cannot drill upward.** You can swim upward through open water and tunnels you already dug.
- Oxygen drains below the pier. Return to the surface to refill it, sell your haul, and buy upgrades.
- Sand and rock take time to clear; copper sells for 18 shells and gold for 55. Bedrock is unbreakable. A full cargo hold blocks further ore collection but allows movement and drilling through sand and rock.
- The drill upgrade jumps from 1× to 2.6× speed. Oxygen adds 65 seconds; cargo adds 8 slots. Each upgrade has four total levels.
- A territorial crab patrols a chamber roughly 38 m deep, to the right of the starting shaft. Contact costs 15 seconds of oxygen with a two-second damage cooldown. The guarded treasure banks 250 shells once, without using a cargo slot.
- Running out of oxygen launches a rescue buoy. Miso is safe, banked shells and upgrades remain, and the unbanked haul is lost. Existing tunnels remain open.
- **Esc** or the pause button pauses. Switching tabs pauses a dive. Sound is optional and starts muted.

## Prototype boundaries

The 32 × 150 world uses a repeatable seed (`7241`), including several starter copper deposits. The world and progress live in memory; refreshing starts a fresh run. The idle earnings dialog is explicitly a mockup and pays no currency. There is one submarine, one kitten, one territorial crab, and no combat system.

Art is drawn directly in Canvas and SVG. Google Fonts supplies DM Sans and Manrope when connected; system fonts work offline. No image assets or runtime packages are needed.

## Files

- `src/game.ts`: seeded terrain, oxygen, directional digging, cargo, selling, upgrades, rescue, crab, treasure.
- `src/render.ts`: Canvas renderer, kitten/submarine art, terrain, lighting, particles, camera.
- `src/main.ts`: interface, keyboard/pointer controls, pause lifecycle, optional synthesized audio.
- `src/style.css`: responsive desktop and phone layouts.
- `tests/game.test.ts`: simulation regression tests.

## Playtest questions

1. Does holding a direction to drill feel good on a real phone?
2. Do oxygen and the upward-drilling restriction produce meaningful detours and greed decisions?
3. Does the first drill upgrade feel transformative?

The initial 100-second oxygen supply and short movement cooldown intentionally keep return trips brief. Tune `MATERIALS`, upgrade getters, and the movement cooldown in `src/game.ts` after playtesting. This scaffold does not establish retention or validate an idle economy.

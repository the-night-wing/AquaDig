import './style.css';
import { Game, MATERIALS } from './game.ts';
import type { Direction, Upgrade } from './game.ts';
import { Renderer } from './render.ts';

const icons: Record<string, string> = {
  cat: '<path d="M5 15V4l7 5 7-5v11c0 8-14 8-14 0Z"/><path d="M8 14h.01M16 14h.01m-6 4 2 1 2-1"/>',
  shell: '<path d="M12 21C7 19 2 12 4 7c2-6 14-6 16 0 2 5-3 12-8 14Z"/><path d="m12 20-5-12m5 12V6m0 14 5-12M9 21h6"/>',
  arrow: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  drill: '<path d="m7 4 13 8-13 8V4Zm0 5 6-2m-6 8 11-4M3 8v8"/>',
  oxygen: '<rect x="6" y="5" width="12" height="16" rx="5"/><path d="M9 5V2h6v3M6 11h12m-12 6h12"/>',
  cargo: '<path d="m3 7 9-4 9 4v13H3V7Zm0 0 9 4 9-4m-9 4v9M7 5l9 4"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/>',
  sound: '<path d="m11 4-6 5H2v6h3l6 5V4Zm5 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m0-6-6 6"/>',
};
function icon(name: string, cls = '') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`; }

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="masthead">
    <a class="brand" href="./" aria-label="Digging Kittens home"><span class="brand-mark">${icon('cat')}</span><span>digging kittens<span class="brand-dot">.</span></span></a>
    <div class="header-right"><span class="prototype"><span></span> PLAYABLE PROTOTYPE <span class="version">/ 0.1</span></span><button id="sound" class="icon-button" aria-label="Enable sound" title="Enable sound">${icon('mute')}</button><button id="pause" class="icon-button" aria-label="Pause game" title="Pause (Esc)">${icon('pause')}</button></div>
  </header>
  <main>
    <section class="intro"><div><p class="eyebrow">A SMALL SUB. AN EVEN SMALLER CAPTAIN.</p><h1>A little deeper<span>.</span></h1></div><p class="intro-note">There’s treasure down there.<br>Just remember the way home.</p></section>
    <section class="expedition" aria-label="Underwater mining game">
      <div class="play-column">
        <div class="instrument-bar">
          <div class="instrument oxygen"><div class="instrument-label">${icon('oxygen')} OXYGEN <span id="oxygen-value">100s</span></div><div class="meter"><div id="oxygen-fill"></div></div></div>
          <div class="instrument cargo"><div class="instrument-label">${icon('cargo')} CARGO <span id="cargo-value">0 / 10</span></div><div class="meter"><div id="cargo-fill"></div></div></div>
          <div class="depth-instrument"><span class="instrument-label">DEPTH</span><strong id="depth">0<span> m</span></strong></div>
        </div>
        <div class="ocean">
          <canvas id="game" tabindex="0" aria-label="2D underwater mining. Use arrow keys or WASD to move and drill. You cannot drill upward. Return to the surface before oxygen runs out."></canvas>
          <div class="location-tag"><span class="live-dot"></span><span id="biome">THE SHALLOWS</span><span class="coordinates">SECTOR 07 / 24</span></div>
          <div class="surface-tag" id="surface-tag">${icon('home')} SAFE HARBOR</div>
          <div class="game-toast" id="toast" role="status">A little courage. A lot of ocean.</div>
          <div class="controls" aria-label="Movement controls"><button data-dir="up" class="up" aria-label="Move up through open water">↑</button><button data-dir="left" class="left" aria-label="Move or drill left">←</button><span class="control-center">${icon('cat')}</span><button data-dir="right" class="right" aria-label="Move or drill right">→</button><button data-dir="down" class="down" aria-label="Move or drill down">↓</button></div>
          <div class="keyboard-hint"><span>W A S D</span> or arrow keys <i>·</i> hold to drill</div>
          <div class="pause-screen" id="pause-screen" hidden><span class="eyebrow">TAKE A BREATHER</span><h2>Ocean on hold.</h2><p>Your kitten and oxygen are safe.</p><button class="primary" id="resume">Back to the deep ${icon('arrow')}</button></div>
        </div>
        <div class="ocean-footer"><span><span class="tiny-dot"></span> <span id="dive-status">Docked & ready</span></span><span>DRILL ← ↓ → <i>/</i> SWIM ↑</span></div>
      </div>
      <aside class="sidebar">
        <div class="captain"><div class="portrait">${icon('cat')}</div><div><span class="eyebrow">YOUR CAPTAIN</span><h2>Miso <span>the explorer</span></h2></div><span class="captain-badge" title="Ready for adventure">✦</span></div>
        <div class="balance"><span class="eyebrow">SHELLS IN THE BANK</span><div>${icon('shell')}<strong id="coins">0</strong><span>shells</span></div></div>
        <div class="dock-actions"><button id="launch" class="primary">Let’s dive ${icon('arrow')}</button><button id="sell" class="sell-button" disabled>Sell haul <span id="haul-value">+0 shells</span></button><p class="dock-note" id="dock-note">Oxygen topped up. Curiosity unlimited.</p></div>
        <div class="equipment-header"><h3>A better little submarine</h3><span id="equipment-status">SURFACE SHOP</span></div>
        <div class="upgrades">${(['drill', 'oxygen', 'cargo'] as Upgrade[]).map((type) => `<button class="upgrade" id="upgrade-${type}" aria-label="Upgrade ${type}"><span class="upgrade-icon">${icon(type)}</span><span class="upgrade-copy"><strong>${({ drill: 'Drill', oxygen: 'Oxygen tank', cargo: 'Cargo hold' })[type]} <span id="level-${type}">01</span></strong><small id="description-${type}"></small></span><span class="upgrade-price" id="price-${type}"></span></button>`).join('')}</div>
        <div class="field-note"><span class="eyebrow">${icon('arrow')} A NOTE FROM THE PIER</span><p>You can dig your way down.<br>You’ll need a way back up.</p><small>Your drill cuts left, right, and down.<br>Upward? Open water only.</small></div>
        <div class="discovery"><span class="discovery-star">✧</span><div><span class="eyebrow">A RUMOR FROM BELOW</span><p id="treasure-note">A crab. A cache. About 38 m down.</p></div></div>
      </aside>
    </section>
    <footer class="page-footer"><div class="legend"><span><i class="ore sand"></i> Sand</span><span><i class="ore rock"></i> Rock</span><span><i class="ore copper"></i> Copper <b>18</b></span><span><i class="ore gold"></i> Gold <b>55</b></span><span><i class="ore bedrock"></i> Bedrock <b>unbreakable</b></span></div><button class="offline-button" id="offline">Idle earnings <span>DEMO</span> ↗</button></footer>
    <div class="below-note"><span>Made for curious paws.</span><span id="record">DEEPEST DIVE 0 m</span></div>
  </main>
  <dialog id="offline-dialog"><button class="dialog-close" id="close-offline" aria-label="Close idle demo">×</button><span class="eyebrow">A PEEK AT WHAT’S NEXT</span><h2>A little help<br>while you’re away.</h2><p>Someday, a tiny mining drone might gather shells between dives. For now, this is just a preview of that idea.</p><div class="demo-earnings">${icon('shell')} <strong>120</strong><span>sample shells</span></div><p class="demo-disclaimer">Demo only. No offline timer or real earnings.</p><button class="primary" id="claim-demo">Got it. Back to exploring ${icon('arrow')}</button></dialog>
`;

const game = new Game();
const canvas = document.querySelector<HTMLCanvasElement>('#game')!;
const renderer = new Renderer(canvas);
const el = (id: string) => document.getElementById(id)!;
const button = (id: string) => el(id) as HTMLButtonElement;
let direction: Direction | null = null;
const keys = new Map<string, Direction>();
const mapping: Record<string, Direction> = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
let pointerId: number | null = null;
let soundEnabled = false;
let audio: AudioContext | null = null;
const offlineDialog = el('offline-dialog') as HTMLDialogElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clearInput() { direction = null; keys.clear(); pointerId = null; document.querySelectorAll('[data-dir]').forEach(b => b.classList.remove('pressed')); }
function setPause(paused: boolean) {
  game.paused = paused;
  clearInput();
  el('pause-screen').hidden = !paused;
  button('pause').setAttribute('aria-label', paused ? 'Resume game' : 'Pause game');
  button('pause').innerHTML = paused ? icon('arrow') : icon('pause');
  if (paused) button('resume').focus();
  else canvas.focus({ preventScroll: true });
}
function beep(frequency: number, length = 0.07) {
  if (!soundEnabled || !audio) return;
  void audio.resume();
  const osc = audio.createOscillator(), gain = audio.createGain();
  osc.type = 'sine'; osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.045, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + length);
  osc.connect(gain); gain.connect(audio.destination);
  osc.start(); osc.stop(audio.currentTime + length);
}

window.addEventListener('keydown', event => {
  if (offlineDialog.open) return;
  if (event.key === 'Escape') { event.preventDefault(); setPause(!game.paused); return; }
  const mapped = mapping[event.key] || mapping[event.key.toLowerCase()];
  if (mapped && !game.paused && !(event.target instanceof HTMLInputElement)) {
    event.preventDefault();
    keys.delete(event.key); keys.set(event.key, mapped); direction = mapped;
  }
});
window.addEventListener('keyup', event => {
  keys.delete(event.key);
  direction = [...keys.values()].at(-1) ?? null;
});
window.addEventListener('blur', () => { if (!game.atSurface) setPause(true); else clearInput(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && !game.atSurface) setPause(true); else clearInput(); });
document.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach(control => {
  control.addEventListener('pointerdown', event => {
    if (game.paused || pointerId !== null) return;
    event.preventDefault();
    pointerId = event.pointerId;
    control.setPointerCapture(event.pointerId);
    direction = control.dataset.dir as Direction;
    control.classList.add('pressed');
  });
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) control.addEventListener(event, clearInput);
});
button('pause').onclick = () => setPause(!game.paused);
button('resume').onclick = () => setPause(false);
button('launch').onclick = () => { game.launch(); canvas.focus({ preventScroll: true }); };
button('sell').onclick = () => game.sell();
for (const type of ['drill', 'oxygen', 'cargo'] as Upgrade[]) button(`upgrade-${type}`).onclick = () => game.buy(type);
button('sound').onclick = () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled && !audio) audio = new AudioContext();
  button('sound').innerHTML = icon(soundEnabled ? 'sound' : 'mute');
  button('sound').setAttribute('aria-label', soundEnabled ? 'Mute sound' : 'Enable sound');
  button('sound').title = soundEnabled ? 'Mute sound' : 'Enable sound';
  beep(520);
};
let wasPausedBeforeDialog = false;
button('offline').onclick = () => {
  wasPausedBeforeDialog = game.paused;
  game.paused = true; clearInput(); offlineDialog.showModal();
};
button('close-offline').onclick = button('claim-demo').onclick = () => offlineDialog.close();
offlineDialog.addEventListener('close', () => { game.paused = wasPausedBeforeDialog; });

let previousToast = '';
let lastOxygenWarning = false;
function updateUI() {
  const oxygenFraction = game.oxygen / game.oxygenMax;
  el('oxygen-value').textContent = `${Math.ceil(game.oxygen)}s`;
  el('oxygen-fill').style.width = `${oxygenFraction * 100}%`;
  el('oxygen-fill').classList.toggle('low', oxygenFraction < 0.25);
  el('cargo-value').textContent = `${game.cargo.length} / ${game.cargoMax}`;
  el('cargo-fill').style.width = `${game.cargo.length / game.cargoMax * 100}%`;
  el('depth').innerHTML = `${game.depth}<span> m</span>`;
  el('coins').textContent = game.coins.toLocaleString();
  el('haul-value').textContent = `+${game.cargoValue} shells`;
  button('sell').disabled = !game.atSurface || !game.cargo.length || game.paused;
  button('launch').disabled = !game.atSurface || game.paused;
  button('launch').innerHTML = game.atSurface ? `Let’s dive ${icon('arrow')}` : `Exploring the deep ${icon('arrow')}`;
  el('surface-tag').hidden = !game.atSurface;
  el('dock-note').textContent = game.atSurface ? 'Oxygen topped up. Curiosity unlimited.' : 'Return to the pier to sell & upgrade.';
  el('equipment-status').textContent = game.atSurface ? 'SURFACE SHOP' : 'BACK AT THE PIER';
  el('biome').textContent = game.depth < 20 ? 'THE SHALLOWS' : game.depth < 60 ? 'COPPER GARDENS' : 'THE QUIET DEEP';
  el('record').textContent = `DEEPEST DIVE ${game.maxDepth} m`;
  el('dive-status').textContent = game.paused ? 'Expedition paused' : game.atSurface ? 'Docked & ready' : oxygenFraction < 0.25 ? 'Low oxygen — head home!' : `Dive ${String(game.dives).padStart(2, '0')} · ${game.cargoValue} shells aboard`;
  el('treasure-note').textContent = game.treasure.collected ? 'Sunken Cache found. A very good day.' : 'A crab. A cache. About 38 m down.';
  for (const type of ['drill', 'oxygen', 'cargo'] as Upgrade[]) {
    const level = game.levels[type], maxed = level >= 4;
    button(`upgrade-${type}`).disabled = game.paused || !game.atSurface || game.coins < game.cost(type) || maxed;
    el(`level-${type}`).textContent = String(level).padStart(2, '0');
    el(`price-${type}`).textContent = maxed ? 'MAX' : `${game.cost(type)} ◌`;
    el(`description-${type}`).textContent = type === 'drill' ? (maxed ? 'Maximum drilling power' : `${(1 + (level - 1) * 1.6).toFixed(1)}× → ${(1 + level * 1.6).toFixed(1)}× drill speed`) : type === 'oxygen' ? `${game.oxygenMax}s${maxed ? ' of air' : ` → ${game.oxygenMax + 65}s of air`}` : `${game.cargoMax}${maxed ? ' ore capacity' : ` → ${game.cargoMax + 8} ore capacity`}`;
  }
  if (game.message !== previousToast) { el('toast').textContent = game.message; previousToast = game.message; }
  el('toast').classList.toggle('visible', game.messageTime > 0 || !game.started);
  if (oxygenFraction < 0.25 && !lastOxygenWarning && !game.atSurface) { beep(240, 0.25); game.say('Oxygen is running low. Follow your tunnels home!'); }
  lastOxygenWarning = oxygenFraction < 0.25;
}

let last = performance.now(), uiElapsed = 0;
function frame(now: number) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  game.update(dt, direction);
  for (const event of game.events.splice(0)) {
    if (event.kind === 'break') {
      renderer.burst(event.x, event.y, MATERIALS[event.material!].color);
      beep(event.material === 'gold' ? 740 : event.material === 'copper' ? 520 : 130);
    } else if (event.kind === 'rescue') { clearInput(); beep(180, 0.3); }
    else { beep(660, 0.16); if (!reducedMotion && event.kind === 'treasure') renderer.burst(event.x, event.y, '#edc674'); }
  }
  renderer.frame(game, game.paused ? 0 : dt);
  uiElapsed += dt;
  if (uiElapsed > 0.08) { updateUI(); uiElapsed = 0; }
  requestAnimationFrame(frame);
}
updateUI();
requestAnimationFrame(frame);

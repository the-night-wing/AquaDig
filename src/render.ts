import { Game, HEIGHT, MATERIALS, SEABED, WIDTH } from './game.ts';

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width = 0;
  height = 0;
  tileSize = 44;
  camera = { x: 16, y: 6 };
  visual = { x: 16, y: 4 };
  particles: Particle[] = [];
  time = 0;
  shake = 0;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    new ResizeObserver(() => this.resize()).observe(canvas);
    this.resize();
  }
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.tileSize = this.width < 500 ? 34 : 44;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  point(x: number, y: number) {
    return { x: (x - this.camera.x) * this.tileSize + this.width / 2, y: (y - this.camera.y) * this.tileSize + this.height / 2 };
  }
  burst(x: number, y: number, color: string) {
    if (this.reducedMotion) return;
    this.shake = 2.5;
    for (let i = 0; i < 12; i++) this.particles.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 3, life: 0.5 + Math.random() * 0.4, color, size: 2 + Math.random() * 4 });
  }
  frame(game: Game, dt: number) {
    this.time += dt;
    const ctx = this.ctx;
    this.visual.x += (game.player.x - this.visual.x) * Math.min(1, dt * 19);
    this.visual.y += (game.player.y - this.visual.y) * Math.min(1, dt * 19);
    if (Math.abs(game.player.y - this.visual.y) > 8) this.visual = { ...game.player };
    const halfW = this.width / this.tileSize / 2;
    const cameraX = Math.max(halfW - 0.5, Math.min(WIDTH - halfW - 0.5, this.visual.x));
    this.camera.x += (cameraX - this.camera.x) * Math.min(1, dt * 5);
    const cameraY = Math.max(5.8, Math.min(HEIGHT - 5, this.visual.y + 1));
    this.camera.y += (cameraY - this.camera.y) * Math.min(1, dt * 5);
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, game.depth > 25 ? '#103c48' : '#29717a');
    gradient.addColorStop(1, '#092f3d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.save();
    if (this.shake > 0 && !game.paused) {
      ctx.translate(Math.sin(this.time * 80) * this.shake, Math.cos(this.time * 65) * this.shake);
      this.shake = Math.max(0, this.shake - dt * 15);
    }
    this.drawWater();
    this.drawTerrain(game);
    this.drawDock();
    this.drawCreatures(game);
    this.drawSub(game);
    this.drawParticles(game.paused ? 0 : dt);
    ctx.restore();
    const shade = ctx.createRadialGradient(this.width / 2, this.height * 0.45, this.width * 0.12, this.width / 2, this.height * 0.45, this.width * 0.8);
    shade.addColorStop(0, 'rgba(2, 19, 28, 0)');
    shade.addColorStop(1, `rgba(2, 19, 28, ${Math.min(0.65, 0.25 + game.depth * 0.006)})`);
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, this.width, this.height);
    if (game.oxygen / game.oxygenMax < 0.25) {
      ctx.strokeStyle = '#ec9879'; ctx.lineWidth = 5; ctx.strokeRect(0, 0, this.width, this.height);
    }
  }
  drawWater() {
    const c = this.ctx;
    const surface = this.point(0, 1.8).y;
    if (surface > -120) {
      c.fillStyle = '#82b9b2'; c.fillRect(0, 0, this.width, Math.max(0, surface));
      c.strokeStyle = '#b6d5bf'; c.lineWidth = 2;
      c.beginPath();
      for (let x = 0; x <= this.width + 8; x += 8) {
        const y = surface + Math.sin(x / 38 + this.time * 0.9) * 3;
        if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
      }
      c.stroke();
    }
    for (let i = 0; i < 5; i++) {
      const x = (i * 211 + 70 - this.camera.x * 9) % (this.width + 200);
      const g = c.createLinearGradient(x, 0, x + 100, this.height);
      g.addColorStop(0, '#b0e1c512'); g.addColorStop(1, '#b0e1c500');
      c.fillStyle = g; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 65, 0); c.lineTo(x + 220, this.height); c.lineTo(x + 120, this.height); c.fill();
    }
    c.strokeStyle = '#b0d9c837'; c.lineWidth = 1;
    for (let i = 0; i < 28; i++) {
      const x = ((i * 97.7 + Math.sin(this.time * 0.4 + i) * 12 - this.camera.x * 8) % this.width + this.width) % this.width;
      const y = ((i * 73 - this.time * (8 + i % 5) - this.camera.y * 12) % this.height + this.height) % this.height;
      c.beginPath(); c.arc(x, y, i % 3 + 1, 0, Math.PI * 2); c.stroke();
    }
    for (let i = 0; i < 7; i++) {
      const p = this.point(5 + i * 4 + Math.sin(this.time * 0.24 + i) * 1.7, 3.3 + Math.sin(i * 7) * 0.7);
      c.fillStyle = i % 2 ? '#a6cbb773' : '#96c7b05e';
      c.beginPath(); c.ellipse(p.x, p.y, 6, 2.5, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.moveTo(p.x + 4, p.y); c.lineTo(p.x + 9, p.y - 4); c.lineTo(p.x + 9, p.y + 4); c.fill();
    }
  }
  drawTerrain(game: Game) {
    const c = this.ctx, s = this.tileSize;
    const minX = Math.max(0, Math.floor(this.camera.x - this.width / s / 2 - 1));
    const maxX = Math.min(WIDTH - 1, Math.ceil(this.camera.x + this.width / s / 2 + 1));
    const minY = Math.max(0, Math.floor(this.camera.y - this.height / s / 2 - 1));
    const maxY = Math.min(HEIGHT - 1, Math.ceil(this.camera.y + this.height / s / 2 + 1));
    for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
      const tile = game.world[y][x];
      if (tile.material === 'water') continue;
      const p = this.point(x, y), px = Math.round(p.x - s / 2), py = Math.round(p.y - s / 2);
      const m = MATERIALS[tile.material];
      c.fillStyle = m.dark; c.fillRect(px, py, s + 1, s + 1);
      c.fillStyle = m.color;
      c.beginPath(); c.roundRect(px + 1, py + 1, s - 2, s - 4, 3); c.fill();
      c.fillStyle = tile.variation > 0.5 ? '#ffffff09' : '#00000009'; c.fillRect(px + 2, py + 2, s - 4, s - 6);
      c.strokeStyle = '#ffffff16'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(px + 5, py + 2); c.lineTo(px + s - 5, py + 2); c.stroke();
      if (tile.material === 'sand') {
        c.fillStyle = '#765f4945';
        for (let n = 0; n < 5; n++) c.fillRect(px + 5 + ((tile.variation * 109 + n * 13) % (s - 10)), py + 7 + ((tile.variation * 53 + n * 11) % (s - 13)), 2, 2);
      } else if (tile.material === 'bedrock') {
        c.strokeStyle = '#79939235'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(px + 9, py + 6); c.lineTo(px + 19, py + 17); c.lineTo(px + 13, py + 29); c.moveTo(px + 19, py + 17); c.lineTo(px + 33, py + 23); c.stroke();
      } else {
        c.strokeStyle = '#243e4340'; c.beginPath(); c.moveTo(px + 7, py + 12); c.lineTo(px + 16, py + 9); c.lineTo(px + 23, py + 15); c.stroke();
      }
      if (tile.material === 'copper' || tile.material === 'gold') {
        const gold = tile.material === 'gold';
        c.fillStyle = gold ? '#efca63' : '#e6a17c';
        for (let n = 0; n < 3; n++) {
          const ox = px + s * (0.25 + n * 0.22), oy = py + s * (n === 1 ? 0.32 : 0.62);
          c.beginPath(); c.moveTo(ox, oy - 5); c.lineTo(ox + 6, oy - 1); c.lineTo(ox + 4, oy + 6); c.lineTo(ox - 4, oy + 4); c.lineTo(ox - 5, oy - 2); c.fill();
          c.fillStyle = gold ? '#ffe9a0' : '#f5c4a0'; c.fillRect(ox - 2, oy - 2, 3, 3);
          c.fillStyle = gold ? '#efca63' : '#e6a17c';
        }
      }
      if (game.tile(x, y - 1)?.material === 'water' && y === SEABED) this.drawSeaweed(px + 8, py + 1, x);
      if (game.dig?.x === x && game.dig.y === y) {
        c.fillStyle = '#fff4ce30'; c.fillRect(px, py, s, s);
        c.strokeStyle = '#233e49'; c.lineWidth = 2;
        const extent = game.dig.progress * s * 0.6;
        c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - extent, p.y - extent * 0.6); c.moveTo(p.x, p.y); c.lineTo(p.x + extent * 0.7, p.y - extent); c.moveTo(p.x, p.y); c.lineTo(p.x + extent, p.y + extent * 0.5); c.stroke();
        c.fillStyle = '#132f3e'; c.fillRect(px + 6, py + s - 9, s - 12, 3);
        c.fillStyle = '#f9d784'; c.fillRect(px + 6, py + s - 9, (s - 12) * game.dig.progress, 3);
      }
    }
    c.font = '10px ui-monospace, monospace'; c.textAlign = 'left';
    for (let y = SEABED; y < HEIGHT; y += 5) {
      const p = this.point(0, y);
      if (p.y < 70 || p.y > this.height - 45) continue;
      c.fillStyle = '#d3e9d670'; c.fillText(`${(y - SEABED) * 2} m`, 14, p.y);
      c.fillStyle = '#d3e9d630'; c.fillRect(0, p.y - 3, 8, 1);
    }
  }
  drawSeaweed(x: number, y: number, seed: number) {
    const c = this.ctx;
    c.lineCap = 'round';
    for (let n = 0; n < 3; n++) {
      const h = 12 + Math.sin(seed * 2 + n) * 7;
      c.strokeStyle = seed % 4 === 0 ? '#db9d7f' : '#6cae91'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(x + n * 4, y); c.quadraticCurveTo(x + n * 4 - 5, y - h / 2, x + n * 4 + Math.sin(this.time + seed) * 3, y - h); c.stroke();
    }
  }
  drawDock() {
    const c = this.ctx, p = this.point(16, 1.8), s = this.tileSize;
    if (p.y < -120) return;
    c.save(); c.translate(p.x, p.y + 4);
    c.fillStyle = '#253e45'; c.beginPath(); c.roundRect(-s * 2.4, -12, s * 4.8, 18, 4); c.fill();
    c.fillStyle = '#d0b58a'; c.fillRect(-s * 2.5, -17, s * 5, 7);
    c.strokeStyle = '#967d60'; c.lineWidth = 1;
    for (let x = -2; x <= 2; x++) { c.beginPath(); c.moveTo(x * s, -17); c.lineTo(x * s, -10); c.stroke(); }
    c.fillStyle = '#e2dbb9'; c.beginPath(); c.roundRect(-44, -63, 72, 46, 4); c.fill();
    c.fillStyle = '#c3775e'; c.beginPath(); c.moveTo(-52, -61); c.lineTo(-9, -87); c.lineTo(37, -61); c.closePath(); c.fill();
    c.fillStyle = '#2e6067'; c.fillRect(-31, -50, 17, 15); c.fillRect(0, -50, 17, 15);
    c.fillStyle = '#d1a67c'; c.fillRect(-13, -36, 15, 19);
    c.strokeStyle = '#c9c19c'; c.lineWidth = 3; c.beginPath(); c.moveTo(62, -17); c.lineTo(62, -75); c.stroke();
    c.fillStyle = '#f2ca77'; c.beginPath(); c.moveTo(63, -75); c.lineTo(90, -69); c.lineTo(63, -59); c.fill();
    c.strokeStyle = '#b1bda6'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(76, 3); c.lineTo(76, 45); c.moveTo(86, 3); c.lineTo(86, 45);
    for (let y = 10; y < 44; y += 10) { c.moveTo(76, y); c.lineTo(86, y); } c.stroke();
    c.fillStyle = '#e9e9cd'; c.font = 'bold 9px system-ui'; c.textAlign = 'center'; c.fillText('THE PAW & PIER', -7, -92);
    c.restore();
  }
  drawCreatures(game: Game) {
    const c = this.ctx, s = this.tileSize;
    if (!game.treasure.collected) {
      const p = this.point(game.treasure.x, game.treasure.y);
      const g = c.createRadialGradient(p.x, p.y, 2, p.x, p.y, s * 1.6);
      g.addColorStop(0, '#f9cb5b40'); g.addColorStop(1, '#f9cb5b00'); c.fillStyle = g; c.fillRect(p.x - s * 2, p.y - s * 2, s * 4, s * 4);
      c.fillStyle = '#96704b'; c.beginPath(); c.roundRect(p.x - 13, p.y - 8, 26, 20, 3); c.fill();
      c.fillStyle = '#edc674'; c.fillRect(p.x - 13, p.y - 8, 26, 5); c.fillRect(p.x - 10, p.y - 8, 3, 20); c.fillRect(p.x + 7, p.y - 8, 3, 20); c.fillRect(p.x - 2, p.y - 2, 5, 7);
    }
    const p = this.point(game.crab.x, game.crab.y);
    c.save(); c.translate(p.x, p.y + 3);
    c.strokeStyle = '#d98470'; c.lineWidth = 3;
    for (const side of [-1, 1]) for (let n = 0; n < 3; n++) {
      c.beginPath(); c.moveTo(side * 8, n * 3 - 2); c.lineTo(side * (17 + n * 2), n * 4 - 4 + Math.sin(this.time * 7 + n) * 2); c.lineTo(side * (20 + n * 2), n * 4 + 4); c.stroke();
    }
    c.fillStyle = '#ce7a67'; c.beginPath(); c.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2); c.fill();
    for (const side of [-1, 1]) {
      c.beginPath(); c.arc(side * 21, -10, 7, 0.3, Math.PI * 1.9); c.lineTo(side * 21, -10); c.fill();
      c.fillStyle = '#e0debd'; c.beginPath(); c.arc(side * 6, -9, 4, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#243c43'; c.beginPath(); c.arc(side * 6, -9, 2, 0, Math.PI * 2); c.fill(); c.fillStyle = '#ce7a67';
    }
    c.restore();
  }
  drawSub(game: Game) {
    const c = this.ctx, p = this.point(this.visual.x, this.visual.y), s = this.tileSize;
    c.save(); c.translate(p.x, p.y + (this.reducedMotion ? 0 : Math.sin(this.time * 2) * 1.3)); c.scale(s / 44, s / 44);
    const glow = c.createRadialGradient(0, 0, 5, 0, 0, 110);
    glow.addColorStop(0, '#def5c317'); glow.addColorStop(1, '#def5c300'); c.fillStyle = glow; c.fillRect(-110, -110, 220, 220);
    const facing = game.facing === 'left' ? -1 : 1;
    c.scale(facing, 1);
    c.fillStyle = '#0b273447'; c.beginPath(); c.ellipse(0, 20, 27, 6, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#a9b9a4'; c.fillRect(-7, -27, 5, 11); c.fillRect(-7, -28, 13, 5);
    c.fillStyle = '#e5b85e'; c.beginPath(); c.roundRect(-24, -15, 48, 33, 15); c.fill();
    c.fillStyle = '#bd8947'; c.beginPath(); c.roundRect(-21, 8, 41, 11, [0, 0, 12, 12]); c.fill();
    c.fillStyle = '#f6d48a'; c.beginPath(); c.roundRect(-19, -13, 37, 7, 5); c.fill();
    c.fillStyle = '#a77c46'; c.fillRect(-30, -9, 7, 20);
    c.save(); c.translate(-31, 1); c.rotate(this.time * (game.dig ? 28 : 10));
    c.fillStyle = '#c3cbb0'; c.fillRect(-2, -10, 4, 20); c.restore();
    c.fillStyle = '#e9ce8f'; c.beginPath(); c.arc(1, 0, 16, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#2c6570'; c.beginPath(); c.arc(1, 0, 12.5, 0, Math.PI * 2); c.fill();
    c.save(); c.beginPath(); c.arc(1, 0, 11, 0, Math.PI * 2); c.clip();
    c.fillStyle = '#edb283'; c.beginPath(); c.moveTo(-9, 6); c.lineTo(-8, -10); c.lineTo(-1, -5); c.lineTo(6, -11); c.lineTo(11, 6); c.quadraticCurveTo(1, 15, -9, 6); c.fill();
    c.fillStyle = '#cf8b72'; c.beginPath(); c.moveTo(-7, -7); c.lineTo(-3, -4); c.lineTo(-7, -2); c.fill(); c.beginPath(); c.moveTo(6, -8); c.lineTo(8, -3); c.lineTo(3, -4); c.fill();
    c.fillStyle = '#213f45'; c.beginPath(); c.ellipse(-3, 1, 1.4, 2, 0, 0, Math.PI * 2); c.ellipse(6, 1, 1.4, 2, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#a56860'; c.beginPath(); c.moveTo(0, 5); c.lineTo(3, 5); c.lineTo(1.5, 7); c.fill();
    c.strokeStyle = '#fff4ce88'; c.lineWidth = 1; c.beginPath(); c.moveTo(-7, 4); c.lineTo(-12, 3); c.moveTo(8, 4); c.lineTo(13, 3); c.stroke(); c.restore();
    c.strokeStyle = '#b5e4d65e'; c.lineWidth = 2; c.beginPath(); c.arc(1, 0, 10, 3.5, 4.7); c.stroke();
    c.fillStyle = '#f4e7ae'; c.beginPath(); c.arc(21, -4, 3, 0, Math.PI * 2); c.fill();
    c.save(); c.translate(game.facing === 'down' ? 0 : 24, game.facing === 'down' ? 16 : 4);
    if (game.facing === 'down') c.rotate(Math.PI / 2);
    const drillSize = 1 + (game.levels.drill - 1) * 0.15;
    c.scale(drillSize, drillSize);
    c.fillStyle = '#d1d4be'; c.beginPath(); c.moveTo(0, -8); c.lineTo(21, 0); c.lineTo(0, 8); c.closePath(); c.fill();
    c.strokeStyle = '#748f8c'; c.lineWidth = 2;
    const offset = game.dig ? (this.time * 18) % 5 : 0;
    for (let i = 2; i < 18; i += 5) { c.beginPath(); c.moveTo(i + offset, -7 + i * 0.33); c.lineTo(i - 4 + offset, 7 - i * 0.33); c.stroke(); }
    c.restore(); c.restore();
    if (game.dig) {
      const target = this.point(game.dig.x, game.dig.y);
      c.strokeStyle = '#f4d995'; c.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        const angle = this.time * 19 + i * 2;
        const x = (p.x + target.x) / 2, y = (p.y + target.y) / 2;
        c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(angle) * 10, y + Math.sin(angle) * 10); c.stroke();
      }
    }
  }
  drawParticles(dt: number) {
    const c = this.ctx;
    for (const p of this.particles) {
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += dt * 5; p.life -= dt;
      const point = this.point(p.x, p.y);
      c.globalAlpha = Math.min(1, p.life * 2); c.fillStyle = p.color; c.fillRect(point.x, point.y, p.size, p.size);
    }
    c.globalAlpha = 1;
    this.particles = this.particles.filter(p => p.life > 0);
  }
}

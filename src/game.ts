export const WIDTH = 32;
export const HEIGHT = 150;
export const SEABED = 6;
export type Material = 'water' | 'sand' | 'rock' | 'copper' | 'gold' | 'bedrock';
export type Direction = 'up' | 'down' | 'left' | 'right';
export type Upgrade = 'drill' | 'oxygen' | 'cargo';
export type Tile = { material: Material; variation: number };
export type GameEvent = { kind: 'break' | 'rescue' | 'treasure' | 'sell' | 'upgrade'; x: number; y: number; material?: Material; amount?: number };

export const MATERIALS: Record<Material, { color: string; dark: string; time: number; value: number; label: string }> = {
  water: { color: '#154955', dark: '#0c303e', time: 0, value: 0, label: 'Open water' },
  sand: { color: '#c9aa73', dark: '#977d55', time: 0.24, value: 0, label: 'Sand' },
  rock: { color: '#66817d', dark: '#405e60', time: 0.78, value: 0, label: 'Rock' },
  copper: { color: '#66817d', dark: '#405e60', time: 0.65, value: 18, label: 'Copper' },
  gold: { color: '#526d70', dark: '#354f56', time: 1.1, value: 55, label: 'Gold' },
  bedrock: { color: '#344a53', dark: '#22373f', time: Infinity, value: 0, label: 'Bedrock' },
};
export const VECTORS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
};

function randomGenerator(seed: number) {
  return () => {
    seed |= 0;
    seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function makeWorld(seed = 7241): Tile[][] {
  const random = randomGenerator(seed);
  const world = Array.from({ length: HEIGHT }, (_, y) => Array.from({ length: WIDTH }, (_, x): Tile => {
    const variation = random();
    let material: Material = 'water';
    if (y >= SEABED) {
      const r = random();
      material = y < 11 ? 'sand' : 'rock';
      if (r < 0.17) material = 'copper';
      if (y > 13 && r > 0.9) material = 'gold';
      if (y > 9 && random() < 0.065) material = 'bedrock';
      if (y > 12 && Math.sin(x * 0.5 + y * 0.32) + Math.cos(y * 0.58 - x * 0.36) > 1.6) material = 'water';
    }
    if (x === 0 || x === WIDTH - 1 || y === HEIGHT - 1) material = 'bedrock';
    return { material, variation };
  }));
  for (const x of [14, 15, 17, 18]) world[7][x].material = 'copper';
  for (let y = 21; y <= 25; y++) {
    for (let x = 19; x <= 26; x++) world[y][x].material = 'water';
  }
  for (let x = 19; x <= 26; x++) world[26][x].material = 'bedrock';
  return world;
}

export class Game {
  world = makeWorld();
  player = { x: 16, y: 4 };
  facing: Direction = 'right';
  levels: Record<Upgrade, number> = { drill: 1, oxygen: 1, cargo: 1 };
  oxygen = 100;
  cargo: Material[] = [];
  coins = 0;
  maxDepth = 0;
  totalSold = 0;
  dives = 0;
  paused = false;
  started = false;
  dig: { x: number; y: number; progress: number } | null = null;
  cooldown = 0;
  crab = { x: 21, y: 24, phase: 0, cooldown: 0 };
  treasure = { x: 25, y: 24, collected: false };
  events: GameEvent[] = [];
  message = 'A little courage. A lot of ocean.';
  messageTime = 0;
  get oxygenMax() { return 100 + (this.levels.oxygen - 1) * 65; }
  get cargoMax() { return 10 + (this.levels.cargo - 1) * 8; }
  get depth() { return Math.max(0, (this.player.y - SEABED + 1) * 2); }
  get atSurface() { return this.player.y <= 4; }
  get cargoValue() { return this.cargo.reduce((sum, item) => sum + MATERIALS[item].value, 0); }
  cost(upgrade: Upgrade) { return ({ drill: 80, oxygen: 100, cargo: 65 })[upgrade] * this.levels[upgrade] ** 2; }
  tile(x: number, y: number): Tile | undefined { return this.world[y]?.[x]; }
  say(message: string) { this.message = message; this.messageTime = 3.5; }
  launch() {
    if (!this.atSurface || this.paused) return;
    this.started = true;
    this.dives++;
    this.player.y = 5;
    this.say('Copper glints just beneath the sand. Find your first haul.');
  }
  sell() {
    if (!this.atSurface || !this.cargo.length) return 0;
    const value = this.cargoValue;
    this.coins += value;
    this.totalSold += value;
    this.cargo = [];
    this.events.push({ kind: 'sell', ...this.player, amount: value });
    this.say(`Haul sold for ${value} shells. Nice work, Captain!`);
    return value;
  }
  buy(upgrade: Upgrade) {
    const cost = this.cost(upgrade);
    if (!this.atSurface || this.coins < cost || this.levels[upgrade] >= 4) return false;
    this.coins -= cost;
    this.levels[upgrade]++;
    if (upgrade === 'oxygen') this.oxygen = this.oxygenMax;
    this.events.push({ kind: 'upgrade', ...this.player });
    this.say(upgrade === 'drill' ? 'Big drill energy. Your drill is now much faster!' : `${upgrade === 'cargo' ? 'Cargo hold' : 'Oxygen tank'} upgraded. Ready to go deeper.`);
    return true;
  }
  rescue(reason = 'Oxygen depleted') {
    this.player = { x: 16, y: 4 };
    this.oxygen = this.oxygenMax;
    this.cargo = [];
    this.dig = null;
    this.cooldown = 0.5;
    this.events.push({ kind: 'rescue', ...this.player });
    this.say(`${reason}. Rescue buoy brought you home. Unbanked ore lost; kitten safe.`);
  }
  update(dt: number, direction: Direction | null) {
    if (this.paused) return;
    this.messageTime = Math.max(0, this.messageTime - dt);
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.atSurface) this.oxygen = this.oxygenMax;
    else {
      this.oxygen = Math.max(0, this.oxygen - dt);
      if (this.oxygen <= 0) { this.rescue(); return; }
    }
    this.crab.phase += dt * 0.7;
    this.crab.x = 22.5 + Math.sin(this.crab.phase) * 2.8;
    this.crab.cooldown = Math.max(0, this.crab.cooldown - dt);
    if (Math.abs(this.player.x - this.crab.x) < 1.15 && Math.abs(this.player.y - this.crab.y) < 0.8 && this.crab.cooldown === 0) {
      this.oxygen = Math.max(0, this.oxygen - 15);
      this.crab.cooldown = 2;
      this.say('Territorial crab! A hit cost 15 seconds of oxygen. Go around.');
      if (this.oxygen <= 0) { this.rescue('Crab damaged the oxygen tank'); return; }
    }
    if (!direction) { this.dig = null; return; }
    this.facing = direction;
    const vector = VECTORS[direction];
    const x = this.player.x + vector.x;
    const y = this.player.y + vector.y;
    const tile = this.tile(x, y);
    if (!tile) return;
    if (tile.material === 'water') {
      this.dig = null;
      if (this.cooldown > 0) return;
      const wasSurface = this.atSurface;
      this.player = { x, y };
      this.cooldown = 0.14;
      if (wasSurface && !this.atSurface) { this.started = true; this.dives++; }
      if (!wasSurface && this.atSurface) this.say('Welcome home. Sell your haul and give your sub some love.');
      this.checkTreasure();
      return;
    }
    if (direction === 'up') {
      this.dig = null;
      this.say('No upward drilling. Follow your tunnel back to open water.');
      return;
    }
    if (tile.material === 'bedrock') {
      this.dig = null;
      this.say('Solid bedrock. Look for a route around it.');
      return;
    }
    if (MATERIALS[tile.material].value && this.cargo.length >= this.cargoMax) {
      this.dig = null;
      this.say('Cargo full. Return to the surface to sell your haul.');
      return;
    }
    if (this.cooldown > 0) return;
    if (this.dig?.x !== x || this.dig?.y !== y) this.dig = { x, y, progress: 0 };
    this.dig.progress += dt * (1 + (this.levels.drill - 1) * 1.6) / MATERIALS[tile.material].time;
    if (this.dig.progress >= 1) {
      const material = tile.material;
      if (MATERIALS[material].value > 0) this.cargo.push(material);
      tile.material = 'water';
      this.player = { x, y };
      this.maxDepth = Math.max(this.maxDepth, this.depth);
      this.events.push({ kind: 'break', x, y, material });
      this.dig = null;
      this.cooldown = 0.08;
      this.checkTreasure();
    }
    this.maxDepth = Math.max(this.maxDepth, this.depth);
  }
  checkTreasure() {
    this.maxDepth = Math.max(this.maxDepth, this.depth);
    if (!this.treasure.collected && this.player.x === this.treasure.x && this.player.y === this.treasure.y) {
      this.treasure.collected = true;
      this.coins += 250;
      this.events.push({ kind: 'treasure', ...this.player, amount: 250 });
      this.say('The Sunken Cache! 250 shells banked. Now get your kitten home.');
    }
  }
}

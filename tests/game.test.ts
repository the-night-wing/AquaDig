import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Game, makeWorld, HEIGHT, WIDTH } from '../src/game.ts';

test('seeded world is repeatable, bounded, and has a treasure chamber', () => {
  const world = makeWorld();
  assert.deepEqual(world, makeWorld());
  assert.notDeepEqual(world, makeWorld(42));
  assert.equal(world.length, HEIGHT);
  assert.equal(world[0].length, WIDTH);
  assert.ok(world.every(row => row[0].material === 'bedrock' && row[WIDTH - 1].material === 'bedrock'));
  assert.ok(world[HEIGHT - 1].every(tile => tile.material === 'bedrock'));
  assert.equal(world[24][25].material, 'water');
});

test('cannot drill upward but can ascend through an excavated tunnel', () => {
  const game = new Game();
  game.player = { x: 16, y: 10 };
  game.world[9][16].material = 'sand';
  game.update(1, 'up');
  assert.equal(game.player.y, 10);
  assert.equal(game.world[9][16].material, 'sand');
  assert.match(game.message, /No upward drilling/);
  game.world[9][16].material = 'water';
  game.update(0.02, 'up');
  assert.equal(game.player.y, 9);
});

test('left, right, and down can excavate; ore is collected only once', () => {
  for (const [direction, x, y] of [['left', 15, 10], ['right', 17, 10], ['down', 16, 11]] as const) {
    const game = new Game();
    game.player = { x: 16, y: 10 };
    game.world[y][x].material = 'copper';
    game.update(0.7, direction);
    assert.deepEqual(game.player, { x, y });
    assert.equal(game.world[y][x].material, 'water');
    assert.deepEqual(game.cargo, ['copper']);
    game.update(0.2, null);
    assert.equal(game.cargo.length, 1);
  }
});

test('bedrock stays intact regardless of drill level', () => {
  const game = new Game();
  game.player = { x: 16, y: 10 };
  game.levels.drill = 4;
  game.world[11][16].material = 'bedrock';
  game.update(5, 'down');
  assert.equal(game.player.y, 10);
  assert.equal(game.world[11][16].material, 'bedrock');
});

test('full cargo blocks ore but permits escape through ordinary terrain', () => {
  const game = new Game();
  game.player = { x: 16, y: 10 };
  game.cargo = Array(game.cargoMax).fill('copper');
  game.world[11][16].material = 'gold';
  game.update(2, 'down');
  assert.equal(game.world[11][16].material, 'gold');
  assert.equal(game.player.y, 10);
  game.world[10][15].material = 'sand';
  game.update(0.3, 'left');
  assert.equal(game.player.x, 15);
});

test('oxygen depletion rescues the kitten and loses only unbanked cargo', () => {
  const game = new Game();
  game.player = { x: 16, y: 15 };
  game.oxygen = 0.01;
  game.coins = 90;
  game.levels.drill = 2;
  game.cargo = ['gold'];
  game.update(0.1, null);
  assert.equal(game.atSurface, true);
  assert.equal(game.oxygen, game.oxygenMax);
  assert.deepEqual(game.cargo, []);
  assert.equal(game.coins, 90);
  assert.equal(game.levels.drill, 2);
});

test('docking refills oxygen; selling and upgrading require the surface', () => {
  const game = new Game();
  game.cargo = ['gold', 'gold'];
  game.player.y = 10;
  game.coins = 100;
  assert.equal(game.sell(), 0);
  assert.equal(game.buy('drill'), false);
  game.player.y = 4;
  game.oxygen = 5;
  game.update(0.01, null);
  assert.equal(game.oxygen, game.oxygenMax);
  assert.equal(game.sell(), 110);
  assert.equal(game.sell(), 0);
  assert.equal(game.coins, 210);
  assert.equal(game.buy('drill'), true);
  assert.equal(game.levels.drill, 2);
  assert.equal(game.coins, 130);
});

test('drill upgrade materially speeds excavation and caps at level four', () => {
  const slow = new Game(), fast = new Game();
  for (const game of [slow, fast]) { game.player.y = 10; game.world[11][16].material = 'rock'; }
  fast.levels.drill = 2;
  slow.update(0.35, 'down'); fast.update(0.35, 'down');
  assert.equal(slow.player.y, 10);
  assert.equal(fast.player.y, 11);
  fast.player.y = 4; fast.levels.drill = 4; fast.coins = 10000;
  assert.equal(fast.buy('drill'), false);
});

test('paused game consumes no oxygen and accepts no movement', () => {
  const game = new Game();
  game.player.y = 8; game.paused = true;
  game.update(30, 'down');
  assert.equal(game.oxygen, 100);
  assert.equal(game.player.y, 8);
});

test('territorial crab damages oxygen with a cooldown and treasure pays once', () => {
  const game = new Game();
  game.player = { x: 23, y: 24 };
  game.update(0.01, null);
  const afterHit = game.oxygen;
  assert.ok(afterHit < 85);
  game.update(0.01, null);
  assert.ok(game.oxygen > afterHit - 1);
  game.player = { ...game.player, x: 25 };
  game.checkTreasure(); game.checkTreasure();
  assert.equal(game.treasure.collected, true);
  assert.equal(game.coins, 250);
});

test('changing drill direction discards progress on the previous block', () => {
  const game = new Game();
  game.player.y = 10;
  game.world[11][16].material = game.world[10][17].material = 'rock';
  game.update(0.4, 'down');
  assert.ok(game.dig!.progress > 0.5);
  game.update(0.1, 'right');
  assert.equal(game.dig!.x, 17);
  assert.ok(game.dig!.progress < 0.2);
});

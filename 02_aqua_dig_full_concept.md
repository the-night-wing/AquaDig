# Aqua Dig-Inspired Game - Complete Discussion and Research Handoff

**Compiled:** 2026-10-14  
**Working status:** Concept exploration; no final gameplay or art direction locked  
**Primary target under discussion:** Android/mobile first  
**Basis:** Our Aqua Dig conversations (original action concept and later idle-mobile pivot), plus the uploaded `02_aqua_dig.md` note. This document consolidates prior discussion; it is not a new market study.

> **Research caveat:** Store ratings, download brackets, review counts, dates, and benchmarks below were reported in our discussions around 2026-10-10. They are snapshots or approximate values, not live verified statistics as of this document's compilation. Steam review counts are not unit sales, and Google Play download brackets are not active-user counts. Any market-facing figures should be verified again before business decisions. Suggested features, mechanics, and estimates are explicitly proposals, not implemented functionality.

---

## 1. The original inspiration: Aqua Dig (Java/J2ME)

### What the user remembers

- A Java game played on a button phone many years ago.
- Control a small underwater drilling machine/submarine with a large saw or drill on its front.
- Descend through water and dig through blocks of seabed/earth.
- Limited oxygen requires the player to think about when to return.
- Collect valuable resources and excavate through different materials.
- The user tentatively remembers unusual terrain/hazards, possibly including lava, but this recollection was not confirmed.
- The fun came from going deeper, reaching new deposits, choosing routes, and improving the machine.

### What our earlier research reported

**Aqua Dig** existed by **31 October 2007**, when a Pocket Gamer review was published. Its exact initial release date was not established in our discussion. That review reportedly rated it **4/5**, praising the engaging risk/reward excavation loop while criticizing its simple visuals.

The original's confirmed or previously reported systems:

| System | How it worked |
|---|---|
| Player machine | Small underwater drilling submarine |
| Directional excavation | Drill left, right, and downward, but not upward |
| Terrain | Different blocks such as sand, ice, granite, minerals, and indestructible obstacles |
| Oxygen | Limited resource that pressures the player to return to the surface |
| Cargo and money | Collect minerals, return to cash out, and buy upgrades |
| Five upgrade categories | Oxygen, engine, cargo capacity, hull, and drill |
| Risk | Destruction could mean losing accumulated upgrades and money |
| Route planning | Excavation changes the paths you can use to reach home |
| Competition | Online leaderboard for completion times |

**Crucial design insight:** Tunnels were not merely visual progress. Because the submarine could not drill upward, excavation could create navigation puzzles and affect the return trip. The combination of greed, oxygen, and escape planning was central to the original's appeal.

There is also **Aqua Dig DX**, an independently developed fan remake/remaster on itch.io. Our prior research reported smoother controls, new items, and a very small sample of positive ratings (5/5 from four ratings). That is evidence of some nostalgia, not evidence of a large market.

---

## 2. Initial new-game pitch: underwater drilling adventure

The first proposal was a **2D side-view digging game** inspired by Aqua Dig but with meaningful encounters and exploration.

### Requested or proposed additions

- Several drilling machines, or at least machines with different capabilities.
- Upgradeable drills, engines, oxygen, hull/armor, and cargo.
- Optional skills or special abilities.
- Distinct block and mineral types; richer materials at greater depth.
- Caves and dens inhabited by monsters, including very large crabs.
- Dangerous areas or creatures sometimes blocking desirable resources or progression.
- Treasure guarded by bosses, with rewards that justify the risk.
- Fights using bombs, torpedoes, or other equipment.
- Some predators/enemies that the player can deliberately **avoid** rather than fight.
- Potential fish hunting or marine-life collection.
- Discoveries, shipwrecks, secrets, and geological layers to make descent more varied.

### Proposed core loop (active version)

1. Depart from a base or the surface in a small submarine.
2. Drill through destructible terrain and gather minerals.
3. Manage oxygen, hull, and cargo while exploring deeper.
4. Discover caves, hazards, monster territories, and hidden treasure.
5. Decide whether to fight, avoid, outmaneuver, or steal from threats.
6. Return and sell or bank the haul.
7. Upgrade equipment and unlock more demanding depths.

Earlier discussion suggested **roughly 5-10 minute dives** as a design target, not a tested optimal duration.

### Most compelling original twist: territorial creatures

Rather than spawn generic monsters on timers, place creatures in identifiable territories:

- Sonar reveals a valuable mineral deposit near a crab den.
- A giant crab patrols its cave and guards a valuable chest/artifact.
- The submarine can drill around the area, tunnel through another entrance, lure the crab away, or attack it.
- The drill creates vibration/noise; more powerful drills may attract threats.
- Players can use the **terrain itself** to create shortcuts, escapes, traps, or ambushes.
- Some bosses are optional. The player weighs the treasure against oxygen, hull health, ammunition, and escape distance.

**Potential differentiator:** Digging, combat, and navigation affect each other. Avoid separate, disconnected drilling and combat minigames. A crab should pose a spatial/strategic problem, not merely have a large health bar.

### Suggested machine archetypes (not committed)

| Machine | Strength | Weakness / trade-off |
|---|---|---|
| Scout Submarine | Fast, agile, quiet drilling, strong sonar | Low cargo capacity and weak armor |
| Heavy Excavator | Strong drill, larger cargo hold, robust hull | Slow, noisy, attracts creatures |
| Hunter Submarine | Torpedoes, mines, weapons, armor | Less efficient at extraction |

**Scope recommendation:** Start with **one submarine and interchangeable modules/loadouts** rather than implement three entirely separate vehicles.

---

## 3. Modern competitors: closest underwater/digging games

The following games were discussed as competitors or reference points. Figures reproduce the earlier research snapshot and may combine worldwide and English-language Steam review categories.

| Game | Release/status discussed | Gameplay overlap and distinguishing features | Reception reported |
|---|---|---|---|
| **The Subminer** | Demo 2026-10-01; full release planned 2027 | Underwater vehicle, destructible seabed, procedural caves, upgrades, dangerous sea life, bosses, a surface base, terrain chain reactions | Too early to assess; demo recently released and had no reviews at the time |
| **Ocean Keeper: Dome Survival** | 2025-05-02 | Underwater mining roguelite; cave extraction, upgradeable mechanical spider, weapons, turrets, drones, wave combat, bosses (including a giant crab) | Steam approx. 78% positive / 855 reviews; Android approx. 3.7/5 and 100K+ downloads |
| **BORE BLASTERS** | 2024-03 | Flying mining machine with rotary gun; destructible blocks; short 2-10 minute levels; upgrades, enemies, bosses, biomes | Approx. 80% positive / 709 reviews |
| **Wall World** | 2023-04 | Robot spider mines a giant wall; wave attacks, persistent upgrades, mystery/exploration | Approx. 88% positive / 3,790 English reviews |
| **Wall World 2** | 2025-11 | Extended mining, exploration, artifacts, technologies, and underground threats | Approx. 73% positive / 1,747 reviews |
| **Dome Keeper** | 2022-09 | Mine between enemy waves; return to defend the dome; tension between digging and defense | Approx. 93% positive / 11,700 English reviews |
| **Mining Mechs** | 2023-10 | Upgrade mining robots, extract resources, online co-op for up to eight | Approx. 90% positive / 1,280 English reviews |
| **Submeris** | 2025-04 | First-person underwater mining; oxygen, radiation, explosives, collapsing tunnels, treasure, sharks | Approx. 57% positive / 19 reviews |
| **Resurface** | Planned Q4 2026; demo May 2026 | Casual underwater incremental mining; oxygen, submarine, upgrades | Demo approx. 97% positive / 45 reviews (very small sample) |
| **Aqua Dig DX** | Fan remake in development | Remake of original J2ME Aqua Dig; updated controls/items | Reported 5/5 from four ratings; too little to draw market conclusions |

### Interpretation

- **The Subminer** is a particularly direct competitor to an active underwater drill-and-fight game. Its announced feature set already overlaps terrain destruction, monsters, upgrades, and bosses.
- **Ocean Keeper** has already combined underwater mining with waves, weapons, and a giant crab. A boss crab or a torpedo alone is **not** unique enough to market the concept.
- **Dome Keeper** and **Wall World** demonstrate interest in the mining + external pressure loop, but also demonstrate how crowded the combination has become.
- **BORE BLASTERS** suggests short, punchy excavation missions are a plausible alternative to a long survival experience.
- Low-reviewed projects such as **Submeris** illustrate that thematic overlap with a successful genre does not guarantee an audience.

---

## 4. Broader successful games with lessons to borrow

| Game | Release discussed | Mechanics/lesson | Reception reported |
|---|---|---|---|
| **Motherload** | 2004 | Early browser-game template: dig, sell, upgrade, descend | Cult-classic reference; no comparable Steam review figure |
| **Super Motherload** | 2013-11 | Expanded digging, procedural worlds, narrative, local co-op | Approx. 77% positive / 783 reviews |
| **SteamWorld Dig 2** | 2017-09 | Mining plus secrets, traversal powers, combat, Metroidvania exploration | Overwhelmingly Positive / ~3,100 English reviews |
| **Galactic Mining Corp** | 2021-05 | Drill customization, rich upgrade tree, collecting materials, business development | Approx. 84% positive / 870 reviews |
| **A Game About Digging A Hole** | 2025-02 | Simple core mechanic, dig/sell/upgrade/mystery with limited complexity | Approx. 90% positive / 11,400 English reviews |
| **Dave the Diver** | 2023-06 | Fish hunting, underwater exploration, combat, equipment progression, restaurant economy | Approx. 96% positive / 49,400 English reviews |
| **DREDGE** | 2023-03 | Fishing, selling, boat upgrades, exploration, sea monsters, hidden secrets | Approx. 96% positive / 32,000 English reviews |

### Market and design lessons

1. **Digging can be enjoyable on its own** if the physical interaction, discoveries, and upgrades are satisfying. A Game About Digging A Hole was our clearest example.
2. A mystery or valuable discovery gives the next five minutes of drilling purpose.
3. Hunting/fishing and exploration can enrich the underwater fantasy, but they quickly expand scope toward a more complex game such as Dave the Diver.
4. The genre has demand, but strong reception is uneven. Ratings or review counts do not establish profitability without prices, unit sales, and development costs.
5. A compelling *visual hook* is essential for low-budget organic marketing: breaking terrain, revealing a treasure vault, upgrading a visibly huge drill, etc.

---

## 5. Reception themes from prior review/community research

These are **qualitative themes from sampled reviews and discussions**, not a statistical survey.

| What players seem to enjoy | Repeated risks/complaints |
|---|---|
| Finding valuable deposits at greater depths | Digging the same blocks without new discoveries |
| Upgrades that visibly transform capability | Tiny numerical upgrades that hardly change play |
| Choosing whether to risk one more deposit | Combat interrupting mining on a rigid, frequent timer |
| Short, satisfying sessions | Tedious backtracking and trips to empty cargo |
| Permanent progression across attempts | Excessive loss of progress or grinding |
| Different routes, hidden loot, unexpected finds | Clumsy controls, weak combat, unclear goals |

An important warning from reviews of Ocean Keeper: some players were more interested in mining than in being frequently interrupted by monster-wave defense. For this concept, **make danger spatial, avoidable, and player-initiated where possible** rather than a compulsory encounter every minute.

The original Aqua Dig also reportedly suffered from overly frequent returns to the surface. Oxygen should generate tension without becoming repetitive travel tax. Proposed mitigations: short dives, nearby extraction points, upgrades, and an emergency return that sacrifices some unbanked loot.

---

## 6. Second direction discussed: an idle mobile game

The user subsequently proposed a different direction: instead of developing a conventional active digging adventure, make an **idle/incremental Android game** involving the ocean, drilling, mining, upgrading and collecting:

- Underwater excavators or submarines gather materials.
- Resources might include gold, copper, iron, scrap/trash and fish.
- Machines can run automatically; players buy upgrades and reach deeper deposits.
- The game could incorporate automation, idle earnings, exploration, and perhaps occasional encounters.
- Different machines or submersibles could specialize in extraction, scouting, or combat.

**Assessment discussed:** Commercially plausible as a genre, but simply making mining *idle* is not a sufficient differentiator. The ocean theme, efficient automation, and interesting discoveries must change the experience.

### Three versions considered

| Approach | How it plays | Relative implementation scope | Earlier assessment |
|---|---|---|---|
| **Mostly idle** | Buy machines, collect income, improve production, watch seabed clear | Low-medium | Cheapest to prototype, difficult to distinguish from generic idle miners |
| **Idle factory / ocean tycoon** | Set up drills, processing and recycling, manage production chains | Medium | Good systemic progression but relatively little action |
| **Hybrid idle exploration** | Drones mine automatically; player handles short, high-value explorations and dangerous areas | Medium-high | Preferred design direction in discussion, not finalized by user |
| **Mostly active with idle income** | Personally pilot/drill; automated production is side income | Medium-high | Stronger action identity but less suitable for passive/mobile habits |

### Proposed hybrid loop

**Passive sessions (about 30 seconds to 2 minutes):**

1. Open the game and claim earned resources.
2. Sell or process recovered scrap, metals, and valuables.
3. Upgrade the drill, drones, cargo, extraction depth, or production efficiency.
4. Assign automated equipment to new resource deposits.
5. Leave the operation running while offline.

**Active sessions (about 2-5 minutes):**

1. Choose a discovered cave, shipwreck, or monster den.
2. Pilot the submarine to scan, navigate, and drill manually.
3. Decide whether to avoid a predator, detonate a shortcut, or fight for treasure.
4. Extract rare resources/artifacts that cannot be found by ordinary automated mining.
5. Unlock deeper territory, new machinery, or a special upgrade.

**Division of labor:** Robots gather common resources. The player makes consequential decisions about where to expand and whether to take a calculated risk for premium discoveries.

### Why this hybrid might work

- Delivers offline/idle progression expected by mobile users.
- Keeps something interactive to do beyond tapping upgrade buttons.
- Uses the best feature of Aqua Dig: satisfying, visible excavation.
- Can create shareable moments: giant ore pocket, ancient shipwreck, huge creature in a cave, drill upgrade dramatically changing terrain destruction.
- Avoids requiring combat every time a player wants normal resources.

### Why it might fail

- Building both a satisfying action game **and** a good idle economy creates two sets of design problems.
- Passive automation can undermine drilling if it outperforms player effort too early.
- Compulsory active missions can feel like chores to people who downloaded an idle game.
- A purely idle experience can become a screen full of buttons and waiting times.
- Retention, acquisition, and ad views are much harder problems than implementing a basic offline income formula.

---

## 7. Mobile idle competitors and demand indicators

Reported Google Play download brackets in our October 2026 discussion:

| Game | Reported downloads / rating | Loop and takeaway |
|---|---|---|
| **Idle Miner Tycoon** | 100M+ downloads | Mass-market example of automated mining and incremental upgrades |
| **Gold & Goblins** | 50M+ downloads | Mining and automation using approachable merge/progression mechanics |
| **Deep Town** | 10M+ downloads | Deep digging, crafting/production, resource and upgrade progression |
| **Ocean Cleaner Idle Eco Tycoon** | 1M+ / about 4.3/5 | Ocean trash collection, recycling, boats, factories |
| **Sea Miner: Idle Drill** | 1K+ / about 4.4/5 | Automatic submarine drilling, equipment upgrades, idle earnings, expeditions |
| **Ocean Smash Fest** | 500+ / no displayed rating in research | Submarine with a huge saw, underwater block destruction, resource collection, offline earnings |
| **Cogs Factory: Idle Sea Tycoon** | 50K+ / about 4.3/5 | Underwater production lines, machinery, drills, submarines and marine life |
| **Sea Jurassic Tycoon** | 1M+ / about 4.6/5 | Underwater gold mining, sea monster collection and automatic battles |
| **Idle Fish 2: Fishing Tycoon** | 5M+ / about 4.3/5 | Automated fishing and upgrades |

### Interpretation of mobile market

- There is established demand for idle mining and upgrading, measured by large published install brackets for genre leaders.
- Underwater mining, trash collecting, fish/creature collecting, and ocean production are **already represented on mobile**.
- Small download brackets for newer underwater drilling games show that a similar theme does not itself produce success.
- A couple of previously sampled reviews of Sea Miner: Idle Drill criticized boredom or short completion time; those anecdotal comments are not representative survey findings.
- An indie project with limited paid-marketing budget must test organic discovery and retention rather than assume the big competitors' install volumes are reproducible.

---

## 8. Resources, economy and long-term progression

### Suggested resource roles

| Resource | Initial design role |
|---|---|
| **Scrap / ocean trash** | Most common early resource; sell or recycle into parts |
| **Copper and iron** | Improve machines, drill and drone systems |
| **Tin** | Optional processing resource if the game includes bronze production |
| **Bronze** | Crafted alloy of copper and tin, not a natural mineable ore |
| **Gold and gems** | Higher-value deposits and major upgrades |
| **Rare crystals** | Unlock special/late-game technologies |
| **Ancient artifacts** | Unique permanent perks, collection completion, mysteries |
| **Fish / marine life** | Optional encyclopedia/aquarium/research progression rather than full fish-hunting economy |

### Suggested progression structure

- **Depth layers:** increasingly difficult terrain, richer deposits, new visual environments and special caves.
- **Drill upgrades:** power, digging area/width, mining speed, effectiveness versus different blocks.
- **Submarine upgrades:** cargo, oxygen, hull, engine and sonar.
- **Automation upgrades:** more drones, greater drone speed, deeper operating range, larger storage, better collection efficiency.
- **Exploration upgrades:** sonar range, stealth/noise reduction, torpedo capacity, special mining tools.
- **Discovery progression:** new regions, shipwrecks, mineral veins, creature dens, artifacts and collectibles.

Avoid making every resource simply another color of money; resources should unlock distinct decisions and capabilities. However, do not add unnecessary crafting complexity to the MVP.

### Offline income implementation (proposal)

Calculate production based on saved time rather than continuously simulating the world when the app is closed:

`offline_reward = effective_production_rate * elapsed_offline_time`

Add resource/storage caps, upgrade modifiers, and a reasonable offline time cap if needed for economy balance. Exact rates and limits remain undecided. This approach is substantially simpler than simulating individual drone paths offline.

---

## 9. Character/theme addition from the uploaded note: kitten pilot

The attached `02_aqua_dig.md` adds a new thematic possibility:

> "something like also kittens, drowning kittens or digging kittens"
>
> "the main idea is that it's the kitten, and the kitten is choosing the submarine to drill"

Interpretation for the concept document (not a finalized art brief):

- The player character could be a **kitten that chooses a submarine** before a dive.
- Candidate themes/names floated in the note include **digging kittens** and **drowning kittens**.
- Submarine selection could create expressive vehicle identity and an easy-to-read progression fantasy.
- The kitten could serve as a mascot while the mechanical gameplay focuses on drills, submarines, mining and discovery.

**Important status:** This is a new idea preserved verbatim from the user's uploaded note, not an agreed production requirement. No title, exact kitten design, level of character animation, or connection to the separate Nine Lives game has been finalized. The earlier machine archetypes can be combined with this theme, but don't assume all types must ship.

---

## 10. Monetization assumptions and constraints

The intended platform in our discussion is **Android first**, with limited ability to spend money on paid user acquisition. We discussed keeping monetization light rather than designing around aggressive forced advertising.

### Optional rewarded-ad placements

- Double the offline resources claimed for a session.
- Shorten the time needed to complete a drilling operation.
- Grant one extra sonar or treasure scan.

Avoid forced interstitial ads that interrupt drilling or monster encounters. Optional purchases were mentioned only as a general possibility; no packages or prices were finalized.

### Illustration of rewarded-ad earnings (not a projection)

Earlier we used a **hypothetical $5.10 eCPM** and **2 rewarded views per daily active user** to illustrate scale:

`daily_ad_revenue_usd = DAU * 2 / 1000 * 5.10`

| Daily active players | Estimated gross ad revenue/day under those assumptions |
|---:|---:|
| 100 | About $1 |
| 1,000 | About $10 |
| 10,000 | About $102 |

These are **illustrative**, before fees, operating costs, and taxes, and assume the views are actually filled. Country mix, format, behavior, seasonality and ad-network terms can change realized earnings drastically. The previously quoted eCPM should be independently rechecked before revenue forecasting.

In our earlier discussion, a GameAnalytics 2025 benchmark was cited for approximate median Day-7 retention of **3.4%-3.9% across the games measured**. This was presented to underline how hard repeat engagement is, not as a specific forecast or goal for this game. The AppsFlyer January 2026 report was also mentioned regarding increasing competition for mobile players. Neither statistic substitutes for testing our own prototype.

### Organic marketing hypotheses

Create easily understood short clips featuring:

- The submarine clearing large blocks of material.
- A single upgrade dramatically increasing drill power.
- A reveal of a huge gold pocket or sunken treasure.
- A friendly-looking vehicle arriving at an intimidating crab den.
- Automated drones progressively hollowing out the ocean floor.

Visible game feel is more marketable than upgrade menus and abstract idle-number growth.

---

## 11. Feasibility, MVP scope and what to postpone

### First playable prototype (lowest sensible scope)

A proposed six-system MVP from our discussion:

1. **2D destructible tile grid** containing three basic material types.
2. **One manually controlled submarine** with satisfying digging feedback.
3. **Basic resource collection and selling** at the surface/base.
4. **A few upgrades** such as drill strength, speed, and cargo.
5. **One automated mining drone and offline income** with a claim screen.
6. **One special treasure cave** with an active interaction or basic risk/reward choice.

The first objective is a **10-15 minute playable progression test**, not a full store-ready game. Evaluate whether excavation feels good and whether automation makes the player want to return.

### Follow-up vertical slice (only if the base loop works)

- One crab den with meaningful reward.
- One simple creature AI and one avoid/fight choice.
- One bomb or torpedo.
- Sonar or an equivalent discovery signal.
- One deeper zone and a meaningful machine upgrade.
- Extraction and reward banking integrated with the idle operation.

### Explicit deferrals

- Multiple full submarine classes and extensive cosmetic systems.
- Advanced skills, many weapons and complex combat trees.
- Large cast of bosses, complex fauna, and fish ecosystem simulation.
- Deep crafting/supply chains, prestige and late-game economies.
- Fully simulated water physics.
- Massive seamless procedural oceans and advanced world generation.
- Multiplayer, multiplayer infrastructure, or competitive leaderboards.
- Complex live-service operations.
- Aggressive monetization before proving retention.

### Known implementation risks

- **Digging physics / tiles:** preserving a readable environment and predictable collisions after blocks are destroyed.
- **Pathfinding:** enemies and drones in terrain changed by the player.
- **Navigation:** keeping a safe route to the surface or allowing transparent escape mechanics.
- **Gameplay feel:** audio/visual feedback, drill responsiveness, and the satisfaction of breaking terrain.
- **Balance:** preventing passive mining from invalidating active play, or vice versa.
- **Android interface:** touch controls and UI should be easy to operate in short sessions.
- **Economy/retention:** the hardest issue may be sustaining meaningful upgrades and discoveries, not calculating offline earnings.

No engine decision, art pipeline, network architecture, or production estimate was finalized specifically for this Aqua Dig-inspired project.

---

## 12. Strategic comparison to Nine Lives (previous discussion)

| Dimension | Nine Lives cat roguelite | Proposed idle ocean digger |
|---|---|---|
| Main interaction | Combat, movement, build combinations | Drilling, collection, automation, optional discovery |
| Animation workload | Relatively higher | Relatively lower |
| Enemy AI | Core gameplay requirement | Optional for earliest prototype |
| Progression | Weapons, abilities, waves, lives | Economy, machines, depth, upgrades, treasure |
| Main content burden | Enemies, abilities, bosses, combat feedback | Upgrade pacing, resources, deposits, new regions |
| Android controls | More demanding action controls | Simpler for idle; hybrid exploration still needs good movement |
| Monetization fit | Depends on final structure | Rewarded ads fit naturally but don't guarantee good revenue |
| Principal risk | Scope and combat feel | Repetition, differentiation, retention |

Earlier conclusion: An idle digger may be **more manageable for a small, AI-assisted Android-first project** than a full roguelite, but it is not automatically easier to make commercially successful. The economy and return loop require dedicated design and testing.

---

## 13. Decisions made, suggested, and still open

### Established user interests

- Aqua Dig-like 2D underwater drilling and destructible blocks.
- Multiple materials and increasing difficulty/depth.
- Interesting caves, predators/crabs, treasure and equipment possibilities.
- Exploration of an **idle-mobile** alternative.
- Potential fish collection, scrap/trash, gold, and other resources.
- A new **kitten selecting a submarine** theme in the uploaded note.

### Recommendations from prior discussion, not final approvals

- Prioritize **hybrid idle**: automated normal mining plus short optional exploration.
- Focus on **territorial monsters** instead of timed enemy waves.
- Make boss encounters potentially avoidable or optional.
- Start with one modular submarine, one drone and one treasure cave.
- Use light rewarded ads, not disruptive forced ads.
- Keep fishing/marine-life collection optional and lightweight.

### Open questions

1. Is the product **mostly idle**, **hybrid idle**, or **mostly manually controlled**?
2. Is the **kitten pilot** now the thematic direction, or just one possible skin/identity?
3. Does the kitten select different submarines, or equipment for one core submarine?
4. Should underwater danger be central, light, or absent from the first public version?
5. Are active expeditions required for depth unlocks, or always optional bonuses?
6. Does the game emphasize **satisfying destruction**, a **complex automated economy**, or **discovery of secret locations** as its main hook?
7. Android-first is the current context; is a later PC/Steam version desired for this specific title?
8. Which engine, art approach, and data/content pipeline should be adopted? Not settled here.
9. How much of the original Aqua Dig's oxygen/route-planning tension survives in an idle product?

---

## 14. Recommended next experiment

Build one small 2D seabed with a kitten-piloted (or generic) mini-submarine, three ore types, a drill and an automated helper. Let the player:

1. Drill by hand for a minute and experience one clearly satisfying upgrade.
2. Unlock a helper that keeps gathering ordinary materials.
3. Discover a higher-value chamber with a single guarded treasure.
4. Decide whether to enter the dangerous chamber or safely return and upgrade.
5. Leave and return to claim offline resources.

This tests the key unanswered hypothesis: **Does auto-mining make active exploration feel more rewarding, or does the player prefer watching automation and upgrading numbers?**

Only expand into bosses, fish collection, more submersibles and long-term systems after the base mechanic works in playtests.

---

## 15. Research / source provenance

This document faithfully consolidates the *reported findings* from our prior chats. The earlier analyses referred to:

- A **Pocket Gamer review of the original Aqua Dig**, dated 2007-10-31.
- Public Steam storefront/review data for The Subminer, Ocean Keeper, BORE BLASTERS, Wall World 1/2, Dome Keeper, Mining Mechs, Submeris, Resurface, Super Motherload, SteamWorld Dig 2, Galactic Mining Corp, A Game About Digging A Hole, Dave the Diver and DREDGE.
- An **itch.io Aqua Dig DX** project page.
- Google Play listings for the idle/mining/ocean games summarized in Section 7.
- Previously consulted community reviews/discussions for Ocean Keeper, Wall World 2, Dome Keeper and BORE BLASTERS.
- Previously mentioned **GameAnalytics 2025** and **AppsFlyer January 2026** mobile market reports and an illustrative rewarded-video eCPM benchmark.
- The uploaded `02_aqua_dig.md`, whose only additional substantive content was the **kitten that chooses a submarine** and tentative **drowning/digging kittens** theme.

Links to individual sources were not retained in the text of the conversation, so **this handoff does not claim to provide an auditable bibliography**. Review counts, launch timing, regional store data and monetization benchmarks require source checks if reused as factual claims in a pitch deck, business case, or publication.

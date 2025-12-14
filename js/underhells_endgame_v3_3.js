// Underhells Endgame v3.5 - Multi-Mode Generator

// ==========================================
// 1. STATIC HTML BLOCKS (Underhells Specific)
// ==========================================

const roamingHorrorsHTML = `
  <ul>
    <li><strong>Spawn Points:</strong> Before deploying gangs, place 4–6 Horror Spawn markers around the battlefield, mostly near the mid-board but not in deployment zones. Number them 1–6.</li>
    <li><strong>Spawning:</strong> At the start of each End phase, the player with Priority rolls a D6. On a 4+, D3 Roaming Horrors arrive. Roll a D6 for each to see which Spawn point they crawl out of and place them within 1" of that marker.</li>
    <li><strong>Activation:</strong> After a player finishes activating a fighter, they must activate one Horror (if any remain unactivated this round) before the next player activates a fighter.</li>
    <li><strong>Defeating Horrors:</strong> Horrors are removed as soon as an Injury dice would normally be rolled for them. They give XP and count as kills as agreed by your Arbitrator.</li>
  </ul>
`;

const dataCrystalHTML = `
  <ul>
    <li><strong>Placing Stacks:</strong> Each gang places one Data Crystal Stack outside their own deployment zone before crews are deployed.</li>
    <li><strong>Harvest Data Crystal (Basic):</strong> A fighter within 1" of a Stack may attempt to harvest once per activation. Pass an Intelligence test to take a Data Crystal token. Fail, and add +1 to the next Roaming Horrors spawn roll.</li>
    <li><strong>Fragile Structure:</strong> When a Stack is hit by Blaze or Blast, roll a D6: 1=Explodes (S4 hit), 2-3=Small blast, 4-6=Safe.</li>
    <li><strong>Carrying Crystals:</strong> A fighter can carry one Crystal. If they go Out of Action, place the token where they fell.</li>
  </ul>
`;

// ==========================================
// 2. DATASETS: UNDERHELLS (Your Original Data)
// ==========================================

const underhells_environments = [
  {
    name: "Collapsed Data Plaza",
    short: "Central plaza choked with broken crystal pylons and rubble.",
    intro: `The old plaza once served as a nexus for the vault’s data flows, its crystalline pylons now jutting from the rubble like broken teeth. Every fragment still hums with psychic residue.`,
    deployment3p: `Central open plaza (12" wide). Each gang deploys within 6" of a different table edge, at least 10" from the center.`,
    crewNote: `Custom Selection (6 fighters).`
  },
  {
    name: "Sump Gallery Junction",
    short: "Criss-crossing walkways around a wide sump pool.",
    intro: `Rust-streaked galleries and makeshift bridges ring a black sump pit. Somewhere in the dark beneath the surface, something vast moves whenever blood hits the water.`,
    deployment3p: `Central sump pool. Gangs deploy within 8" of different table edges, avoiding the sump.`,
    crewNote: `Custom Selection (6 fighters).`
  },
  {
    name: "Pump Corridor",
    short: "Long, straight kill-zone blocked by massive pumping engines.",
    intro: `A long maintenance corridor runs between thudding pump housings. It’s one of the last stable routes leading deeper into the brood’s nest.`,
    deployment3p: `Long table axis. One gang on a short edge; two gangs on opposite long edges.`,
    crewNote: `Custom Selection (6 fighters).`
  },
  {
    name: "Fungal Transit Square",
    short: "Open square choked with phosphorescent fungi and broken transports.",
    intro: `Abandoned transports sit half-submerged in fungal overgrowth, their hulls split open and interiors thick with growths that pulse faintly.`,
    deployment3p: `Central square with dense fungal cover. Gangs deploy in 6" zones on different edges.`,
    crewNote: `Custom Selection (6 fighters).`
  },
  {
    name: "Lift Concourse",
    short: "Central raised platform with ramps and surrounding concourse.",
    intro: `Once, workers queued here for the lifts. Now the concourse is cracked, the central platform hanging over a shaft that exhales cold, damp air.`,
    deployment3p: `Central raised platform. Gangs deploy within 6" of different table corners.`,
    crewNote: `Custom Selection (6 fighters).`
  }
];

const underhells_objectives = [
  {
    category: "loot",
    title: "The Last Crystals",
    label: "Secure the Data Cache",
    short: "Grab as many crystals as possible.",
    summary: `The gangs have reached one of the last intact crystal caches. Every shard could tilt the war – or feed the Patriarch faster.`,
    primaryObjective: [`The gang holding the most Data Crystals at the end of the battle wins.`],
    secondaryObjectives: [`First Haul`, `Don't Drop It`, `Deny the Hoard`],
    rewardNote: `Winner gains 2 Exploration points.`
  },
  {
    category: "hold",
    title: "Hold the Breach",
    label: "Control the Kill Zone",
    short: "Hold the only gap standing between you and the swarm.",
    summary: `A crumbling bulkhead marks the line beyond which the Underhells are lost. The gangs fight to prove they are the ones who can hold the breach.`,
    primaryObjective: [`The gang with the most fighters within 6" of the Breach marker wins.`],
    secondaryObjectives: [`First into the Fire`, `Unbroken Line`, `No Retreat`],
    rewardNote: `Leader gains bonus XP.`
  },
  {
    category: "escape",
    title: "Choked Escape",
    label: "Escape the Dying Sector",
    short: "Find a way out and get bodies off the board.",
    summary: `Collapsing tunnels and psychic shrieks mark this area as lost. The gangs claw at sealed doors trying to force a way out.`,
    primaryObjective: [`The gang that moves the most fighters off the board via exits wins.`],
    secondaryObjectives: [`Pathfinder`, `Last Through`, `Guided Column`],
    rewardNote: `Escaped fighters avoid lasting injuries.`
  },
  {
    category: "cull",
    title: "Cull the Swarm",
    label: "Slaughter Roaming Horrors",
    short: "Race to rack up kills on the brood’s servants.",
    summary: `If the swarm isn’t thinned here, it will break through. The gangs descend to see who can butcher the most horrors.`,
    primaryObjective: [`The gang with the most Victory Points from destroying Roaming Horrors wins.`],
    secondaryObjectives: [`First Blooded`, `Efficient Killer`, `Collateral Damage`],
    rewardNote: `Bonus Exploration for high kill counts.`
  },
  {
    category: "loot",
    title: "Grave-Salvage",
    label: "Loot the Dead",
    short: "Strip a wrecked encampment before it sinks.",
    summary: `An old Archeo-hunter camp is sinking into the lower levels. What’s left inside could keep a gang alive for another cycle.`,
    primaryObjective: [`The gang controlling the most Loot tokens wins.`],
    secondaryObjectives: [`Under Fire`, `Pack Mules`, `Leave Only Shells`],
    rewardNote: `Loot can be converted to Credits.`
  }
];

const underhells_complications = [
  {
    name: "Broodmind Pulse",
    short: "Psychic waves unsettle fighters.",
    summary: "The Broodmind’s attention lashes this sector, sending waves of panic through every exposed mind.",
    specialRules: [`Warp-Touched: Start of round, one fighter per gang tests Willpower or becomes Insane.`, `Hungry Gaze: Failed objective tests increase Horror spawn rates.`],
    secondaryExtras: [`Stare it Down`]
  },
  {
    name: "Toxic Flood",
    short: "Rising sludge makes low ground lethal.",
    summary: "Cracked sump lines belch toxic filth, forcing gangs to fight for high ground.",
    specialRules: [`Rising Tide: The floor level floods from Round 2.`, `Corrosive Mire: End activation in water? Test Toughness or take a hit.`],
    secondaryExtras: [`High and Dry`]
  },
  {
    name: "Ammo Gone Dry",
    short: "Supplies are exhausted; every shot matters.",
    summary: "Weeks of fighting have burned reserves. Weapons are failing.",
    specialRules: [`Low Stores: 3 fighters per gang count as having Scarce weapons.`, `Dangerous Reloads: Failed Ammo checks cause automatic wounds.`],
    secondaryExtras: [`Make It Count`]
  },
  {
    name: "Hive Quake",
    short: "Tremors threaten to throw fighters down.",
    summary: "The foundations groan. Shockwaves ripple through the floor.",
    specialRules: [`Tremors: Start of round (4+), test Initiative or be Pinned.`, `Shifting Ground: Difficult terrain counts as Dangerous.`],
    secondaryExtras: [`Riding the Wave`]
  },
  {
    name: "Stygian Blackout",
    short: "Light dies; knife-fight range only.",
    summary: "Lights blow out. Only muzzle flashes illuminate the dark.",
    specialRules: [`Choking Dark: Visibility limited to 12".`, `From the Shadows: Bonus XP for melee kills started from darkness.`],
    secondaryExtras: [`Strike from the Dark`]
  }
];

// ==========================================
// 3. DATASETS: GENERIC HIVE (New Rob-Friendly Data)
// ==========================================

const generic_environments = [
  {
    name: "Abandoned Hab Block",
    short: "Tight corridors and vertical choke points.",
    intro: "A standard residential block, long since stripped of value. The fighting here is close, brutal, and vertical.",
    deployment3p: "Standard Deployment: Gangs deploy within 6\" of different board edges.",
    crewNote: "Standard Crew Selection (Custom)."
  },
  {
    name: "Slag Canyon",
    short: "Open ground with hazardous industrial waste.",
    intro: "Molten runoff has cooled into razor-sharp ridges. Cover is scarce, and falling is lethal.",
    deployment3p: "Corner Deployment: Pick a corner, stay 12\" from the center.",
    crewNote: "Standard Crew Selection (Custom)."
  },
  {
    name: "Market Cross",
    short: "Dense scatter terrain and stalls.",
    intro: "A maze of stalls and crates. Line of sight is blocked everywhere.",
    deployment3p: "Stand-off: Deploy on opposite long edges.",
    crewNote: "Standard Crew Selection (Custom)."
  },
  {
    name: "Manufactorum Floor",
    short: "Heavy machinery and moving parts.",
    intro: "Massive conveyors and presses dominate the area. The noise is deafening.",
    deployment3p: "Split Deployment: Divide gang into two groups on opposite corners.",
    crewNote: "Standard Crew Selection (Custom)."
  }
];

const generic_objectives = [
  {
    category: "generic",
    title: "Gang Fight",
    label: "Elimination",
    short: "Drive the enemy off.",
    summary: "No fancy tricks. Just drive them off your turf.",
    primaryObjective: ["The last gang with models on the board wins."],
    secondaryObjectives: ["First Blood", "Leader Kill", "Last Man Standing"],
    rewardNote: "Standard Turf rewards."
  },
  {
    category: "loot",
    title: "Smash and Grab",
    label: "Loot Crates",
    short: "Grab the loot and run.",
    summary: "Several high-value caches have been identified in the area.",
    primaryObjective: ["The gang that loots (removes) the most crates wins."],
    secondaryObjectives: ["Open 3 Crates", "Deny the Enemy"],
    rewardNote: "D3x10 Credits per crate looted."
  },
  {
    category: "hold",
    title: "King of the Spire",
    label: "Hold Ground",
    short: "Control the highest point.",
    summary: "There is a prime vantage point in this sector. We need it.",
    primaryObjective: ["Score 1 VP per round for controlling the central terrain piece."],
    secondaryObjectives: ["Hold at End Game", "Clear the Summit"],
    rewardNote: "+1 Reputation."
  },
  {
    category: "generic",
    title: "The Hit",
    label: "Assassination",
    short: "Kill the enemy Leader.",
    summary: "Word is the enemy boss is vulnerable. Take them out.",
    primaryObjective: ["3 VP for taking an enemy Leader Out of Action. 1 VP for Champs."],
    secondaryObjectives: ["Personal Kill", "Humiliation (Coup de Grace)"],
    rewardNote: "Bonus XP for the killer."
  }
];

const generic_complications = [
  {
    name: "Pitch Black",
    short: "The lights have failed.",
    summary: "Fighting in total darkness.",
    specialRules: ["Visibility is limited to 3\". Fighters with photo-goggles ignore this rule."],
    secondaryExtras: ["Surprise Attack"]
  },
  {
    name: "Hive Quake",
    short: "The floor is shaking.",
    summary: "Massive machinery nearby is causing tremors.",
    specialRules: ["Every turn roll D6. On 5+, everyone tests Initiative or falls Prone."],
    secondaryExtras: ["Steady Footing"]
  },
  {
    name: "Bad Air",
    short: "Toxic fumes are rising.",
    summary: "The ventilation fans have died.",
    specialRules: ["Toughness tests required if you end a move on the ground level."],
    secondaryExtras: ["High Ground"]
  },
  {
    name: "Clear Conditions",
    short: "No unusual events.",
    summary: "For once, the Hive is quiet. Too quiet.",
    specialRules: ["None. Play a standard game."],
    secondaryExtras: ["Standard Execution"]
  }
];

// ==========================================
// 4. FERRYMAN QUOTES (Used only in Underhells mode)
// ==========================================
const ferrymanQuotes = {
  loot: [
    "You find something shiny down here, it’s either cursed or claimed. Usually both.",
    "I once tried selling a crystal I found in the Underhells. Turns out it was selling me."
  ],
  hold: [
    "If you think holding ground’s hard, try doing it while the ground’s holding back.",
    "Walls don’t care who bleeds on them, so long as someone does."
  ],
  escape: [
    "You want out? Then you better run like the dark owes you money.",
    "There’s no up in the Underhells. Just slower ways to go down."
  ],
  cull: [
    "I’ve seen things with more teeth than sense. Same goes for gangers.",
    "You kill one horror, and ten come sniffing for the noise. Fair trade."
  ],
  generic: [
    "If it smells like hope, it’s probably gas.",
    "Down here, the only thing stable is death."
  ]
};

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return arr
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.x);
}

function formatList(items) {
  if (!items || !items.length) return "";
  return "<ul>" + items.map(i => `<li>${i}</li>`).join("") + "</ul>";
}

function getFerrymanQuoteForObjective(obj) {
  const pool = ferrymanQuotes[obj.category] || ferrymanQuotes.generic;
  return pickRandom(pool);
}

// ==========================================
// 6. MAIN BUILDER
// ==========================================

function buildScenarioHTML(env, obj, comp) {
  // Determine Mode
  const mode = document.getElementById("campaignMode").value;
  const isUnderhells = (mode === "underhells");

  // --- NEW: Update the main Subtitle based on mode ---
  const subtitleEl = document.getElementById("appSubtitle");
  if (isUnderhells) {
    subtitleEl.textContent = "Finale scenarios for the last push into the Underhells of Hive Secundus. Short, lethal, and full of horrors.";
  } else {
    subtitleEl.textContent = "Standard sector engagements for gang warfare in the hive city. Capture territory, loot resources, and eliminate rivals.";
  }

  // Get player count
  const activeSkulls = document.querySelectorAll('.skull-btn.active');
  const lastActive = activeSkulls.length > 0 ? activeSkulls[activeSkulls.length - 1] : null;
  const playerCount = lastActive ? lastActive.dataset.count : "1";

  // Mix Secondaries
  const mergedSecondaries = [
    ...(obj.secondaryObjectives || []),
    ...(comp.secondaryExtras || [])
  ];
  const shuffledSecondaries = shuffle(mergedSecondaries);
  const selectedSecondaries = shuffledSecondaries.slice(0, Math.min(3, shuffledSecondaries.length));

  const intro = `${env.intro} ${obj.summary}`;

  let headerBlock = "";
  
  if (isUnderhells) {
    // UNDERHELLS MODE
    const vornLine = getFerrymanQuoteForObjective(obj);
    // Note: border-bottom is set to the pink accent (#e238a7)
    headerBlock = `
      <div class="scenario-header-block">
        <div class="scenario-header">
          <h2 class="scenario-title" style="border-bottom-color: #e238a7;">${obj.title}</h2>
          <div class="scenario-tag">UNDERHELLS • ${playerCount}-PLAYER</div>
        </div>
        <div class="ferryman-block">
          <div class="ferryman-portrait">
            <img src="assets/vorn-kadd.png" alt="Vorn Kadd" />
          </div>
          <div class="ferryman-quote-box">
            <div class="ferryman-quote">
              <span class="ferryman-icon">☠️</span>
              <span>${vornLine}</span>
            </div>
            <div class="ferryman-credit">— Vorn Kadd, Ferryman of the Underhells</div>
          </div>
        </div>
        <div class="intro">${intro}</div>
      </div>
    `;
  } else {
    // HIVE WAR MODE
    // Note: border-bottom is set to the green/cyan accent (#2bcf6a) to match the badge
    headerBlock = `
      <div class="scenario-header-block">
        <div class="scenario-header">
          <h2 class="scenario-title" style="border-bottom-color: #2bcf6a;">${obj.title}</h2>
          <div class="scenario-tag" style="background: linear-gradient(90deg, #2bcf6a 0%, #00f2ff 100%); color: #05060a;">
            HIVE WAR • ${playerCount}-PLAYER
          </div>
        </div>
        <div class="intro" style="margin-top: 1rem;">${intro}</div>
      </div>
    `;
  }

  // Cards Logic (Same as before)
  const envCard = `
    <div class="section-card">
      <div class="section-title">Battlefield & Environment</div>
      <div class="section-body">
        <strong>Environment:</strong> ${env.name}<br/>
        <p>${env.deployment3p}</p>
        <p><em>${env.crewNote}</em></p>
      </div>
    </div>
  `;

  const objCard = `
    <div class="section-card">
      <div class="section-title">Objectives: ${obj.label}</div>
      <div class="section-body">
        <p><strong>Primary Objective:</strong></p>
        ${formatList(obj.primaryObjective)}
        <p><strong>Secondary Objectives:</strong></p>
        ${formatList(selectedSecondaries)}
      </div>
    </div>
  `;

  const compCard = `
    <div class="section-card">
      <div class="section-title">Event: ${comp.name}</div>
      <div class="section-body">
        <p>${comp.summary}</p>
        ${formatList(comp.specialRules)}
      </div>
    </div>
  `;

  let extrasCards = "";
  if (isUnderhells) {
    extrasCards = `
      <div class="section-card">
        <div class="section-title">Roaming Horrors</div>
        <div class="section-body">${roamingHorrorsHTML}</div>
      </div>
      <div class="section-card">
        <div class="section-title">Data Crystals</div>
        <div class="section-body">${dataCrystalHTML}</div>
      </div>
    `;
  }

  const endingCard = `
    <div class="section-card">
      <div class="section-title">Ending & Rewards</div>
      <div class="section-body">
        <ul>
          <li><strong>Victory:</strong> ${isUnderhells ? "Standard Endgame Scoring." : "As per Primary Objective."}</li>
          <li><strong>Rewards:</strong> ${obj.rewardNote}</li>
        </ul>
      </div>
    </div>
  `;

  return headerBlock + envCard + objCard + compCard + extrasCards + endingCard;
}
// ==========================================
// 7. GENERATOR LOGIC
// ==========================================

function generateScenario() {
  const mode = document.getElementById("campaignMode").value;

  // --- NEW: Toggle Skull Colors ---
  const skullRow = document.querySelector('.skull-row');
  if (mode === 'generic') {
    skullRow.classList.add('green-mode'); // Switch to Green
  } else {
    skullRow.classList.remove('green-mode'); // Revert to Pink
  }

  let env, obj, comp;

  if (mode === "underhells") {
    env = pickRandom(underhells_environments);
    obj = pickRandom(underhells_objectives);
    comp = pickRandom(underhells_complications);
  } else {
    // Generic Mode
    env = pickRandom(generic_environments);
    obj = pickRandom(generic_objectives);
    comp = pickRandom(generic_complications);
  }

  // Update Top Keywords
  document.getElementById("envName").textContent = env.name;
  document.getElementById("envDesc").textContent = env.short;

  document.getElementById("objName").textContent = obj.label;
  document.getElementById("objDesc").textContent = obj.short;

  document.getElementById("compName").textContent = comp.name;
  document.getElementById("compDesc").textContent = comp.short;

  // Render HTML
  const scenarioOutput = document.getElementById("scenarioOutput");
  scenarioOutput.innerHTML = buildScenarioHTML(env, obj, comp);
}

// Init
document.getElementById("generateBtn").addEventListener("click", generateScenario);
// Re-generate when mode changes for instant feedback
document.getElementById("campaignMode").addEventListener("change", generateScenario);

// First Load
generateScenario();

  // Skull Click Logic (Additive)
  document.querySelectorAll('.skull-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // 1. Get the number of the clicked skull
      // (We use closest('button') to make sure we get the button even if they clicked the path)
      const targetCount = parseInt(e.currentTarget.dataset.count);

      // 2. Loop through ALL skulls
      document.querySelectorAll('.skull-btn').forEach(b => {
        const btnCount = parseInt(b.dataset.count);
        
        // 3. Add 'active' to anything less than or equal to the clicked number
        if (btnCount <= targetCount) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      // 4. Regenerate scenario with new player count
      generateScenario();
    });
  });
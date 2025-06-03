const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzKsO-qxCx0gtpf0U5__pOXxF46jLPVQXzO9xJWG_RIyFzMNNe06XZzP6Bqf9pwhOb5yg/exec';
const playerStats = {};

document.addEventListener('DOMContentLoaded', () => {
  loadPlayers();
});

function updateXPBlock(block) {
  const currentXP = parseInt(block.dataset.current);
  const neededXP = parseInt(block.dataset.needed);
  const level = parseInt(block.dataset.level);

  block.querySelector('.levelValue').textContent = level;
  block.querySelector('.xpCurrent').textContent = currentXP;
  block.querySelector('.xpNeeded').textContent = neededXP;

  const percent = (currentXP / neededXP) * 100;
  block.querySelector('.progress-bar').style.width = `${percent}%`;
}

function updateXPBlocks() {
  document.querySelectorAll('.xp-block').forEach(updateXPBlock);
}

function showSkeletonCards(count = 6) {
  const container = document.getElementById('players-container');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'player-card skeleton';
    skeleton.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="player-info">
        <h2 class="skeleton-text long"></h2>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text short"></div>
        <div class="status-bars">
          <div class="skeleton-bar small"></div>
          <div class="skeleton-bar small"></div>
          <div class="skeleton-bar small"></div>
        </div>
        <div class="level-bar">
          <div class="level-label skeleton-text medium"></div>
          <div class="progress-container">
            <div class="progress-bar skeleton-progress"></div>
          </div>
          <div class="xp-label skeleton-text short"></div>
        </div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

function createRaceMarkup(race) {
  const parts = race.split(' ');
  if (parts.length > 1) {
    const [first, second] = parts.map(r =>
      `<span class="race ${r.replace('Half-', '').toLowerCase()}"><strong>${r}</strong></span>`
    );
    return `<div class="raceDiv">${first}<span class="divider"><strong>/</strong></span>${second}</div>`;
  }
  return `<div class="raceDiv"><span class="race ${race.toLowerCase()}"><strong>${race}</strong></span></div>`;
}

function createAlignmentMarkup(alignment) {
  const [main, side] = alignment.split('-');
  return `
    <div class="alignmentDiv">
      <span class="mainAlignment ${main.toLowerCase()}"><strong>${main}</strong></span>
      <span class="divider"><strong>-</strong></span>
      <span class="sideAlignment ${side.toLowerCase()}"><strong>${side}</strong></span>
    </div>`;
}

function createSpellSlotsMarkup(player) {
  const spellSlots = Object.entries(player)
    .filter(([key, _]) => key.startsWith('spellslotLvl'))
    .map(([key, value]) => {
      const level = key.replace('spellslotLvl', '');
      return `<div class="status spell-slot"><span class="emoji">✨</span> Lvl ${level} Slots: <span>${value}</span></div>`;
    });

  const kiPoints = player.kiSlots
    ? `<div class="status ki-slot"><span class="emoji">🧘</span> Ki: <span>${player.kiSlots}</span></div>`
    : '';

  const ragePoints = player.ragePoints
    ? `<div class="status rage-slot"><span class="emoji">💪</span> Rage: <span>${player.ragePoints}</span></div>`
    : '';

  if (spellSlots.length === 0 && !kiPoints && !ragePoints) return '';

  return `
    <div class="status-bars spell-ki-bars">
      ${spellSlots.join('')}
      ${kiPoints}
      ${ragePoints}
    </div>`;
}

function createStatisticsMarkup(player) {
  if (!player.statistics) return '';
  const statItems = player.statistics.map(stat =>
    `<div class="status stat-item-${stat.name.toLowerCase()}"><strong>${stat.name}:</strong> ${stat.amount}</div>`
  ).join('');
  return `
    <div class="player-stats">
      <h2 class="combat-title">Combat Stats</h2>
      ${statItems}
    </div>`;
}

function createPlayerCard(player) {
  const card = document.createElement('div');
  card.className = 'player-card';

  if (!player.serving) {
    card.classList.add('grayscale');
  }

  const raceHTML = createRaceMarkup(player.race);
  const alignmentHTML = createAlignmentMarkup(player.alignment);
  const slots = createSpellSlotsMarkup(player);
  const statistics = createStatisticsMarkup(player);

  let gold = player.gp;
  if (gold === undefined || gold === null) {
    gold = 0;
  }

  card.innerHTML = `
    <a href="${player.pageSrc}">
      <img src="${player.imageSrc}" alt="${player.name} Portrait">
    </a>
    <div class="player-info">
      <h2>${player.name}</h2>
      <span class="${player.class.toLowerCase()}">${player.class}</span>
      ${raceHTML}
      ${alignmentHTML}
      <div class="status-bars">
        <div class="status hp"><span class="emoji">❤️</span> HP: <span>${player.hp}</span></div>
        <div class="status ac"><span class="emoji">🛡️</span> AC: <span>${player.ac}</span></div>
        <div class="status gp"><span class="emoji">💰</span> GP: <span>${gold}</span></div>
      </div>
      <div class="xp-block" data-current="${player.xp}" data-needed="${player.xpNeededForUpgrade}" data-level="${player.level}">
        <div class="level-label">Level <span class="levelValue"></span></div>
        <div class="progress-container"><div class="progress-bar"></div></div>
        <div class="xp-label"><span class="xpCurrent"></span> / <span class="xpNeeded"></span> XP</div>
      </div>
    </div>
    <div class="slot-block">
      <h2 class="slot-title">Spellslots/ Ki Slots</h2>
      ${slots}
    </div>
    ${statistics}`;
  return card;
}


async function loadPlayers() {
  try {
    const response = await fetch('/DnD-Wiki/player/player.json');
    const data = await response.json();
    const playerList = Object.values(data).flat();

    showSkeletonCards();
    await fetchAllPlayerStats(playerList); // 💰 Load all gold values first

    const container = document.getElementById('players-container');
    container.innerHTML = '';

    playerList.forEach(player => {
      const card = createPlayerCard(player);
      container.appendChild(card);
    });

    updateXPBlocks();
  } catch (err) {
    console.error('Failed to load characters:', err);
  }
}

async function fetchAllPlayerStats(playerList) {
  const queryNames = playerList.map(p => p.name.includes(' ') ? p.name.split(' ')[0] : p.name).join(',');
  const response = await fetch(`${googleScriptUrl}?names=${encodeURIComponent(queryNames)}`);
  const statMap = await response.json();

  playerList.forEach(player => {
    const key = player.name.includes(' ') ? player.name.split(' ')[0] : player.name;
    const stats = statMap[key];
    if (stats) {
      player.hp = stats.hp;
      player.ac = stats.ac;
      player.gp = stats.gp;
      player.level = stats.level;
      player.xp = stats.xp;
      player.xpNeededForUpgrade = stats.xpToLevel;
      player.statistics[0].amount = stats.hits;
      player.statistics[1].amount = stats.damage;
      player.statistics[2].amount = stats.faints;
      if(player.ragePoints) {
        player.ragePoints = stats.rageSlots;
      }
      if(player.spellslotLvl1) {
        player.spellslotLvl1 = stats.lvl1SpellSlot;
      }
      if(player.spellslotLvl2) {
        player.spellslotLvl2 = stats.lvl2SpellSlot;
      }
      if(player.spellslotLvl3) {
        player.spellslotLvl3 = stats.lvl3SpellSlot;
      }
      if(player.kiSlots) {
        player.kiSlots = stats.kiSlots;
      }
    }
  });
}

function toggleSidenav() {
  document.querySelector('.sidenav').classList.toggle('collapsed');
  document.querySelector('.main').classList.toggle('expanded');
}

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

  const raceHTML = createRaceMarkup(player.race);
  const alignmentHTML = createAlignmentMarkup(player.alignment);
  const slots = createSpellSlotsMarkup(player);
  const statistics = createStatisticsMarkup(player);

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
        <div class="status gp"><span class="emoji">💰</span> GP: <span>${player.gp}</span></div>
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
    const response = await fetch('player.json');
    const data = await response.json();

    const container = document.getElementById('players-container');
    container.innerHTML = '';

    Object.values(data).flat().forEach(player => {
      const card = createPlayerCard(player);
      container.appendChild(card);
    });

    updateXPBlocks();
  } catch (err) {
    console.error('Failed to load characters:', err);
  }
}

function toggleSidenav() {
  document.querySelector('.sidenav').classList.toggle('collapsed');
  document.querySelector('.main').classList.toggle('expanded');
}

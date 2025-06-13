let characterData;

async function loadCharacter() {
  try {
    const characterName = 'Shimazu Tadakatsu';
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxGcNVD9QIAtzQzDOL1ZPo-gk7jzvbkHOV6yPiFddDDOWaHKdPNhqeqTKXnGxDMIY2zRg/exec';

    const response = await fetch(`${scriptUrl}?name=${encodeURIComponent(characterName)}`);
    const data = await response.json();
    characterData = data;
    const shimazu = Object.values(data)[0][0];

    // Update name
    document.getElementById('characterName').textContent = shimazu.Name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = shimazu.HP;
    document.getElementById('acValue').textContent = shimazu.AC;
    document.getElementById('gpValue').textContent = shimazu.GP;

    // Left Gear Column
    const gearLeftColumn = document.getElementById('leftGear');
    gearLeftColumn.innerHTML = '';

    Object.values(shimazu.gear.leftGear).forEach(gear => {
      const gearSlot = document.createElement('div');
      gearSlot.classList.add('leftGear-slot');
      gearSlot.setAttribute('onClick', 'toggleTooltipLeftGear(this)')

      gearSlot.innerHTML = `
      <img class="leftGearImg" src="${gear.imageSrc}">
                <div class="leftGear-tooltip tooltip tooltip-left">
                  <strong>${gear.name}</strong><br>
                  ${gear.description}
                </div>
              `;

      gearLeftColumn.appendChild(gearSlot);
    });

    // Meele Row
    const gearMeeleRow = document.getElementById('meele');
    gearMeeleRow.innerHTML = '';

    Object.values(shimazu.gear.meele).forEach(meele => {
      const meeleSlot = document.createElement('div');
      meeleSlot.classList.add('meele-slot');
      meeleSlot.setAttribute('onClick', 'toggleTooltipMeele(this)');

      meeleSlot.innerHTML = `
      <img class="meeleImg" src="${meele.imageSrc}">
        <div class="meele-tooltip tooltip">
          <strong>${meele.name}</strong><br>
          ${meele.description}
        </div>
      `;

      gearMeeleRow.appendChild(meeleSlot);
    })

    // Range Row
    const gearRangeRow = document.getElementById('range');
    gearRangeRow.innerHTML = '';

    Object.values(shimazu.gear.range).forEach(range => {
      const rangeSlot = document.createElement('div');
      rangeSlot.classList.add('range-slot');
      rangeSlot.setAttribute('onClick', 'toggleTooltipRange(this)');

      rangeSlot.innerHTML = `
      <img class="rangeImg" src="${range.imageSrc}">
        <div class="range-tooltip tooltip">
          <strong>${range.name}</strong><br>
          ${range.description}
        </div>
      `;

      gearRangeRow.appendChild(rangeSlot);
    })

    // Right Gear Column
    const gearRightColumn = document.getElementById('rightGear');
    gearRightColumn.innerHTML = '';

    Object.values(shimazu.gear.rightGear).forEach(gear => {
      const gearSlot = document.createElement('div');
      gearSlot.classList.add('rightGear-slot');
      gearSlot.setAttribute('onClick', 'toggleTooltipRightGear(this)')

      gearSlot.innerHTML = `
            <div class="rightGear-tooltip tooltip tooltip-right">
             <strong>${gear.name}</strong><br>
             ${gear.description}
            </div>
          `;

      gearRightColumn.appendChild(gearSlot);
    });

    // ==== Inventory Items ====
    const inventoryDiv = document.querySelector('.inventory');
    inventoryDiv.innerHTML = '<h2>Inventory</h2>';

    Object.values(shimazu.items).forEach(item => {
      const inventoryItem = document.createElement('div');
      inventoryItem.classList.add('inventory-item');
      inventoryItem.innerHTML = `
          ${item.name} (x${item.amount})
          <div class="item-tooltip">
            ${item.name}
            <img src="${item.imageSrc}" alt="${item.imageAlt}" style="max-width: 200px;"><br>
            ${item.description}
          </div>
        `;
      inventoryDiv.appendChild(inventoryItem);
    });

    const skeleton = document.getElementById('equipmentSkeleton');
    if (skeleton) skeleton.remove();

    const skeletonSection = document.getElementById('skeletonSection');
    if (skeletonSection) skeletonSection.remove();

    const equipment = document.getElementById('equipmentSection');
    if (equipment) equipment.style.display = 'block';

    const section = document.getElementById('sectionToggle');
    if (section) section.style.display = 'block';

  } catch (err) {
    console.error('Failed to load character data:', err);
  }
}

function updateXPBars() {
  document.querySelectorAll('.xp-block').forEach(block => {
    const currentXP = parseInt(block.getAttribute('data-current'));
    const neededXP = parseInt(block.getAttribute('data-needed'));
    const level = parseInt(block.getAttribute('data-level'));

    block.querySelector('.levelValue').textContent = level;
    block.querySelector('.xpCurrent').textContent = currentXP;
    block.querySelector('.xpNeeded').textContent = neededXP;

    const progressPercent = (currentXP / neededXP) * 100;
    block.querySelector('.progress-bar').style.width = progressPercent + '%';
  });
}

loadCharacter();

function toggleSidenav() {
  document.querySelector(".sidenav").classList.toggle("collapsed");
  document.querySelector(".main").classList.toggle("expanded");
}

function switchTo(section) {
  const equip = document.getElementById('equipmentSection');
  const spells = document.getElementById('spellSection');
  const abilities = document.getElementById('abilitiesSection');
  const classAbilities = document.getElementById('classAbilitiesSection');
  const raceAbilities = document.getElementById('raceAbilitiesSection');
  const feats = document.getElementById('featsSection');
  const mythicalPower = document.getElementById('mythicalPowerSection');

if (section === 'equipment') {
    equip.style.display = 'block';
    spells.style.display = 'none';
    abilities.style.display = 'none';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'none';
    feats.style.display = 'none';
    mythicalPower.style.display = 'none';
  }

  if (section === 'spells') {
    equip.style.display = 'none';
    spells.style.display = 'block';
    abilities.style.display = 'none';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'none';
    feats.style.display = 'none';
    mythicalPower.style.display = 'none';
    renderSpells();
  }

  if (section === 'abilities') {
    equip.style.display = 'none';
    spells.style.display = 'none';
    abilities.style.display = 'block';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'none';
    feats.style.display = 'none';
    mythicalPower.style.display = 'none';
    renderAbilities();
  }

  if (section === 'classAbilities') {
    equip.style.display = 'none';
    spells.style.display = 'none';
    abilities.style.display = 'none';
    classAbilities.style.display = 'block';
    raceAbilities.style.display = 'none';
    feats.style.display = 'none';
    mythicalPower.style.display = 'none';
    renderClassAbilities();
  }

  if (section === 'raceAbilities') {
    equip.style.display = 'none';
    spells.style.display = 'none';
    abilities.style.display = 'none';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'block';
    feats.style.display = 'none';
    mythicalPower.style.display = 'none';
    renderRaceAbilities();
  }

  if (section === 'feats') {
    equip.style.display = 'none';
    spells.style.display = 'none';
    abilities.style.display = 'none';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'none';
    feats.style.display = 'block';
    mythicalPower.style.display = 'none';
    renderFeats();
  }

  if (section === 'mythicalPower') {
    equip.style.display = 'none';
    spells.style.display = 'none';
    abilities.style.display = 'none';
    classAbilities.style.display = 'none';
    raceAbilities.style.display = 'none';
    feats.style.display = 'none';
    mythicalPower.style.display = 'block';
    renderPower();
  }
}

function getAbilityModifierString(score) {
  const mod = Math.floor((score - 10) / 2);
  return (mod >= 0 ? '+' : '') + mod;
}

function renderAbilities() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('abilitiesSection');
  const { abilityScores, skills } = shimazu;

  let html = '<div class="abilities-wrapper">';

  // Define order and full names for abilities
  const abilityOrder = [
    { key: "STR", name: "Strength" },
    { key: "DEX", name: "Dexterity" },
    { key: "CON", name: "Constitution" },
    { key: "INT", name: "Intelligence" },
    { key: "WIS", name: "Wisdom" },
    { key: "CHA", name: "Charisma" }
  ];

  // Render ability scores
  html += `<h2 class="title">Ability Scores</h2><div class="abilityScore-grid">`;

  abilityOrder.forEach(({ key, name }) => {
    const score = abilityScores[key];
    html += `
      <div class="abilityScore-div ${name.toLowerCase()}">
        <h4>${name}</h4>
        <span class="abilityScore-span">${score} (${getAbilityModifierString(score)})</span>
      </div>
    `;
  });

  html += `</div>`;

  // Render skills
  html += `<h2 class="title">Skills</h2><div class="abilityScore-grid">`;

  skills.forEach(skill => {
    const bonus = skill.amount >= 0 ? `+${skill.amount}` : skill.amount;
    html += `
      <div class="skill-div ${skill.name.toLowerCase().replace(/\s/g, '-')}">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-bonus">${bonus}</span>
      </div>
    `;
  });

  html += `</div>`;
  html += `</div>`;

  section.innerHTML = html;
}

function renderSpells() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('spellSection');
  const spells = shimazu.spells;

  let slotBlock = renderSpellSlots(shimazu);
  let knownSpellBlock = renderKnownSpells(spells);
  let preparedSpellBlock = renderPreparedSpellsGrouped(spells)

  section.innerHTML = slotBlock + knownSpellBlock + preparedSpellBlock;
}

function renderSpellSlots(slots) {
  let html = `<div class="spell-slots-container">`;
  html += `<div class="spell-slots-header">Spell Slots</div><div class="spell-slots-grid">`;

  for (let level = 1; level <= 9; level++) {
    const count = slots[`spellslotLvl${level}`];
    if (!count || count == 0) continue;

    html += `
      <div class="spell-slot-block">
        <span class="slot-label">Level ${level}</span>
        <span class="slot-count">${count} Slot${count > 1 ? 's' : ''}</span>
      </div>
    `;
  }

  html += `</div></div>`;
  return html;
}

function renderKnownSpells(spells) {
  let html = `
    <div class="spell-section-wrapper">
      <div class="spell-section-title">Known Spells</div>
      <div class="spell-row">
  `;

  Object.values(spells).forEach(spell => {
    html += `
      <div class="spell-slot" onclick="toggleTooltip(this)">
        <img src="${spell.imageSrc}" style="max-width: 75px;">
        <div class="spell-tooltip">
          <strong>${spell.name}</strong><br>
           <span class="spellLevel">${spell.spellLevel}</span><br>
          ${spell.description}
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  return html;
}

function renderPreparedSpellsGrouped(spells) {
  const grouped = {};

  Object.values(spells).forEach(spell => {
    if (spell.preparedOrKnown !== "Prepared") return;

    const level = spell.spellLevel || "Unknown";
    if (!grouped[level]) grouped[level] = [];
    grouped[level].push(spell);
  });

  const levelOrder = ["Cantrip", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9", "Unknown"];

  let html = `<div class="spell-section-wrapper"><div class="spell-section-title">Prepared Spells</div>`;

  levelOrder.forEach(level => {
    if (!grouped[level]) return;

    html += `<details class="spell-level-group"><summary class="spell-level-title">${level}</summary><div class="spell-row">`;

    grouped[level].forEach(spell => {
      const imgSrc = spell.imageSrc || "/DnD-Wiki/images/spells/default-spell.png";
      const imgAlt = spell.imageAlt || "Spell image";
      const description = spell.description || "<em>No description available.</em>";

      html += `
        <div class="spell-slot" onclick="toggleTooltip(this)">
          <img src="${imgSrc}" alt="${imgAlt}" style="max-width: 75px;">
          <div class="spell-tooltip">
            <strong>${spell.name}</strong><br>
            ${description}
          </div>
        </div>
      `;
    });

    html += `</div></details>`;
  });

  html += `</div>`;
  return html;
}

function renderClassAbilities() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('classAbilitiesSection');
  const classAbilities = shimazu.classAbilities;

  let html = '<div class="ability-section"><h3 class="title">Class Abilities</h3><div class="classAbilities-grid">';

  classAbilities.forEach(classAbility => {
    html += `
      <div class="classAbility-card">
      <h4>${classAbility.AbilitieName}</h4>
      <div>${classAbility.Description}</div>
      </div>
    `
  });

  html += '</div></div>'
  section.innerHTML = html;
}

function renderRaceAbilities() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('raceAbilitiesSection');
  const raceAbilities = shimazu.raceAbilities;

  let html = '<div class="ability-section"><h3 class="title">Race Abilities</h3><div class="classAbilities-grid">';

  raceAbilities.forEach(raceAbility => {
    html += `
      <div class="classAbility-card">
      <h4>${raceAbility.AbilityName}</h4>
      <div>${raceAbility.Description}</div>
      </div>
    `
  });

  html += '</div></div>'
  section.innerHTML = html;
}

function renderFeats() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('featsSection');
  const feats = shimazu.feats;

  let html = '<div class="ability-section"><h3 class="title">Feats</h3><div class="card-grid">'

  feats.forEach(feat => {
    html += `
    <div class="card">
    <h4>${feat.FeatName}</h4>
    <div>${feat.Description}</div>
    </div>
    `;
  });

  html += `</div></div>`;
  section.innerHTML = html;
}

function renderPower() {
  const shimazu = characterData.shimazuTadakatsu[0];
  const section = document.getElementById('mythicalPowerSection');
  const powers = shimazu.power;

  let html = '<div class="ability-section"><h3 class="title">Power</h3><div class="card-grid">'

  powers.forEach(power => {
    html += `
    <div class="card">
    <h4>${power.PowerName}</h4>
    <div class="cooldown">${power.Cooldown}</div>
    <div>${power.Description}</div>
    </div>
    `;
  });

  html += `</div></div>`;
  section.innerHTML = html;
}
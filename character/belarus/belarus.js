let characterData;

async function loadCharacter() {
  try {
    const characterName = 'Belarus Radowani';
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxGcNVD9QIAtzQzDOL1ZPo-gk7jzvbkHOV6yPiFddDDOWaHKdPNhqeqTKXnGxDMIY2zRg/exec';

    const response = await fetch(`${scriptUrl}?name=${encodeURIComponent(characterName)}`);
    const data = await response.json();
    characterData = data;
    const belarus = Object.values(data)[0][0];

    // Update name
    document.getElementById('characterName').textContent = belarus.Name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = belarus.HP;
    document.getElementById('acValue').textContent = belarus.AC;
    document.getElementById('gpValue').textContent = belarus.GP;

    // Update Abilities
    const abilitiesHTML = `
    <strong>Abilities:</strong><br>
    STR: ${belarus.abilityScores.STR} |
    DEX: ${belarus.abilityScores.DEX} |
    CON: ${belarus.abilityScores.CON}<br>
    INT: ${belarus.abilityScores.INT} |
    WIS: ${belarus.abilityScores.WIS} |
    CHA: ${belarus.abilityScores.CHA}
    `;
    document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;

    // Update Skills
    let number = 0;
    let skillsHTML = `<strong>Skills:</strong><br>`;
    Object.values(belarus.skills).forEach(skill => {
      number = number + 1;
      skillsHTML = skillsHTML + (`${skill.name} ${skill.amount} `)
      if (number % 2 === 0) {
        skillsHTML = skillsHTML + (`<br>`)
      }
    })
    document.getElementById('skillsBlock').innerHTML = skillsHTML;

    const spellHTML = `
        <strong>Spell Slots:</strong><br>
        1ST: ${belarus.spellslotLvl1}/${belarus.spellslotLvl1} | 2ST: ${belarus.spellslotLvl2}/${belarus.spellslotLvl2}
      `;
    document.getElementById('spellslotsBlock').innerHTML = spellHTML;

    // Left Gear Column
    const gearLeftColumn = document.getElementById('leftGear');
    gearLeftColumn.innerHTML = '';

    Object.values(belarus.gear.leftGear).forEach(gear => {
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

    Object.values(belarus.gear.meele).forEach(meele => {
      const meeleSlot = document.createElement('div');
      meeleSlot.classList.add('meele-slot');
      meeleSlot.setAttribute('onClick', 'toggleTooltipMeele(this)');

      meeleSlot.innerHTML = `
      <img class="meeleImg" src="${meele.imageSrc}" alt="${meele.imageAlt}">
        <div class="meele-tooltip tooltip tooltip-bottom">
          <strong>${meele.name}</strong><br>
          ${meele.description}
        </div>
      `;

      gearMeeleRow.appendChild(meeleSlot);
    })

    // Range Row
    const gearRangeRow = document.getElementById('range');
    gearRangeRow.innerHTML = '';

    Object.values(belarus.gear.range).forEach(range => {
      const rangeSlot = document.createElement('div');
      rangeSlot.classList.add('range-slot');
      rangeSlot.setAttribute('onClick', 'toggleTooltipRange(this)');

      rangeSlot.innerHTML = `
      <img class="rangeImg" src="${range.imageSrc}">
        <div class="range-tooltip tooltip tooltip-bottom">
          <strong>${range.name}</strong><br>
          ${range.description}
        </div>
      `;

      gearRangeRow.appendChild(rangeSlot);
    })

    // Right Gear Column
    const gearRightColumn = document.getElementById('rightGear');
    gearRightColumn.innerHTML = '';

    Object.values(belarus.gear.rightGear).forEach(gear => {
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

    belarus.items.forEach(item => {
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
  const abilities = document.getElementById('abilitiesSection');

  if (section === 'equipment') {
    equip.style.display = 'block';
    abilities.style.display = 'none';
  } else {
    equip.style.display = 'none';
    abilities.style.display = 'block';
    renderAbilities(); // only builds once
  }
}

function renderAbilities() {
  console.log('Rendering abilities...');
  console.log(characterData);

  const belarus = characterData.belarusRadowani[0];
  const section = document.getElementById('abilitiesSection');
  if (section.innerHTML.trim()) return;

  let html = '';

  const renderCategory = (title, items, isPower = false) => {
    if (!items || items.length === 0) return '';
    let block = `<h3 class="ability-section-title">${title}</h3><div class="ability-grid">`;
    items.forEach(entry => {
      block += `
        <div class="ability-card">
          <h4>${entry.name}</h4>
          ${isPower ? `<div class="cooldown">${entry.cooldown}</div>` : ''}
          <div>${entry.description}</div>
        </div>
      `;
    });
    block += '</div>';
    return block;
  };

  html += renderCategory('Feats', belarus.feats.map(f => ({
    name: f["Feat Name"],
    description: f.Description
  })));

  html += renderCategory('Powers', belarus.power.map(p => ({
    name: p["Power Name"],
    description: p.Description,
    cooldown: p.Cooldown
  })), true);
  html += renderCategory('Class Abilities', belarus.classAbilities);
  html += renderCategory('Race Abilities', belarus.raceAbilities);

  const spells = belarus.spells;
  if (spells && Object.keys(spells).length > 0) {
    html += renderSpells(belarus.spells);
  }

  section.innerHTML = html;
}

function renderSpells(spells) {
  let html = `<h3 class="ability-section-title">Spells</h3><div class="spell-row">`;
  Object.values(spells).forEach(spell => {
    html += `
      <div class="spell-slot" onclick="toggleTooltip(this)">
        <img src="${spell.imageSrc}" alt="${spell.imageAlt}" style="max-width: 75px;">
        <div class="spell-tooltip">
          <strong>${spell.name}</strong><br>
          ${spell.description}
        </div>
      </div>
    `;
  });
  html += `</div>`;
  return html; // store in the pagination system
}
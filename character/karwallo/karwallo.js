let characterData;

async function loadCharacter() {
  try {
    const response = await fetch('/DnD-Wiki/character/karwallo/karwallo.json');
    const data = await response.json();
    characterData = data;
    const karwallo = data.karwallo[0];

    document.getElementById('characterName').textContent = karwallo.name;

    document.getElementById('hpValue').textContent = karwallo.hp;
    document.getElementById('acValue').textContent = karwallo.ac;
    document.getElementById('gpValue').textContent = karwallo.gp;

    // Update Abilities
    const abilitiesHTML = `
        <strong>Abilities:</strong><br>
        STR: ${karwallo.abilityScores.strength} | 
        DEX: ${karwallo.abilityScores.dexterity} | 
        CON: ${karwallo.abilityScores.constitution}<br>
        INT: ${karwallo.abilityScores.intelligence} | 
        WIS: ${karwallo.abilityScores.wisdom} | 
        CHA: ${karwallo.abilityScores.charisma}
      `;
    document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;

    // Update Skills
    let number = 0;
    let skillsHTML = `<strong>Skills:</strong><br>`;
    Object.values(karwallo.skills).forEach(skill => {
      number = number + 1;
      skillsHTML = skillsHTML + (`${skill.name} ${skill.amount} `)
      if (number % 2 === 0) {
        skillsHTML = skillsHTML + (`<br>`)
      }
    })
    document.getElementById('skillsBlock').innerHTML = skillsHTML;

    const spellHTML = `
        <strong>Spell Slots:</strong><br>
        1ST: ${karwallo.spellslotLvl1}/${karwallo.spellslotLvl1} | 2ST: ${karwallo.spellslotLvl2}/${karwallo.spellslotLvl2}
      `;
    document.getElementById('spellslotsBlock').innerHTML = spellHTML;

    // Left Gear Column
    const gearLeftColumn = document.getElementById('leftGear');
    gearLeftColumn.innerHTML = '';

    Object.values(karwallo.gear.leftGear).forEach(gear => {
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

    Object.values(karwallo.gear.meele).forEach(meele => {
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

    Object.values(karwallo.gear.range).forEach(range => {
      const rangeSlot = document.createElement('div');
      rangeSlot.classList.add('range-slot');
      rangeSlot.setAttribute('onClick', 'toggleTooltipMeele(this)');

      rangeSlot.innerHTML = `
      <img class="rangeImg" src="${range.imageSrc}" alt="${range.imageAlt}">
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

    Object.values(karwallo.gear.rightGear).forEach(gear => {
      const gearSlot = document.createElement('div');
      gearSlot.classList.add('rightGear-slot');
      gearSlot.setAttribute('onClick', 'toggleTooltipRightGear(this)')

      gearSlot.innerHTML = `
      <img class="rightGearImg" src="${gear.imageSrc}">
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

    Object.values(karwallo.items).forEach(item => {
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
  const karwallo = characterData.karwallo[0];
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

  html += renderCategory('Feats', karwallo.feats);
  html += renderCategory('Powers', karwallo.power, true);
  html += renderCategory('Class Abilities', karwallo.classAbilities);
  html += renderCategory('Race Abilities', karwallo.raceAbilities);
  html += renderCategory('The Infernal Ember', karwallo.infernalEmber);

  const spells = karwallo.spells;
  if (spells && Object.keys(spells).length > 0) {
    html += renderSpells(karwallo.spells);
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
let characterData;

async function loadCharacter() {
  try {
    const response = await fetch('/DnD-Wiki/character/vergil/vergil.json');
    const data = await response.json();
    characterData = data;
    const vergil = data.vergil[0];

    // Update name
    document.getElementById('characterName').textContent = vergil.name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = vergil.hp;
    document.getElementById('acValue').textContent = vergil.ac;
    document.getElementById('gpValue').textContent = vergil.gp;

    // Update Abilities
    const abilitiesHTML = `
        <strong>Abilities:</strong><br>
        STR: ${vergil.abilityScores.strength} | 
        DEX: ${vergil.abilityScores.dexterity} | 
        CON: ${vergil.abilityScores.constitution}<br>
        INT: ${vergil.abilityScores.intelligence} | 
        WIS: ${vergil.abilityScores.wisdom} | 
        CHA: ${vergil.abilityScores.charisma}
      `;
    document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;

    // Update Skills
    let number = 0;
    let skillsHTML = `<strong>Skills:</strong><br>`;
    Object.values(vergil.skills).forEach(skill => {
      number = number + 1;
      skillsHTML = skillsHTML + (`${skill.name} ${skill.amount} `)
      if (number % 2 === 0) {
        skillsHTML = skillsHTML + (`<br>`)
      }
    })
    document.getElementById('skillsBlock').innerHTML = skillsHTML;


    // Left Gear Column
    const gearLeftColumn = document.getElementById('leftGear');
    gearLeftColumn.innerHTML = '';

    Object.values(vergil.gear.leftGear).forEach(gear => {
      const gearSlot = document.createElement('div');
      gearSlot.classList.add('leftGear-slot');
      gearSlot.setAttribute('onClick', 'toggleTooltipLeftGear(this)')

      gearSlot.innerHTML = `
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

    Object.values(vergil.gear.meele).forEach(meele => {
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

    Object.values(vergil.gear.range).forEach(range => {
      const rangeSlot = document.createElement('div');
      rangeSlot.classList.add('range-slot');
      rangeSlot.setAttribute('onClick', 'toggleTooltipRange(this)');

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

    Object.values(vergil.gear.rightGear).forEach(gear => {
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

    Object.values(vergil.items).forEach(item => {
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
  const blessing = document.getElementById('blessingSection');

  if (section === 'equipment') {
    equip.style.display = 'block';
    abilities.style.display = 'none';
    blessing.style.display = 'none';
  }

  if (section === 'abilities') {
    equip.style.display = 'none';
    abilities.style.display = 'block';
    blessing.style.display = 'none';
    renderAbilities();
  }

  if (section === 'blessing') {
    equip.style.display = 'none';
    abilities.style.display = 'none';
    blessing.style.display = 'block';
    renderBlessing();
  }

}

function renderAbilities() {
  const vergil = characterData.vergil[0];
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

  html += renderCategory('Feats', vergil.feats);
  html += renderCategory('Powers', vergil.power, true);
  html += renderCategory('Class Abilities', vergil.classAbilities);
  html += renderCategory('Race Abilities', vergil.raceAbilities);

  const spells = vergil.spells;
  if (spells && Object.keys(spells).length > 0) {
    html += renderSpells(vergil.spells);
  }

  section.innerHTML = html;
}

function renderBlessing() {
  const vergil = characterData.vergil[0];
  const section = document.getElementById('blessingSection');
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

  html += renderCategory('Vampiric Blessings', vergil.blessing);
  html += renderCategory('Vampiric Curses', vergil.curse);

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
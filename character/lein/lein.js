async function loadCharacter() {
  try {
    const response = await fetch('lein.json');
    const data = await response.json();
    const lein = data.lein[0];

    // Update name
    document.getElementById('characterName').textContent = lein.name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = lein.hp;
    document.getElementById('acValue').textContent = lein.ac;
    document.getElementById('gpValue').textContent = lein.gp;

    // Update Abilities
    const abilitiesHTML = `
        <strong>Abilities:</strong><br>
        STR: ${lein.abilityScores.strength} | 
        DEX: ${lein.abilityScores.dexterity} | 
        CON: ${lein.abilityScores.constitution}<br>
        INT: ${lein.abilityScores.intelligence} | 
        WIS: ${lein.abilityScores.wisdom} | 
        CHA: ${lein.abilityScores.charisma}
      `;
    document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;

    // Update Skills
    const skillsHTML = `
        <strong>Skills:</strong><br>
        Athletics ${lein.skills.athletics}, Insight ${lein.skills.insight},<br>
        Medicine ${lein.skills.medicine}, Persuasion ${lein.skills.persuasion}
      `;
    document.getElementById('skillsBlock').innerHTML = skillsHTML;

    const spellHTML = `
        <strong>Spell Slots:</strong><br>
        1ST: ${lein.spellslotLvl1}/${lein.spellslotLvl1} | 2ST: ${lein.spellslotLvl2}/${lein.spellslotLvl2}
      `;
    document.getElementById('spellslotsBlock').innerHTML = spellHTML;

    const spellRow = document.getElementById('spellRow');
    spellRow.innerHTML = ''; // clear previous spells

    Object.values(lein.spells).forEach(spell => {
      const spellSlot = document.createElement('div');
      spellSlot.classList.add('spell-slot');
      spellSlot.setAttribute('onclick', 'toggleTooltip(this)');

      spellSlot.innerHTML = `
        <img src="${spell.imageSrc}" alt="${spell.imageAlt}" style="max-width: 75px;">
        <div class="spell-tooltip">
          <strong>${spell.name}</strong><br>
          ${spell.description}
        </div>
      `;

      spellRow.appendChild(spellSlot);
    });

    // Range Row
    const gearRangeRow = document.getElementById('range');
    gearRangeRow.innerHTML = '';

    Object.values(lein.gear.range).forEach(range => {
      const rangeSlot = document.createElement('div');
      rangeSlot.classList.add('range-slot');
      rangeSlot.setAttribute('onClick', 'toggleTooltipMeele(this)');

      rangeSlot.innerHTML = `
      <img class="rangeImg" src="${range.imageSrc}" alt="${range.imageAlt}">
        <div class="range-tooltip">
          <strong>${range.name}</strong><br>
          ${range.description}
        </div>
      `;

      gearRangeRow.appendChild(rangeSlot);
    })

    // ==== Inventory Items ====
    const inventoryDiv = document.querySelector('.inventory');
    inventoryDiv.innerHTML = '<h2>Inventory</h2>';

    Object.values(lein.items).forEach(item => {
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
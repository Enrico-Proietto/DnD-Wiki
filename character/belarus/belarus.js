async function loadCharacter() {
  try {
    const response = await fetch('belarus.json');
    const data = await response.json();
    const belarus = data.belarus[0];

    // Update name
    document.getElementById('characterName').textContent = belarus.name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = belarus.hp;
    document.getElementById('acValue').textContent = belarus.ac;
    document.getElementById('gpValue').textContent = belarus.gp;

    // Update Abilities
    const abilitiesHTML = `
        <strong>Abilities:</strong><br>
        STR: ${belarus.abilityScores.strength} | 
        DEX: ${belarus.abilityScores.dexterity} | 
        CON: ${belarus.abilityScores.constitution}<br>
        INT: ${belarus.abilityScores.intelligence} | 
        WIS: ${belarus.abilityScores.wisdom} | 
        CHA: ${belarus.abilityScores.charisma}
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

    // Spell Row
    const spellRow = document.getElementById('spellRow');
    spellRow.innerHTML = ''; // clear previous spells

    Object.values(belarus.spells).forEach(spell => {
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

    // ==== Inventory Items ====
    const inventoryDiv = document.querySelector('.inventory');
    inventoryDiv.innerHTML = '<h2>Inventory</h2>';

    Object.values(belarus.items).forEach(item => {
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
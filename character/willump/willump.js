async function loadCharacter() {
  try {
    const response = await fetch('willump.json');
    const data = await response.json();
    const willump = data.willump[0];

    // Update name
    document.getElementById('characterName').textContent = willump.name;

    // Update HP, AC
    document.getElementById('hpValue').textContent = willump.hp;
    document.getElementById('acValue').textContent = willump.ac;
    document.getElementById('gpValue').textContent = willump.gp;

    // Update Abilities
    const abilitiesHTML = `
          <strong>Abilities:</strong><br>
          STR: ${willump.abilityScores.strength} | 
          DEX: ${willump.abilityScores.dexterity} | 
          CON: ${willump.abilityScores.constitution}<br>
          INT: ${willump.abilityScores.intelligence} | 
          WIS: ${willump.abilityScores.wisdom} | 
          CHA: ${willump.abilityScores.charisma}
        `;
    document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;

    // Update Skills
    let number = 0;
    let skillsHTML = `<strong>Skills:</strong><br>`;
    Object.values(willump.skills).forEach(skill => {
      number = number + 1;
      skillsHTML = skillsHTML + (`${skill.name} ${skill.amount} `)
      if (number % 2 === 0) {
        skillsHTML = skillsHTML + (`<br>`)
      }
    })
    document.getElementById('skillsBlock').innerHTML = skillsHTML;

    const spellHTML = `
          <strong>Spell Slots:</strong><br>
          1ST: ${willump.spellslotLvl1}/${willump.spellslotLvl1} | 2ST: ${willump.spellslotLvl2}/${willump.spellslotLvl2}
        `;
    document.getElementById('spellslotsBlock').innerHTML = spellHTML;


    // Left Gear Column
    const gearLeftColumn = document.getElementById('leftGear');
    gearLeftColumn.innerHTML = '';

    Object.values(willump.gear.leftGear).forEach(gear => {
      const gearSlot = document.createElement('div');
      gearSlot.classList.add('leftGear-slot');
      gearSlot.setAttribute('onClick', 'toggleTooltipLeftGear(this)')

      gearSlot.innerHTML = `
      <img class="leftGearImg" src="${gear.imageSrc}">
            <div class="leftGear-tooltip tooltip tooltip-left"">
              <strong>${gear.name}</strong><br>
              ${gear.description}
            </div>
          `;

      gearLeftColumn.appendChild(gearSlot);
    });

    // Meele Row
    const gearMeeleRow = document.getElementById('meele');
    gearMeeleRow.innerHTML = '';

    Object.values(willump.gear.meele).forEach(meele => {
      const meeleSlot = document.createElement('div');
      meeleSlot.classList.add('meele-slot');
      meeleSlot.setAttribute('onClick', 'toggleTooltipMeele(this)');

      meeleSlot.innerHTML = `
          <div class="meele-tooltip tooltip tooltip-bottom">
            <strong>${meele.name}</strong><br>
            ${meele.description}
          </div>
        `;

      gearMeeleRow.appendChild(meeleSlot);
    })

    // Right Gear Column
    const gearRightColumn = document.getElementById('rightGear');
    gearRightColumn.innerHTML = '';

    Object.values(willump.gear.rightGear).forEach(gear => {
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

    Object.values(willump.spells).forEach(spell => {
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

    Object.values(willump.items).forEach(item => {
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
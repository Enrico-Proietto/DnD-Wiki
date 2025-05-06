async function loadCharacter() {
    try {
      const response = await fetch('shimazu.json');
      const data = await response.json();
      const shimazu = data.shimazu[0];
  
      // Update name
      document.getElementById('characterName').textContent = shimazu.name;
  
      // Update HP, AC
      document.getElementById('hpValue').textContent = shimazu.hp;
      document.getElementById('acValue').textContent = shimazu.ac;
      document.getElementById('gpValue').textContent = shimazu.gp;
  
      // Update Abilities
      const abilitiesHTML = `
          <strong>Abilities:</strong><br>
          STR: ${shimazu.abilityScores.strength} | 
          DEX: ${shimazu.abilityScores.dexterity} | 
          CON: ${shimazu.abilityScores.constitution}<br>
          INT: ${shimazu.abilityScores.intelligence} | 
          WIS: ${shimazu.abilityScores.wisdom} | 
          CHA: ${shimazu.abilityScores.charisma}
        `;
      document.getElementById('abilitiesBlock').innerHTML = abilitiesHTML;
  
      // Update Skills
      let number = 0;
      let skillsHTML = `<strong>Skills:</strong><br>`;
      Object.values(shimazu.skills).forEach(skill => {
        number = number + 1;
        skillsHTML = skillsHTML + (`${skill.name} ${skill.amount} `)
        if (number % 2 === 0) {
          skillsHTML = skillsHTML + (`<br>`)
        }
      })
      document.getElementById('skillsBlock').innerHTML = skillsHTML;
  
      const spellHTML = `
          <strong>Spell Slots:</strong><br>
          1ST: ${shimazu.spellslotLvl1}/${shimazu.spellslotLvl1} | 2ST: ${shimazu.spellslotLvl2}/${shimazu.spellslotLvl2}
        `;
      document.getElementById('spellslotsBlock').innerHTML = spellHTML;
  
      // Left Gear Column
      const gearLeftColumn = document.getElementById('leftGear');
      gearLeftColumn.innerHTML = '';
  
      Object.values(shimazu.gear.leftGear).forEach(gear => {
        const gearSlot = document.createElement('div');
        gearSlot.classList.add('leftGear-slot');
        gearSlot.setAttribute('onClick', 'toggleTooltipLeftGear(this)')
  
        gearSlot.innerHTML = `
                  <div class="leftGear-tooltip">
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
          <div class="meele-tooltip">
            <strong>${meele.name}</strong><br>
            ${meele.description}
          </div>
        `;
  
        gearMeeleRow.appendChild(meeleSlot);
      })
  
      // Right Gear Column
      const gearRightColumn = document.getElementById('rightGear');
      gearRightColumn.innerHTML = '';
  
      Object.values(shimazu.gear.rightGear).forEach(gear => {
        const gearSlot = document.createElement('div');
        gearSlot.classList.add('rightGear-slot');
        gearSlot.setAttribute('onClick', 'toggleTooltipRightGear(this)')
  
        gearSlot.innerHTML = `
              <div class="rightGear-tooltip">
               <strong>${gear.name}</strong><br>
               ${gear.description}
              </div>
            `;
  
        gearRightColumn.appendChild(gearSlot);
      });
  
      // Spell Row
      const spellRow = document.getElementById('spellRow');
      spellRow.innerHTML = ''; // clear previous spells
  
      Object.values(shimazu.spells).forEach(spell => {
        const spellSlot = document.createElement('div');
        spellSlot.classList.add('spell-slot');
        spellSlot.setAttribute('onclick', 'toggleTooltip(this)');
  
        spellSlot.innerHTML = `
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
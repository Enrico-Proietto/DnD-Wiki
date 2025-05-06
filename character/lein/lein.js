async function loadCharacter() {
    try {
      const response = await fetch('lein.json');
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
      const skillsHTML = `
        <strong>Skills:</strong><br>
        Athletics ${belarus.skills.athletics}, Insight ${belarus.skills.insight},<br>
        Medicine ${belarus.skills.medicine}, Persuasion ${belarus.skills.persuasion}
      `;
      document.getElementById('skillsBlock').innerHTML = skillsHTML;
      
      const spellHTML = `
        <strong>Spell Slots:</strong><br>
        1ST: ${belarus.spellslotLvl1}/${belarus.spellslotLvl1} | 2ST: ${belarus.spellslotLvl2}/${belarus.spellslotLvl2}
      `;
      document.getElementById('spellslotsBlock').innerHTML = spellHTML;

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
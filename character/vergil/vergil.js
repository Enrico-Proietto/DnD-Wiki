async function loadCharacter() {
    try {
      const response = await fetch('vergil.json');
      const data = await response.json();
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
      const skillsHTML = `
        <strong>Skills:</strong><br>
        Acrobatics ${vergil.skills.acrobatics}, Athletics ${vergil.skills.athletics},<br>
        Insight ${vergil.skills.insight}, Medicine ${vergil.skills.medicine}
      `;
      document.getElementById('skillsBlock').innerHTML = skillsHTML;
      
      const spellRow = document.getElementById('spellRow');
    spellRow.innerHTML = ''; // clear previous spells

    Object.values(vergil.spells).forEach(spell => {
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
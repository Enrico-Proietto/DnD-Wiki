async function loadCharacter() {
    try {
        const response = await fetch('karwallo.json');
        const data = await response.json();
        const karwallo = data.karwallo[0];

        document.getElementById('characterName').textContent = karwallo.name;

        document.getElementById('hpValue').textContent = karwallo.hp;
        document.getElementById('acValue').textContent = karwallo.ac;
        document.getElementById('gpValue').textContent = karwallo.gp;

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
        
        const skillsHTML = `
        <strong>Skills:</strong><br>
        Insight ${karwallo.skills.insight}, Persuasion ${karwallo.skills.persuasion}
        `;
        document.getElementById('skillsBlock').innerHTML = skillsHTML;

        const spellHTML = `
        <strong>Spell Slots:</strong><br>
        1ST: ${karwallo.spellslotLvl1}/${karwallo.spellslotLvl1}
        `;
        document.getElementById('spellslotsBlock').innerHTML = spellHTML;

        const spellRow = document.getElementById('spellRow');
        spellRow.innerHTML = ''; // clear previous spells
    
        Object.values(karwallo.spells).forEach(spell => {
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
        console.error('Failed to load character data: ', err)
    }
}

loadCharacter();
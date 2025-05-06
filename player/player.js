document.querySelectorAll('.xp-block').forEach(block => {
    const currentXP = parseInt(block.getAttribute('data-current'));
    const neededXP = parseInt(block.getAttribute('data-needed'));
    const level = parseInt(block.getAttribute('data-level'));
  
    // Update level text
    block.querySelector('.levelValue').textContent = level;
  
    // Update XP texts
    block.querySelector('.xpCurrent').textContent = currentXP;
    block.querySelector('.xpNeeded').textContent = neededXP;
  
    // Calculate percentage
    const percent = (currentXP / neededXP) * 100;
    block.querySelector('.progress-bar').style.width = percent + '%';
  });


  async function loadPlayers() {
    try {
      const response = await fetch('player.json');
      const data = await response.json();
      
      const players = Object.values(data); // array of all characters (like belarus, vergil, etc.)
      const container = document.getElementById('players-container');
  
      container.innerHTML = ''; // clear first if needed
  
      players.forEach(group => {
        group.forEach(player => {
          // Create player card
          const card = document.createElement('div');
          card.className = 'player-card';
            
          const raceParts = player.race.split(' ');
          
          if (raceParts.length > 1) {
            card.innerHTML = `
            <a href="${player.pageSrc}">
              <img src="${player.imageSrc}" alt="${player.name} Portrait">
            </a>
            <div class="player-info">
              <h2>${player.name}</h2>
              <div class="raceDiv">
                <span class="race ${player.race.split(' ')[0].replace("Half-", "").toLowerCase()}"><strong>${player.race.split(' ')[0]}</strong></span>
                <span class="divider"><strong>/</strong></span>
                <span class="race ${player.race.split(' ')[1].replace("Half-", "").toLowerCase()}"><strong>${player.race.split(' ')[1]}</strong></span>
              </div>
              <div class="alignmentDiv">
                <span class="mainAlignment ${player.alignment.split('-')[0].toLowerCase()}"><strong>${player.alignment.split('-')[0]}</strong></span>
                <span class="divider"><strong>-</strong></span>
                <span class="sideAlignment ${player.alignment.split('-')[1].toLowerCase()}"><strong>${player.alignment.split('-')[1]}</strong></span>
              </div>
              <div class="status-bars">
                <div class="status hp"><span class="emoji">❤️</span> HP: <span>${player.hp}</span></div>
                <div class="status ac"><span class="emoji">🛡️</span> AC: <span>${player.ac}</span></div>
                <div class="status gp"><span class="emoji">💰</span> GP: <span>${player.gp}</span></div>
              </div>
              <div class="xp-block" data-current="${player.xp}" data-needed="${player.xpNeededForUpgrade}" data-level="${player.level}">
                <div class="level-label">🧙 Level <span class="levelValue"></span></div>
                <div class="progress-container">
                  <div class="progress-bar"></div>
                </div>
                <div class="xp-label"><span class="xpCurrent"></span> / <span class="xpNeeded"></span> XP</div>
              </div>
            </div>`;
          } else {
            card.innerHTML = `
            <a href="${player.pageSrc}">
              <img src="${player.imageSrc}" alt="${player.name} Portrait">
            </a>
            <div class="player-info">
              <h2>${player.name}</h2>
              <div class="raceDiv">
                <span class="race ${player.race.toLowerCase()}"><strong>${player.race}</strong></span>
              </div>
              <div class="alignmentDiv">
                <span class="mainAlignment ${player.alignment.split('-')[0].toLowerCase()}"><strong>${player.alignment.split('-')[0]}</strong></span>
                <span class="divider"><strong>-</strong></span>
                <span class="sideAlignment ${player.alignment.split('-')[1].toLowerCase()}"><strong>${player.alignment.split('-')[1]}</strong></span>
              </div>
              <div class="status-bars">
                <div class="status hp"><span class="emoji">❤️</span> HP: <span>${player.hp}</span></div>
                <div class="status ac"><span class="emoji">🛡️</span> AC: <span>${player.ac}</span></div>
                <div class="status gp"><span class="emoji">💰</span> GP: <span>${player.gp}</span></div>
              </div>
              <div class="xp-block" data-current="${player.xp}" data-needed="${player.xpNeededForUpgrade}" data-level="${player.level}">
                <div class="level-label">🧙 Level <span class="levelValue"></span></div>
                <div class="progress-container">
                  <div class="progress-bar"></div>
                </div>
                <div class="xp-label"><span class="xpCurrent"></span> / <span class="xpNeeded"></span> XP</div>
              </div>
            </div>`;
          }

          container.appendChild(card);
        });
      });
  
      updateXPBlocks(); // after all cards created, update XP bars
    } catch (err) {
      console.error('Failed to load characters:', err);
    }
  }
  
  function updateXPBlocks() {
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
  
  // Run on page load
  loadPlayers();
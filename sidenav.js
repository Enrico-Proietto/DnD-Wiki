function loadSidenav() {
  const sidenavHTML = `
  <div class="sidenav">
    <button class="toggle-btn" onclick="toggleSidenav()" aria-label="Toggle Navigation Menu">☰</button>

    <h2 role="heading" aria-level="1"><span class="aurora-text">Whispers from the Void</span></h2>

    <div class="nav-section">
      <a class="player" href="/DnD-Wiki/player/player.html">👥 Players</a>
      <a class="calender" href="/DnD-Wiki/calender/calender.html">📅 Calendar</a>
      <a class="time" href="/DnD-Wiki/timeline/timeline.html">🕰️ Timeline</a>
    </div>

    <div class="nav-section">
      <a class="lore" href="/DnD-Wiki/lore/lore.html">📜 Chronical</a>
      <a class="spellbook" href="/DnD-Wiki/spellbook/spellbook.html">📖 <span class="aurora-text">Spellbook</span></a>
      <a class="gods" href="/DnD-Wiki/gods/pantheon.html">⛪ Pantheon</a>
      <a class="pillar" href="/DnD-Wiki/pillars/pillars.html">💠 Mythical Powers</a>
      <a class="demon" href="/DnD-Wiki/demonomicon/demonomicon.html">🩸 Demonomicon</a>
      <a class="beastiary" href="/DnD-Wiki/beastiary/beastiary.html">🐉 Beastiary</a>
      <a class="faction" href="/DnD-Wiki/faction/faction.html">⚔️ Factions</a>
    </div>

    <div class="nav-section">
      <a class="gp" href="/DnD-Wiki/gold/gold.html">💰 Gold</a>
      <a class="shop" href="/DnD-Wiki/shop/shop.html">🛒 Shop</a>
      <a class="feedback" href="/DnD-Wiki/feedback/feedback.html">📝 Feedback</a>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', sidenavHTML);
}

function toggleSidenav() {
  document.querySelector(".sidenav")?.classList.toggle("collapsed");
  document.querySelector(".main")?.classList.toggle("expanded");
}

document.addEventListener("DOMContentLoaded", loadSidenav);
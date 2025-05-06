const archdevils = [
  { name: "████████", slug: "sealed", title: "The Iron Fist", image: "/images/archdevils/sigil_TheIronFist.png" },
  { name: "██████", slug: "sealed", title: "The Ember King", image: "/images/archdevils/sigil_TheEmberKing.png" },
  { name: "Karaxis", slug: "karaxis", title: "The Dread Seer", image: "/images/archdevils/karaxis.png" },
  { name: "█████", slug: "sealed", title: "The Silent Scourge", image: "/images/archdevils/sigil_TheSilentScourge.png" },
  { name: "Azarel", slug: "azarel", title: "The Bargain Maker", image: "/images/archdevils/azarel.png" },
  { name: "████████", slug: "sealed", title: "The Soul Forger", image: "/images/archdevils/sigil_TheSoulForger.png" },
  { name: "█████████", slug: "sealed", title: "The Veilkeeper", image: "/images/archdevils/sigil_TheVeilkeeper.png" },
  { name: "██████", slug: "sealed", title: "The Whisperer of Manipulation", image: "/images/archdevils/sigil_TheWhispherOfManipulation.png" },
  { name: "███████", slug: "sealed", title: "The Gatekeeper", image: "/images/archdevils/sigil_TheGatekeeper.png" }
];

const gallery = document.getElementById('gallery');

archdevils.forEach(devil => {
  const gate = document.createElement('div');
  gate.classList.add('gate');
  gate.classList.add('glitch-5')
  gate.onclick = () => {
    if (devil.slug === "sealed") {
      gate.classList.add('sealing');
      setTimeout(() => {
        gate.classList.remove('sealing');
      }, 2000);
      return;
    }

    gate.classList.add('unlocking');

    // Optional: add chain-breaking sound or glow effect here
    setTimeout(() => {
      window.location.href = `archdevils/${devil.slug}/${devil.slug}.html`;
    }, 2000); // match animation duration
  };

  gate.innerHTML = `
    <div class="gate-cover"></div>
    <img src="${devil.image}" alt="${devil.name}">
    <div class="name">
      <span class="glitch-hover" data-text="${devil.name}">${devil.name}</span>
      <br><small>${devil.title}</small>
    </div>
    `;
  gallery.appendChild(gate);
});

document.addEventListener('DOMContentLoaded', () => {
  const emberContainer = document.querySelector('.embers');

  for (let i = 0; i < 80; i++) {
    const ember = document.createElement('div');
    ember.classList.add('ember');

    ember.style.left = `${Math.random() * 100}vw`;
    ember.style.bottom = `${Math.random() * 100}vh`;
    ember.style.animationDuration = `${6 + Math.random() * 10}s`;
    ember.style.animationDelay = `${Math.random() * 10}s`;

    emberContainer.appendChild(ember);
  }
});
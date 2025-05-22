const firstborns = [
  { name: "Aelos", image: "/DnD-Wiki/images/gods/aelos.png", link: "/DnD-Wiki/gods/aelos/aelos.html" },
  { name: "Soryn", image: "/DnD-Wiki/images/gods/soryn.png", link: "/DnD-Wiki/gods/soryn/soryn.html" },
  { name: "Draconis", image: "/DnD-Wiki/images/gods/draconis.png", link: "/DnD-Wiki/gods/draconis.html" },
  { name: "Thalyris", image: "/DnD-Wiki/images/gods/thalyris.png", link: "/DnD-Wiki/gods/thalyris/thalyris.html" },
  { name: "Vorathor", image: "/DnD-Wiki/images/gods/vorathor.png", link: "/DnD-Wiki/gods/vorathor/vorathor.html" },
  { name: "Thaloria", image: "/DnD-Wiki/images/gods/thaloria.png", link: "" },
  { name: "Somnara", image: "/DnD-Wiki/images/gods/somnara.png", link: "" },
  { name: "Thoron", image: "/DnD-Wiki/images/gods/thoron.png", link: "" },
  { name: "Isharion", image: "/DnD-Wiki/images/gods/isharion.png", link: "" },
  { name: "Vorakthos", image: "/DnD-Wiki/images/gods/vorakthos.png", link: "" },
];

const ascended = [
  { name: "Elendor", image: "/DnD-Wiki/images/gods/elendor.png", link: "/DnD-Wiki/gods/elendor/elendor.html" },
  { name: "Anos Voldigoad", image: "/DnD-Wiki/images/gods/anos.png", link: "/DnD-Wiki/gods/anos/anos.html" },
  { name: "Zurathis", image: "/DnD-Wiki/images/gods/zurathis.png", link: "/DnD-Wiki/gods/zurathis/zurathis.html" },
  { name: "Elorthas", image: "/DnD-Wiki/images/gods/elorthas.png", link: "/DnD-Wiki/gods/elorthas/elorthas.html" },
  { name: "Tyrathar", image: "/DnD-Wiki/images/gods/tyrathar.png", link: "" },
  { name: "Zarrak", image: "/DnD-Wiki/images/gods/zarrak.png", link: "" },
  { name: "Eryndor", image: "/DnD-Wiki/images/gods/eryndor.png", link: "" },
  { name: "Zarethiel", image: "/DnD-Wiki/images/gods/zarethiel.png", link: "" },
];

function positionGods(containerId, gods, radius) {
  const container = document.getElementById(containerId);
  const angleStep = (2 * Math.PI) / gods.length;

  gods.forEach((godData, index) => {
    const angle = index * angleStep;
    const angleDeg = angle * (180 / Math.PI);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const god = document.createElement('div');
    god.className = 'god';
    god.style.left = `calc(50% + ${x}px)`;
    god.style.top = `calc(50% + ${y}px)`;

    if (godData.link !== "") {
      god.onclick = () => window.location.href = godData.link;
    }

    const img = document.createElement('img');

    if (containerId === "firstborns") {
      img.className = 'fs';
    } else {
      img.className = 'ac';
    }

    img.src = godData.image;
    img.alt = godData.name;

    god.appendChild(img);
    container.appendChild(god);
  });
}

positionGods('firstborns', firstborns, 230);
positionGods('ascended', ascended, 380);

document.addEventListener('DOMContentLoaded', () => {
  let clickCount = 0;
  let flashCount = 0;

  const flash = document.getElementById('flash');
  const flashMsg = document.querySelector('.flash-message');
  const centerBtn = document.querySelector('.center-button');

  const messages = [
    "You should not tempt what should not be woken...",
    "You should not tempt what should not be woken...",
    "You should not tempt what should not be woken...",
    "You should not tempt what should not be woken...",
    "Even the gods look away now...",
    "It draws closer, each time you touch it...",
    "It wakes."
  ];

  centerBtn.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 7 && flashCount < 7) {
      flashCount++;
      // Pick the appropriate message
      let msg = messages[Math.min(flashCount - 1, messages.length - 1)];
      flashMsg.textContent = msg;

      flash.style.display = 'block';

      // If it’s the last message, keep screen white for 5 minutes
      const duration = 10000 + Math.random() * 5000;

      setTimeout(() => {
        flash.style.display = 'none';
      }, 5000);

      clickCount = 0;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelector('.stars');

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.bottom = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${10 + Math.random() * 20}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;

    stars.appendChild(star);
  }
});

function toggleSidenav() {
  document.querySelector(".sidenav").classList.toggle("collapsed");
  document.querySelector(".main").classList.toggle("expanded");
}
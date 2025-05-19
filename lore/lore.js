let pages = [];
let currentPage = 0;

// Load the JSON file with pages
async function loadPages() {
  try {
    const response = await fetch('lore.json'); // Adjust the path if needed
    const data = await response.json();
    pages = data.pages;

    // Show first pages
    updatePages();
  } catch (error) {
    console.error("Error loading pages:", error);
  }
}

// Update the page contents
function updatePages() {
    const left = pages[currentPage][0];
    const right = pages[currentPage][1];
  
    document.getElementById('leftContent').innerHTML = left.content;
    document.getElementById('rightContent').innerHTML = right.content;
  
    document.getElementById('leftPageNum').textContent = `Page ${currentPage * 2 + 1}`;
    document.getElementById('rightPageNum').textContent = `Page ${currentPage * 2 + 2}`;
  
    // Handle special chapter pages
    if (left.chapter) {
      document.getElementById('leftContent').style.textAlign = 'center';
      document.getElementById('leftContent').style.fontSize = '40px';
      document.getElementById('leftContent').style.marginTop = '50%';
    } else {
      document.getElementById('leftContent').style.textAlign = 'left';
      document.getElementById('leftContent').style.fontSize = '18px';
      document.getElementById('leftContent').style.marginTop = '0%';
    }
  
    if (right.chapter) {
      document.getElementById('rightContent').style.textAlign = 'center';
      document.getElementById('rightContent').style.fontSize = '40px';
      document.getElementById('rightContent').style.marginTop = '50%';
    } else {
      document.getElementById('rightContent').style.textAlign = 'left';
      document.getElementById('rightContent').style.fontSize = '18px';
      document.getElementById('rightContent').style.marginTop = '0%';
    }
  }
  function nextPage() {
    if (currentPage < pages.length - 1) {
      const rightPage = document.querySelector('.right-page');
      rightPage.classList.add('flip');
  
      setTimeout(() => {
        currentPage++;
        updatePages();
        rightPage.classList.remove('flip');
      }, 500); // match animation duration
    }
  }
  
  function prevPage() {
    if (currentPage > 0) {
      const leftPage = document.querySelector('.left-page');
      leftPage.classList.add('flip-reverse');
  
      setTimeout(() => {
        currentPage--;
        updatePages();
        leftPage.classList.remove('flip-reverse');
      }, 500);
    }
  }

// When clicking on the cover, reveal the book pages
document.getElementById('book').addEventListener('click', () => {
  document.getElementById('book').style.display = 'none';
  document.getElementById('bookPages').style.display = 'block';
});

// Load the pages initially
loadPages();

function toggleSidenav() {
    document.querySelector(".sidenav").classList.toggle("collapsed");
    document.querySelector(".main").classList.toggle("expanded");
}
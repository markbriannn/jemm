document.addEventListener("DOMContentLoaded", () => {
  // Show Next button after flower fades in
  setTimeout(() => {
    document.getElementById("nextBtn").classList.remove("hidden");
  }, 1000);

  // Show main content after clicking Next
  document.getElementById("nextBtn").addEventListener("click", () => {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");
  });

  // Modal controls
  const letterBtn = document.getElementById("letterBtn");
  const closeLetterBtn = document.getElementById("closeLetterBtn");
  const letterModal = document.getElementById("letterModal");

  const galleryBtn = document.getElementById("galleryBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const galleryModal = document.getElementById("galleryModal");

  if (letterBtn && closeLetterBtn && letterModal) {
    letterBtn.onclick = () => letterModal.classList.remove("hidden");
    closeLetterBtn.onclick = () => letterModal.classList.add("hidden");
  }

  if (galleryBtn && closeModalBtn && galleryModal) {
    galleryBtn.onclick = () => galleryModal.classList.remove("hidden");
    closeModalBtn.onclick = () => galleryModal.classList.add("hidden");
  }

  // ----------------------------
  // ENLARGE IMAGES & VIDEOS WITH NAVIGATION
  // ----------------------------

  const zoomModal = document.createElement('div');
  zoomModal.id = 'zoomModal';
  zoomModal.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    display: none;
  `;
  document.body.appendChild(zoomModal);

  // Navigation arrows
  const leftArrow = document.createElement('span');
  leftArrow.innerHTML = '&#10094;';
  leftArrow.style.cssText = `
    position: absolute;
    left: 30px;
    font-size: 60px;
    color: white;
    cursor: pointer;
    user-select: none;
  `;

  const rightArrow = document.createElement('span');
  rightArrow.innerHTML = '&#10095;';
  rightArrow.style.cssText = `
    position: absolute;
    right: 30px;
    font-size: 60px;
    color: white;
    cursor: pointer;
    user-select: none;
  `;

  zoomModal.appendChild(leftArrow);
  zoomModal.appendChild(rightArrow);

  let zoomItems = [];
  let currentZoomIndex = 0;

  function showZoomModalByIndex(index) {
    const el = zoomItems[index];
    const clone = el.cloneNode(true);
    clone.style.maxWidth = '90vw';
    clone.style.maxHeight = '90vh';
    clone.style.boxShadow = '0 0 15px #e91e63';
    if (clone.tagName === 'VIDEO') clone.controls = true;

    zoomModal.innerHTML = '';
    zoomModal.appendChild(leftArrow);
    zoomModal.appendChild(rightArrow);
    zoomModal.appendChild(clone);
    zoomModal.style.display = 'flex';
  }

  function showZoomModal(el) {
    currentZoomIndex = zoomItems.indexOf(el);
    showZoomModalByIndex(currentZoomIndex);
  }

  leftArrow.onclick = () => {
    currentZoomIndex = (currentZoomIndex - 1 + zoomItems.length) % zoomItems.length;
    showZoomModalByIndex(currentZoomIndex);
  };

  rightArrow.onclick = () => {
    currentZoomIndex = (currentZoomIndex + 1) % zoomItems.length;
    showZoomModalByIndex(currentZoomIndex);
  };

  zoomModal.addEventListener('click', (e) => {
    if (e.target === zoomModal) {
      zoomModal.style.display = 'none';
      zoomModal.innerHTML = '';
    }
  });

  // Gather all zoomable elements
  zoomItems = Array.from(document.querySelectorAll('.album-gallery img, .album-gallery video'));
  zoomItems.forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => showZoomModal(el));
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (zoomModal.style.display === 'flex') {
      if (e.key === "ArrowRight") rightArrow.click();
      if (e.key === "ArrowLeft") leftArrow.click();
      if (e.key === "Escape") {
        zoomModal.style.display = 'none';
        zoomModal.innerHTML = '';
      }
    }
  });
});

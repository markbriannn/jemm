document.addEventListener("DOMContentLoaded", () => {
  // Show Next button after intro flower animation
  setTimeout(() => {
    document.getElementById("nextBtn").classList.remove("hidden");
  }, 1000);

  // Transition to main content
  document.getElementById("nextBtn").addEventListener("click", () => {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");

    // Optional: play background music after user interaction
    const music = document.getElementById("bgMusic");
    if (music) music.play().catch(() => {}); // handle autoplay restriction
  });

  // Final Letter Modal
  const letterBtn = document.getElementById("letterBtn");
  const closeLetterBtn = document.getElementById("closeLetterBtn");
  const letterModal = document.getElementById("letterModal");

  if (letterBtn && closeLetterBtn && letterModal) {
    letterBtn.addEventListener("click", () => letterModal.classList.remove("hidden"));
    closeLetterBtn.addEventListener("click", () => letterModal.classList.add("hidden"));
  }

  // Gallery Modal
  const galleryBtn = document.getElementById("galleryBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const galleryModal = document.getElementById("galleryModal");

  if (galleryBtn && closeModalBtn && galleryModal) {
    galleryBtn.addEventListener("click", () => galleryModal.classList.remove("hidden"));
    closeModalBtn.addEventListener("click", () => galleryModal.classList.add("hidden"));
  }

  // --- Zoom Modal Setup ---
  const zoomModal = document.createElement('div');
  zoomModal.id = 'zoomModal';
  Object.assign(zoomModal.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.95)',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000
  });
  document.body.appendChild(zoomModal);

  // Create left and right arrows
  const createArrow = (html, position) => {
    const arrow = document.createElement('span');
    arrow.innerHTML = html;
    arrow.style.cssText = `
      position: absolute;
      ${position}: 30px;
      font-size: 60px;
      color: white;
      cursor: pointer;
      user-select: none;
      z-index: 10001;
    `;
    return arrow;
  };

  const leftArrow = createArrow('&#10094;', 'left');
  const rightArrow = createArrow('&#10095;', 'right');

  let zoomItems = [];
  let currentZoomIndex = 0;

  const showZoomModalByIndex = (index) => {
    const el = zoomItems[index];
    const clone = el.cloneNode(true);
    Object.assign(clone.style, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      boxShadow: '0 0 15px #e91e63'
    });

    if (clone.tagName === 'VIDEO') clone.controls = true;

    zoomModal.innerHTML = '';
    zoomModal.appendChild(leftArrow);
    zoomModal.appendChild(rightArrow);
    zoomModal.appendChild(clone);
    zoomModal.style.display = 'flex';
  };

  const showZoomModal = (el) => {
    currentZoomIndex = zoomItems.indexOf(el);
    showZoomModalByIndex(currentZoomIndex);
  };

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

  // Setup zoomable items
  zoomItems = Array.from(document.querySelectorAll('.album-gallery img, .album-gallery video'));
  zoomItems.forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => showZoomModal(el));
  });

  // Keyboard navigation for zoom modal
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

  // Optional: music play button
  const playBtn = document.getElementById("playMusicBtn");
  const bgMusic = document.getElementById("bgMusic");
  if (playBtn && bgMusic) {
    playBtn.addEventListener("click", () => {
      bgMusic.play();
      playBtn.style.display = "none";
    });
  }
});

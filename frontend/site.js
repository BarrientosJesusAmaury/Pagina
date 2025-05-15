// ========== MODAL DE IMAGENES ==========
document.querySelectorAll('.Imagen').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
  });
});

document.getElementById('close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});

// ========== MODAL DE TARJETAS ==========
const modalcards = document.getElementById('modalcards');
const modalContent = document.getElementById('cards1');
const closeCards = document.getElementById('close1');

document.querySelectorAll('.cards > div').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3')?.innerText || '';
    const paragraph = card.querySelector('p')?.innerText || '';
    const img = card.querySelector('img');
    const gif = card.querySelector('.card-gif');

    let mediaHTML = '';
    if (gif) {
      gif.style.display = 'block';
      mediaHTML = `<img src="${gif.src}" alt="GIF" class="card-img-gif" />`;
    } else if (img) {
      mediaHTML = `<img src="${img.src}" alt="Image" class="card-img-gif" />`;
    }

    modalContent.innerHTML = `
      <h3>${title}</h3>
      <p>${paragraph}</p>
      ${mediaHTML}
    `;

    modalcards.style.display = 'flex';
  });
});

function cerrarModalCards() {
  modalcards.style.display = 'none';
  document.querySelectorAll('.card-gif').forEach(gif => {
    gif.style.display = 'none';
  });
}

closeCards.addEventListener('click', cerrarModalCards);
modalcards.addEventListener('click', (e) => {
  if (e.target.id === 'modalcards') cerrarModalCards();
});

// ========== CAROUSEL ==========
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.carousel__viewport');
  const slides = document.querySelectorAll('.carousel__slide');
  const navButtons = document.querySelectorAll('.carousel__navigation-button');
  const arrowLinks = document.querySelectorAll('.carousel__prev, .carousel__next');

  function scrollToSlide(targetId) {
    const targetSlide = document.getElementById(targetId);
    if (targetSlide) {
      viewport.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: 'smooth'
      });
    }
  }

  navButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const targetId = button.getAttribute('href').substring(1);
      scrollToSlide(targetId);
    });
  });

  arrowLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSlide(targetId);
    });
  });

  const observerOptions = {
    root: viewport,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(slides).indexOf(entry.target);
        navButtons.forEach(btn => btn.classList.remove('active'));
        if (navButtons[index]) {
          navButtons[index].classList.add('active');
        }
      }
    });
  }, observerOptions);

  slides.forEach(slide => observer.observe(slide));

  const sliderSelector = document.getElementById('sliderSelector');
  sliderSelector.addEventListener('change', () => {
    const targetId = sliderSelector.value;
    scrollToSlide(targetId);
  });
});

const fadeScrollElements = document.querySelectorAll('.fade-scroll');

const fadeScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeScrollElements.forEach(el => fadeScrollObserver.observe(el));

const audio = document.getElementById('background-audio');
const pauseButton = document.getElementById('pause-audio');
const muteButton = document.getElementById('mute-audio');

// Pausar/Reanudar audio
pauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    pauseButton.textContent = '⏸️ Pausar';
  } else {
    audio.pause();
    pauseButton.textContent = '▶️ Reanudar';
  }
});

// Mutear/Desmutear audio
muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? '🔊 Desmutear' : '🔇 Mutear';
});


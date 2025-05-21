/*home - Imagens de fundo */
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.background-images img').forEach((img, index) => {
            const speed = (index + 1) * 0.2;
            img.style.transform = `translateY(${-scrollY * speed}px)`;
        });
    });
});


/* Home - Nome da Empresa */

document.addEventListener("DOMContentLoaded", () => {
  const words = [
    { el: document.getElementById("word1"), text: "Nexspire" },
    { el: document.getElementById("word2"), text: "Digital" }
  ];

  words.forEach(w => {
    w.el.textContent = "";
    w.el.classList.remove("typing-active");
  });

function typeWord(index) {
  const { el, text } = words[index];
  let charIndex = 0;

  // Apenas limpa a palavra atual
  el.textContent = "";
  el.classList.remove("typing-active", "finished");
  el.classList.add("typing-active");

  const typing = setInterval(() => {
    if (charIndex === text.length) {
      clearInterval(typing);
      el.classList.remove("typing-active");
      el.classList.add("finished");

      // Iniciar próxima palavra se existir
      if (index + 1 < words.length) {
        setTimeout(() => {
          typeWord(index + 1);
        }, 140);
      }

      return;
    }

    el.textContent += text[charIndex];
    charIndex++;
  }, 140);
}
  typeWord(0); // Inicia
});


/* Nossos Serviços */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');
  const cardContainer = document.querySelector('.card-container');
  let activeIndex = 1; // O índice do card central

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove('left', 'active', 'right');

      if (index === activeIndex - 1) card.classList.add('left'); // Card à esquerda
      else if (index === activeIndex) card.classList.add('active'); // Card central
      else if (index === activeIndex + 1) card.classList.add('right'); // Card à direita
    });

    // Lógica para a navegação de swipe
    const activeCard = cards[activeIndex];
    if (activeCard && window.innerWidth <= 768) {
      const containerRect = cardContainer.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();

      // Calcula a diferença para centralizar o card ativo no container
      const scrollLeft = cardContainer.scrollLeft;
      const offset = (cardRect.left + cardRect.width / 2) - (containerRect.left + containerRect.width / 2);
      cardContainer.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }

  // Evento de swipe para movimentar os cards
  cardContainer.addEventListener('touchstart', handleSwipeStart);
  cardContainer.addEventListener('touchmove', handleSwipeMove);
  cardContainer.addEventListener('touchend', handleSwipeEnd);

  let startX = 0;

  function handleSwipeStart(e) {
    startX = e.touches[0].clientX;
  }

  function handleSwipeMove(e) {
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) { // Detecta o swipe
      if (diff > 0) {
        activeIndex = Math.min(cards.length - 1, activeIndex + 1); // Move para a direita
      } else {
        activeIndex = Math.max(0, activeIndex - 1); // Move para a esquerda
      }
      updateCards();
      startX = currentX; // Atualiza a posição inicial
    }
  }

  function handleSwipeEnd() {
    // Lógica após o swipe, se necessário
  }

  updateCards(); // Inicializa a atualização dos cards ao carregar a página

    // Destaque temporário no card tocado no mobile
  cards.forEach((card, index) => {
    card.addEventListener("touchstart", () => {
      if (index !== activeIndex) {
        card.classList.add("touched");
        setTimeout(() => card.classList.remove("touched"), 300);
      }
    });
  });

  // === Hover com destaque e desfoque nos cards (apenas desktop) ===
if (window.innerWidth > 768) {
  const container = document.querySelector('.card-container');
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      container.classList.add('hovered');
      card.classList.add('hover-target');
    });

    card.addEventListener('mouseleave', () => {
      container.classList.remove('hovered');
      card.classList.remove('hover-target');
    });
  });
}



});



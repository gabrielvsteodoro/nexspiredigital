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



/* ------------------ Nossos Serviços ------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');
  const cardContainer = document.querySelector('.card-container');
  let activeIndex = 1;

  function updateCards() {
    cards.forEach((card, index) => {
      card.classList.remove('left', 'active', 'right');
      if (index === activeIndex - 1) card.classList.add('left');
      else if (index === activeIndex) card.classList.add('active');
      else if (index === activeIndex + 1) card.classList.add('right');
    });

    const activeCard = cards[activeIndex];
    if (activeCard && window.innerWidth <= 768) {
      const containerRect = cardContainer.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const scrollLeft = cardContainer.scrollLeft;
      const offset = (cardRect.left + cardRect.width / 2) - (containerRect.left + containerRect.width / 2);
      cardContainer.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  }

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

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        activeIndex = Math.min(cards.length - 1, activeIndex + 1);
      } else {
        activeIndex = Math.max(0, activeIndex - 1);
      }
      updateCards();
      startX = currentX;
    }
  }

  function handleSwipeEnd() { }

  updateCards();

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


    // === Flip e Expansão ao clicar no card (somente desktop) ===
    cards.forEach(card => {
      const front = card.querySelector('.card-front');
      const back = card.querySelector('.card-back');

      card.addEventListener('click', (e) => {
        const isButton = e.target.closest("button");
        if (isButton) return;

        const alreadyExpanded = card.classList.contains("flipped");

        document.querySelectorAll('.card.flipped').forEach(c => {
          c.classList.remove("flipped", "expanded");
        });

        if (!alreadyExpanded) {
          card.classList.add("flipped", "expanded");
        }
      });
    });

    // Fecha ao clicar fora da expansão
    document.addEventListener("click", (e) => {
      const expandedCard = document.querySelector(".card.expanded");
      if (expandedCard && !expandedCard.contains(e.target)) {
        expandedCard.classList.remove("flipped", "expanded");
      }
    });

    // Fecha ao clicar no botão X
    document.querySelectorAll('.close-expand').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card) card.classList.remove("flipped", "expanded");
      });
    });
  }

  function expandCard(cardElement) {
    // Não expande se já estiver expandido
    if (cardElement.classList.contains('expanded')) return;

    // Fecha qualquer outro card expandido
    document.querySelectorAll('.card.expanded').forEach(card => {
      card.classList.remove('expanded');
    });

    // Expande o card clicado
    cardElement.classList.add('expanded');

    // Bloqueia scroll no body enquanto expandido
    document.body.style.overflow = 'hidden';

    // Fecha ao clicar fora
    setTimeout(() => {
      document.addEventListener('click', clickOutsideToClose);
    }, 100);
  }

  function fecharCard(event) {
    event.stopPropagation();
    const card = event.target.closest('.card');
    card.classList.remove('expanded');
    document.body.style.overflow = '';

    document.removeEventListener('click', clickOutsideToClose);
  }

  function clickOutsideToClose(e) {
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard && !expandedCard.contains(e.target)) {
      expandedCard.classList.remove('expanded');
      document.body.style.overflow = '';
      document.removeEventListener('click', clickOutsideToClose);
    }
  }
  
});


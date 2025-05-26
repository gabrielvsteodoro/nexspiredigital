// home - Imagens de fundo com movimento aleatório + animação de entrada
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('.background-images img');

  // Gera um conjunto de direções e velocidades aleatórias para cada imagem
  const movementData = Array.from(images).map(() => ({
    speedX: (Math.random() * 0.6 - 0.3), // entre -0.3 e 0.3
    speedY: (Math.random() * 0.6 + 0.1)  // entre 0.1 e 0.7
  }));

  const animationDuration = 700; // duração da animação de entrada em ms
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Direções possíveis de entrada
  const directions = ['top', 'left', 'right', 'bottom'];

  // Define deslocamento inicial fora da tela para cada imagem, vindo de uma direção aleatória
  const initialOffsets = Array.from(images).map(() => {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    switch(dir) {
      case 'top': return { x: 0, y: -viewportHeight - 200 };
      case 'left': return { x: -viewportWidth - 200, y: 0 };
      case 'right': return { x: viewportWidth + 200, y: 0 };
      case 'bottom': return { x: 0, y: viewportHeight + 200 };
    }
  });

  let startTime = null;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateEntrance(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeOutQuad(progress);

    images.forEach((img, i) => {
      const offsetX = initialOffsets[i].x * (1 - easedProgress);
      const offsetY = initialOffsets[i].y * (1 - easedProgress);
      img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    if (progress < 1) {
      requestAnimationFrame(animateEntrance);
    } else {
      // Após a animação de entrada, ativa o movimento com scroll
      window.addEventListener('scroll', onScrollMove);
    }
  }

  function onScrollMove() {
    const scrollY = window.scrollY;

    images.forEach((img, index) => {
      const { speedX, speedY } = movementData[index];
      const moveX = scrollY * speedX;
      const moveY = scrollY * speedY;

      img.style.transform = `translate(${moveX}px, ${-moveY}px)`;
    });
  }

  // Inicia animação de entrada
  requestAnimationFrame(animateEntrance);
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

  
// === Botão VER PROJETOS ===//

  function mostrarMensagemProjetos() {
    const mensagem = document.getElementById("mensagem-projetos");
    mensagem.classList.add("mostrar");

    setTimeout(() => {
      mensagem.classList.remove("mostrar");
    }, 4000);
  }

  // Associa ao botão
  document.querySelectorAll('.orcamento-btn').forEach(btn => {
    btn.addEventListener('click', mostrarMensagemProjetos);
  });


// === NOSSO TIME === //

function animarElementosAoRolar() {
  const limite = window.innerHeight * 0.85;

  // Seleciona todos os elementos com animação genérica
  const elementos = document.querySelectorAll('.animate');
  elementos.forEach(el => {
    const topo = el.getBoundingClientRect().top;
    if (topo < limite) {
      el.classList.add('visible');
    }
  });

  // Animações específicas por membro
  const membros = [
    { foto: '.animate-foto-gabriel', caixa: '.animate-caixa-gabriel' },
    { foto: '.animate-foto-fabricio', caixa: '.animate-caixa-fabricio' },
    { foto: '.animate-foto-lucas', caixa: '.animate-caixa-lucas' }
  ];

  membros.forEach(membro => {
    const fotoEl = document.querySelector(membro.foto);
    const caixaEl = document.querySelector(membro.caixa);

    if (fotoEl && caixaEl) {
      const topoFoto = fotoEl.getBoundingClientRect().top;
      const topoCaixa = caixaEl.getBoundingClientRect().top;

      if (topoFoto < limite) {
        fotoEl.classList.add('visible');
      }

      if (topoCaixa < limite) {
        caixaEl.classList.add('visible');
      }
    }
  });
}

window.addEventListener('scroll', animarElementosAoRolar);
window.addEventListener('load', animarElementosAoRolar);


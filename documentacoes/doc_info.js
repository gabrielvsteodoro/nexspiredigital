function mostrarConteudo(id) {
  // Esconde todas as seções
  document.querySelectorAll('.conteudo').forEach(secao => {
    secao.style.display = (secao.id === id) ? 'block' : 'none';
  });

  // Marca o link ativo na navegação
  atualizaLinkAtivo(id);

  // Atualiza o hash da URL sem recarregar a página
  history.replaceState(null, '', `#${id}`);

  // Opcional: rola suavemente para o topo do conteúdo exibido
  const secaoAtual = document.getElementById(id);
  if (secaoAtual) {
    secaoAtual.scrollIntoView({ behavior: 'smooth' });
  }
}

function atualizaLinkAtivo(id) {
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === `#${id}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Ao carregar a página, verifica hash e exibe a seção correta
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1); // remove o #
  if (hash) {
    mostrarConteudo(hash);
  } else {
    mostrarConteudo('termos'); // seção padrão
  }
});

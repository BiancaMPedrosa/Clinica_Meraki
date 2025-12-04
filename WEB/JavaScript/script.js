document.addEventListener("DOMContentLoaded", () => {
  fetch("/WEB/JSON/conteudo.json")
    .then(res => res.json())
    .then(data => {
      preencherCarrossel(data.carousel);
     
     const descContainer = document.getElementById("descricao-texto");

    if (data.descricao && data.descricao.length > 0) {
      const texto = data.descricao[0].texto;

      // quebra em 2 parágrafos automaticamente
      const partes = texto.split(". ").map(p => p.trim()).filter(p => p.length > 0);

      descContainer.innerHTML = `
        <p>${partes.slice(0, 4).join(". ") + "."}</p>
        <br>
        <p>${partes.slice(4).join(". ") + "."}</p>
      `;
    }
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));
});


function preencherCarrossel(itens) {
  const carousel = document.getElementById("carousel-content");
  carousel.innerHTML = "";

  itens.forEach((item, i) => {
    carousel.innerHTML += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${item.imagem}" class="d-block w-100" alt="${item.titulo}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${item.titulo}</h5>
          <p>${item.descricao}</p>
        </div>
      </div>
    `;
  });
}

   const vlibrasContainer = document.createElement("div");
      vlibrasContainer.setAttribute("vw", "");
      vlibrasContainer.classList.add("enabled");
      vlibrasContainer.innerHTML = `
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      `;
      document.body.appendChild(vlibrasContainer);

      const scriptVLibras = document.createElement("script");
      scriptVLibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      scriptVLibras.onload = () => {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      };
      document.body.appendChild(scriptVLibras);



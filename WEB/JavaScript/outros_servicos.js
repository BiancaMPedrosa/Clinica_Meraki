document.addEventListener("DOMContentLoaded", () => {
  fetch("/WEB/JSON/conteudoOutros.json")
    .then(res => res.json())
    .then(data => {
      preencherOutros(data.outrosServicos);
      preencherAntesDepois(data.antesDepois);
    })
    .catch(err => console.error("Erro ao carregar JSON:", err));
});

function preencherOutros(lista) {
  const container = document.getElementById("outrosServicos");
  container.innerHTML = "";

  lista.forEach((proc, i) => {
    const id = `proc${i}`;
    container.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${id}">
          <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#collapse${id}">
            <i class="${proc.icone} me-2"></i> ${proc.titulo}
          </button>
        </h2>
        <div id="collapse${id}" class="accordion-collapse collapse" data-bs-parent="#procedimentosFaciais">
          <div class="accordion-body">${proc.descricao}</div>
        </div>
      </div>
    `;
  });
}

function preencherAntesDepois(lista) {
  const container = document.getElementById("cardsAntesDepois");
  container.innerHTML = "";

  lista.forEach(item => {
  container.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="card shadow-sm border-0">
        
        <img src="${item.antes}" class="card-img-top img-full" alt="Antes">

        <div class="card-body text-center">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.descricao}</p>
        </div>

      </div>
    </div>
  `;
});
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
}

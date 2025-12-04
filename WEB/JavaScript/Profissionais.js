// Firebase
const firebaseConfig = {
  databaseURL: "https://profissionais-364b9-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Buscar dados
db.ref("Profissionais").once("value").then(snapshot => {
  const data = snapshot.val();

  montarHeader(data.header);
  montarCapa(data.capa);
  montarProfissionais(data.profissionais);
  montarContatos(data.contatos);
});

// HEADER
function montarHeader(header) {
  document.getElementById("logo-header").src = header.logo;

  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  header.menu.forEach(item => {
    if (item.submenu) {
      menu.innerHTML += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
            ${item.nome}
          </a>
          <ul class="dropdown-menu">
            ${item.submenu.map(sub =>
              `<li><a class="dropdown-item" href="${sub.link}">${sub.nome}</a></li>`
            ).join("")}
          </ul>
        </li>`;
    } else {
      menu.innerHTML += `
        <li class="nav-item">
          <a class="nav-link" href="${item.link}">${item.nome}</a>
        </li>`;
    }
  });

  const icons = document.getElementById("icons");
  icons.innerHTML = header.icones
    .map(ic => `<a href="${ic.link}"><img src="${ic.imagem}"></a>`)
    .join("");
}

// CAPA
function montarCapa(capa) {
  document.getElementById("capa-img").src = capa.imagem;
  document.getElementById("capa-titulo").textContent = capa.titulo;
  document.getElementById("capa-subtitulo").textContent = capa.subtitulo;
}

// PROFISSIONAIS
function montarProfissionais(lista) {
  const area = document.getElementById("lista-profissionais");

  area.innerHTML = lista.map(p => `
    <div class="prof-card">
      <div class="prof-img-box">
        <img src="${p.imagem}">
      </div>
      <div class="prof-text">
        <h2>${p.nome}</h2>
        <p>${p.descricao}</p>
        <ul>
          ${p.procedimentos.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

function montarContatos(contato) {
  document.getElementById("contato-logo").src = contato.logo;

  document.getElementById("contato-info").innerHTML = `
    <div class="linha">
      <i class="${contato.linha1.icone.replaceAll('_', ' ')} icon"></i>
      <span>${contato.linha1.texto}</span>
    </div>

    <div class="linha">
      <i class="${contato.linha2.icone.replaceAll('_', ' ')} icon"></i>
      <span>${contato.linha2.texto}</span>
    </div>

    <div class="linha">
      <i class="${contato.linha3.icone.replaceAll('_', ' ')} icon"></i>
      <span>${contato.linha3.texto}</span>
    </div>
  `;

  document.getElementById("copy").textContent = contato.copy;
}


// FORMULÁRIO + MODAIS
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-duvidas");
  const modalConfirmacao = document.getElementById("modal-confirmacao");
  const modalSucesso = document.getElementById("modal-sucesso");
  const modalCancelado = document.getElementById("modal-cancelado");

  let dadosTemp = {};

  function abrirModal(m) { m.style.display = "flex"; }
  function fecharModal(m) { m.style.display = "none"; }

  form.addEventListener("submit", e => {
    e.preventDefault();

    dadosTemp = {
      nome_completo: form.nome_completo.value,
      email: form.email.value,
      telefone: form.telefone.value || "Não informado",
      duvida: form.duvida.value
    };

    document.getElementById("confirma-nome").textContent = dadosTemp.nome_completo;
    document.getElementById("confirma-email").textContent = dadosTemp.email;
    document.getElementById("confirma-telefone").textContent = dadosTemp.telefone;
    document.getElementById("confirma-duvida").textContent = dadosTemp.duvida;

    abrirModal(modalConfirmacao);
  });

  document.getElementById("btn-confirmar-envio").addEventListener("click", () => {
    emailjs.send("service_02wdi3s", "template_xz72rir", dadosTemp)
      .then(() => {
        fecharModal(modalConfirmacao);
        abrirModal(modalSucesso);
        form.reset();
      })
      .catch(() => alert("Erro ao enviar."));
  });

  document.getElementById("btn-cancelar-envio").addEventListener("click", () => {
    fecharModal(modalConfirmacao);
    abrirModal(modalCancelado);
  });

  document.querySelectorAll(".btn-fechar-modal").forEach(btn => {
    btn.onclick = () => fecharModal(btn.closest(".modal"));
  });
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

// MENU HAMBURGUER
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});
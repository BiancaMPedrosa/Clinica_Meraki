const firebaseConfig = {
  databaseURL: "https://post-preenchimento-fcb02-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// CARREGAR DADOS DA PÁGINA
db.ref("Preenchimento").once("value").then(snap => {
  const data = snap.val();

  montarHeader(data.header);
  montarCapa(data.capa);
  montarIntroducao(data.introducao);
  montarBeneficios(data.beneficios);
  montarSessaoFinal(data.sessaoFinal);
  montarContatos(data.contatos);
});

// HEADER
function montarHeader(header) {
  // Logo
  document.getElementById("logo-header").src = header.logo;

  // MENU
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  header.menu.forEach(item => {
    // Se tiver submenu → cria dropdown
    if (item.submenu) {
      menu.innerHTML += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            ${item.nome}
          </a>

          <ul class="dropdown-menu">
            ${item.submenu
              .map(sub => `
                <li><a class="dropdown-item" href="${sub.link}">${sub.nome}</a></li>
              `)
              .join("")}
          </ul>
        </li>
      `;
    }

    // Se NÃO tiver submenu → item comum
    else {
      menu.innerHTML += `
        <li class="nav-item">
          <a class="nav-link" href="${item.link}">${item.nome}</a>
        </li>
      `;
    }
  });

  // ICONES
  const icons = document.getElementById("icons");
  icons.innerHTML = "";

  header.icones.forEach(ic => {
    icons.innerHTML += `
      <a href="${ic.link}">
        <img src="${ic.imagem}">
      </a>
    `;
  });
}


// CAPA 
function montarCapa(capa) {
  document.getElementById("capa-img").src = capa.imagem;
  document.getElementById("capa-titulo").textContent = capa.titulo;
}

// INTRODUÇÃO 
function montarIntroducao(intro) {
  document.getElementById("introducao").innerHTML = `
   <div class="intro-container">
    <div class="intro-text">
      <h1>${intro.titulo}</h1>
      <p>${intro.texto}</p>
    </div>
    <img src="${intro.imagem}" class="intro-img">
  </div>
  `;
}

// BENEFÍCIOS 
function montarBeneficios(beneficios) {
  const section = document.getElementById("beneficios");
  section.innerHTML = `<h2>${beneficios.titulo}</h2>`;

  let html = `<div class="beneficios-cards">`;

  beneficios.itens.forEach(item => {
    html += `
      <div class="beneficio-card">
        <h3>${item.titulo}</h3>
        <p>${item.texto}</p>
      </div>
    `;
  });

  html += `</div>`;
  section.innerHTML += html;
}

// SESSÃO FINAL 
function montarSessaoFinal(final) {
  document.getElementById("sessaoFinal").innerHTML = `
    <div class="final-container">
      <div class="final-text">${final.texto}</div>
      <img class="final-img" src="${final.imagem}">
    </div>
  `;
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

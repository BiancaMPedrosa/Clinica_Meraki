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
  document.getElementById("logo-header").src = header.logo;

  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  header.menu.forEach(item => {
    menu.innerHTML += `<li><a href="${item.link}">${item.nome}</a></li>`;
  });

  const icons = document.getElementById("icons");
  icons.innerHTML = "";
  header.icones.forEach(ic => {
    icons.innerHTML += `<a href="${ic.link}"><img src="${ic.imagem}"></a>`;
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

// CONTATOS 
function montarContatos(ct) {
  document.getElementById("contato-logo").src = ct.logo;

  document.getElementById("contato-info").innerHTML = `
    <div class="linha">
      <img src="${ct.linha1.icone}" class="icon">
      <span>${ct.linha1.texto}</span>
    </div>
    <div class="linha">
      <img src="${ct.linha2.icone}" class="icon">
      <span>${ct.linha2.texto}</span>
    </div>
    <div class="linha">
      <img src="${ct.linha3.icone}" class="icon">
      <span>${ct.linha3.texto}</span>
    </div>
  `;

  document.getElementById("copy").textContent = ct.copy;
}
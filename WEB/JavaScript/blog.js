const firebaseConfig = {
    databaseURL: "https://meraki-blog-a295c-default-rtdb.firebaseio.com/"
  };

  firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// BUSCAR DADOS
db.ref("/").once("value").then(snapshot => {
  const data = snapshot.val();

  montarHeader(data.header);
  montarCapa(data.capa);
  montarCards(data.posts.cards);
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
  document.getElementById("capa-subtitulo").textContent = capa.subtitulo;
}

// CARDS
function montarCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

cards.forEach(card => {
  container.innerHTML += `
    <div class="card">
      <img src="${card.imagem}">
      <button onclick="window.location.href='${card.link}'">${card.botao}</button>
    </div>
    `;
  });
}

// CONTATOS
function montarContatos(contato) {
 document.getElementById("contato-logo").src = contato.logo;

 document.getElementById("contato-info").innerHTML = `
  <div class="linha">
    <img src="${contato.linha1.icone}" class="icon">
    <span>${contato.linha1.texto}</span>
  </div>

  <div class="linha">
    <img src="${contato.linha2.icone}" class="icon">
    <span>${contato.linha2.texto}</span>
  </div>

  <div class="linha">
    <img src="${contato.linha3.icone}" class="icon">
    <span>${contato.linha3.texto}</span>
  </div>
  `;

  document.getElementById("copy").textContent = contato.copy;
}
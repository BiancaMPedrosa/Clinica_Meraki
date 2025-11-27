// ----------------------------------------------------------
//  Firebase Configuração
// ----------------------------------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyASJv9K5MfAtdKM_kegzu9t9sUHCFkFdyc",
    authDomain: "prjextensao-d094a.firebaseapp.com",
    databaseURL: "https://prjextensao-d094a-default-rtdb.firebaseio.com",
    projectId: "prjextensao-d094a",
    storageBucket: "prjextensao-d094a.firebasestorage.app",
    messagingSenderId: "30437697418",
    appId: "1:30437697418:web:8bc41db6a488b8a2ef4a73"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
console.log("Firebase carregado com sucesso!");



const container = document.getElementById("Agendamento");

const formHTML = `
  <div class="card p-4 shadow">

    <h4 class="mb-3"> Preencha o formulário abaixo para realizar o seu agendamento.</h4>

    <form id="formAgendamento">

      <div class="mb-3">
        <label for="nome" class="form-label">Nome completo *</label>
        <input type="text" id="nome" name="nome" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone *</label>
        <input type="tel" id="telefone" name="telefone" class="form-control" placeholder="(00) 00000-0000" required>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email *</label>
        <input type="email" id="email" name="email" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="tipo" class="form-label">Tipo de atendimento *</label>
        <select id="tipo" name="tipo" class="form-select" required>
          <option value="" disabled selected>Selecione...</option>
          <option value="consulta">Consulta</option>
          <option value="capilar">Procedimento Capilar</option>
          <option value="facial">Procedimento Facial</option>
          <option value="corporal">Procedimento Corporal</option>
          <option value="esmalteria">Esmalteria</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="data" class="form-label">Data desejada</label>
        <input type="date" id="data" name="data" class="form-control">
      </div>

      <div class="mb-3">
        <label for="mensagem" class="form-label">Mensagem / Observações</label>
        <textarea id="mensagem" name="mensagem" class="form-control" rows="4"></textarea>
      </div>

      <button type="submit" class="btn btn-dark w-100" id="btnEnviar">Enviar Agendamento</button>
      <br><br>

      <button type="button" id="cancelarBtn" class="btn btn-outline-dark w-100">Cancelar</button>

    </form>
  </div>
`;

// ----------------------------------------------------------
//  Funções principais
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    // Insere o formulário
    container.innerHTML = formHTML;

    const form = document.getElementById("formAgendamento");
    const cancelarBtn = document.getElementById("cancelarBtn");

    // Modais
    const modalSucesso = document.getElementById("modalSucesso");
    const modalConfirmarEnvio = document.getElementById("modalConfirmarEnvio");
    const modalCancelado = document.getElementById("modalCancelado");
    const modalConfirmarCancelamento = document.getElementById("modalConfirmarCancelamento");

    const confirmarEnvioBtn = document.getElementById("confirmarEnvio");

    function formatarTelefone(telefone) {
        const digitos = telefone.replace(/\D/g, '');
        if (digitos.length === 11) {
            return `(${digitos.substring(0, 2)}) ${digitos.substring(2, 7)}-${digitos.substring(7)}`;
        }
        return telefone;
    }

    // ----------------------------------------------------------
    //  Ação: enviar formulário (abre modal de confirmação)
    // ----------------------------------------------------------

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (form.checkValidity()) {
            modalConfirmarEnvio.style.display = "flex";
        } else {
            form.reportValidity();
        }
    });

    // ----------------------------------------------------------
    //  Ação: confirmar envio (EmailJS + Firebase)
    // ----------------------------------------------------------

    confirmarEnvioBtn.addEventListener("click", async () => {

        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: formatarTelefone(document.getElementById("telefone").value),
            tipo: document.getElementById("tipo").value,
            dataDesejada: document.getElementById("data").value || "Não especificada",
            mensagem: document.getElementById("mensagem").value || "Nenhuma",
            enviadoEm: new Date().toISOString()
        };

        // ---------- Envio por EmailJS ----------
        emailjs.send("service_5iynf6l", "template_8e97dqi", {
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone,
            tipo: dados.tipo,
            dataDesejada: dados.dataDesejada,
            mensagem: dados.mensagem
        })
        .then(async () => {

            // ---------- Envio para Firebase ----------
            await db.ref('agendamentos').push(dados);

            modalConfirmarEnvio.style.display = "none";
            modalSucesso.style.display = "flex";
            form.reset();
        })
        .catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
            alert("Erro ao enviar e-mail. Veja o console.");
        });
    });

   

    document.getElementById("cancelarEnvio").addEventListener("click", () => {
        modalConfirmarEnvio.style.display = "none";
    });

    cancelarBtn.addEventListener("click", () => {
        modalConfirmarCancelamento.style.display = "flex";
    });

    // Confirmar cancelamento
    document.getElementById("confirmarCancelamento").addEventListener("click", () => {
        form.reset();
        modalConfirmarCancelamento.style.display = "none";
        modalCancelado.style.display = "flex";
    });

    // Voltar do cancelamento
    document.getElementById("cancelarCancelamento").addEventListener("click", () => {
        modalConfirmarCancelamento.style.display = "none";
    });
});

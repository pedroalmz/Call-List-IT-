const formulario = document.getElementById("ticket-form");
const tabela = document.getElementById("ticket-list");
const mensagem = document.getElementById("empty-message");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

function salvarChamados() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}

function mostrarChamados() {
  tabela.innerHTML = "";

  for (let i = 0; i < chamados.length; i++) {
    tabela.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${chamados[i].solicitante}</td>
        <td>${chamados[i].setor}</td>
        <td>${chamados[i].problema}</td>
        <td>${chamados[i].prioridade}</td>
        <td>
          <select data-indice="${i}" aria-label="Status do chamado ${i + 1}">
            <option ${chamados[i].status === "Aberto" ? "selected" : ""}>Aberto</option>
            <option ${chamados[i].status === "Em andamento" ? "selected" : ""}>Em andamento</option>
            <option ${chamados[i].status === "Resolvido" ? "selected" : ""}>Resolvido</option>
          </select>
        </td>
        <td><button class="delete-button" data-indice="${i}" type="button">Excluir</button></td>
      </tr>
    `;
  }

  if (chamados.length === 0) {
    mensagem.hidden = false;
  } else {
    mensagem.hidden = true;
  }
}

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const chamado = {
    solicitante: formulario.requester.value,
    setor: formulario.department.value,
    problema: formulario.problem.value,
    prioridade: formulario.priority.value,
    status: "Aberto"
  };

  chamados.push(chamado);
  salvarChamados();
  mostrarChamados();
  formulario.reset();
});

tabela.addEventListener("change", function(event) {
  if (event.target.tagName === "SELECT") {
    const indice = event.target.dataset.indice;
    chamados[indice].status = event.target.value;
    salvarChamados();
  }
});

tabela.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    const indice = event.target.dataset.indice;
    chamados.splice(indice, 1);
    salvarChamados();
    mostrarChamados();
  }
});

mostrarChamados();
document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("colaboradoresTable");
  const buttonAdd = document.getElementById("button_colab");

  // Carrega colaboradores salvos
  let colaboradores =
    JSON.parse(localStorage.getItem("colaboradores")) || [];

  // Função para desenhar um colaborador na tabela
  function adicionarLinha(colaborador) {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${colaborador.nome}</td>
      <td>${colaborador.telefone}</td>
      <td>${colaborador.email}</td>
      <td>
        <button class="btn btn-danger btn-sm remover">
          Remover
        </button>
      </td>
    `;

    const botaoRemover = novaLinha.querySelector(".remover");

    botaoRemover.addEventListener("click", () => {
      novaLinha.remove();

      colaboradores = colaboradores.filter(
        (c) =>
          !(
            c.nome === colaborador.nome &&
            c.telefone === colaborador.telefone &&
            c.email === colaborador.email
          )
      );

      localStorage.setItem(
        "colaboradores",
        JSON.stringify(colaboradores)
      );
    });

    tabela.appendChild(novaLinha);
  }

  // Monta a tabela ao abrir a página
  colaboradores.forEach((colaborador) => {
    adicionarLinha(colaborador);
  });

  // Evento do botão adicionar
  buttonAdd.addEventListener("click", () => {
    const nome = document
      .getElementById("name_colab")
      .value.trim();

    const telefone = document
      .getElementById("number_colab")
      .value.trim();

    const email = document
      .getElementById("email_colab")
      .value.trim();

    if (!nome || !telefone || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    if (telefone.length < 10 || telefone.length > 11) {
      alert("Número de telefone inválido");
      return;
    }

    const nomeEx = colaboradores.some(
      (c) => c.nome.toLowerCase() === nome.toLowerCase()
    );

    if (nomeEx) {
      alert("Já existe um colaborador com esse nome!");
      return;
    }

    const telefoneEx = colaboradores.some(
      (c) => c.telefone === telefone
    );

    if (telefoneEx) {
      alert("Esse número já existe!");
      return;
    }

    const emailEx = colaboradores.some(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );

    if (emailEx) {
      alert("Esse email já está sendo utilizado!");
      return;
    }

    const novoColaborador = {
      nome,
      telefone,
      email,
    };

    adicionarLinha(novoColaborador);

    colaboradores.push(novoColaborador);

    localStorage.setItem(
      "colaboradores",
      JSON.stringify(colaboradores)
    );

    document.getElementById("name_colab").value = "";
    document.getElementById("number_colab").value = "";
    document.getElementById("email_colab").value = "";

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );

    if (modal) {
      modal.hide();
    }
  });
});
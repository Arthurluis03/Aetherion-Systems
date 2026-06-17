document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("clientesTable");
  const buttonAdd = document.getElementById("button_login");

  // Carrega clientes salvos
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  // Função para desenhar um cliente na tabela
  function adicionarLinha(cliente) {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email}</td>
      <td>
        <button class="btn btn-danger btn-sm remover">
          Remover
        </button>
      </td>
    `;

    // Evento do botão remover
    const botaoRemover = novaLinha.querySelector(".remover");

    botaoRemover.addEventListener("click", () => {
      novaLinha.remove();

      clientes = clientes.filter(
        (c) =>
          !(
            c.nome === cliente.nome &&
            c.telefone === cliente.telefone &&
            c.email === cliente.email
          ),
      );

      localStorage.setItem("clientes", JSON.stringify(clientes));
    });

    tabela.appendChild(novaLinha);
  }

  clientes.forEach((cliente) => {
    adicionarLinha(cliente);
  });

  buttonAdd.addEventListener("click", () => {
    const nome = document.getElementById("name_client").value.trim();
    const telefone = document.getElementById("number_client").value.trim();
    const email = document.getElementById("email_client").value.trim();

    if (!nome || !telefone || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    if (telefone.length < 10 || telefone.length > 11) {
      alert("Número de telefone inválido");
      return;
    }
    const nomeEx = clientes.some(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (nomeEx) {
      alert("Já existe um cliente com esse nome!");
      return;
    }
    const telefoneEx = clientes.some((c) => c.telefone === telefone);

    if (telefoneEx) {
      alert("Esse Número já existe");
      return;
    }
    const emailEx = clientes.some(
      (c) => c.email.toLowerCase() === email.toLowerCase(),
    );
    if (emailEx) {
      alert("Esse email já está sendo utilizado, por favor tente usar outro!");
      return;
    }

    const novoCliente = {
      nome,
      telefone,
      email,
    };

    adicionarLinha(novoCliente);

    clientes.push(novoCliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));

    document.getElementById("name_client").value = "";
    document.getElementById("number_client").value = "";
    document.getElementById("email_client").value = "";

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal"),
    );

    if (modal) {
      modal.hide();
    }
  });
});

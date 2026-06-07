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
        `;

        tabela.appendChild(novaLinha);
    }

    // Monta a tabela ao abrir a página
    clientes.forEach(cliente => {
        adicionarLinha(cliente);
    });

    // Evento do botão
    buttonAdd.addEventListener("click", () => {

        const nome = document.getElementById("name_client").value.trim();
        const telefone = document.getElementById("number_client").value.trim();
        const email = document.getElementById("email_client").value.trim();

        if (!nome || !telefone || !email) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoCliente = {
            nome,
            telefone,
            email
        };

        // Adiciona na tabela
        adicionarLinha(novoCliente);

        // Adiciona no array
        clientes.push(novoCliente);

        // Salva no localStorage
        localStorage.setItem(
            "clientes",
            JSON.stringify(clientes)
        );

        // Limpa os campos
        document.getElementById("name_client").value = "";
        document.getElementById("number_client").value = "";
        document.getElementById("email_client").value = "";

        // Fecha o modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("loginModal")
        );

        if (modal) {
            modal.hide();
        }
    });

});
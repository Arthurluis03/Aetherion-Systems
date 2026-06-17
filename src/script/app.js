const clientesStorage =
  JSON.parse(localStorage.getItem("clientes")) || [];

const projetosStorage =
  JSON.parse(localStorage.getItem("projetos")) || [];

const faturamentoStorage =
  JSON.parse(localStorage.getItem("faturamento")) || [];

const empregadosStorage =
  JSON.parse(localStorage.getItem("empregados")) || [];

let clientes = clientesStorage.length;
let projetos = projetosStorage.length;
let faturamento = faturamentoStorage.length;
let empregados = empregadosStorage.length;


const password = document.getElementById("password_show");



password.addEventListener("click", function () {
  const passwordInput = document.querySelector(".dropdown-item-Password input");
  const img = this.querySelector("img");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    img.src = "/src/images/hide.png";
  } else {
    passwordInput.type = "password";
    img.src = "/src/images/view.png";
  }
});
const ctx = document.getElementById("dashboardChart");
const ctxOnline = document.getElementById("dashboardChart-online");

const funcionariosOnline = 1;
const funcionariosOffline = 2;

const dbCOnline = new Chart(ctxOnline, {
  type: "pie",
  data: {
    labels: ["Online", "Offline"],
    datasets: [
      {
        label: "Funcionarios Online",
        data: [funcionariosOnline, funcionariosOffline],
        backgroundColor: ["#10B981", "#F59E0B"],
      },
    ],
  },
});

const dashboardChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Clientes", "Projetos", "Faturamento", "Empregados"],
    datasets: [
      {
        label: "Indicadores",
        data: [clientes, projetos, faturamento, empregados],
        backgroundColor: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B"],
        borderRadius: 10,
      },
    ],
  },
});
function atualizar() {
  document.getElementById("cont_client").textContent = clientes;
  document.getElementById("cont_proj").textContent = projetos;
  document.getElementById("cont_fat").textContent = faturamento;
  document.getElementById("cont_emp").textContent = empregados;

  dashboardChart.data.datasets[0].data = [
    clientes,
    projetos,
    faturamento,
    empregados,
  ];

  dashboardChart.update();
}

atualizar();

const password_login = document.getElementById("password_login");
const email_login = document.getElementById("email_login");
const button_login = document.getElementById("button_login");

let logado = false;

button_login.addEventListener("click", () => {
  if (logado) {
    alert("Você já fez login");
    return;
    
  }

  if (email_login.value.trim() === "" || password_login.value.trim() === "") {
    alert("Preencha todos os campos");
    return
  }

  alert("LOGIN FEITO");
  email_login.value = ''
  password_login.value = ''
  logado = true;
  
});



function atualizarContador() {
  document.getElementById("cont_clientes").textContent = clientes.length;
}
atualizarContador()
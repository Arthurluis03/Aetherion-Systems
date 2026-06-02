let clientes = +document.getElementById("cont_client").textContent;
let projetos = +document.getElementById("cont_proj").textContent;
let faturamento = +document.getElementById("cont_fat").textContent;
let empregados = +document.getElementById("cont_emp").textContent;
const ctx = document.getElementById("dashboardChart");
const ctxOnline = document.getElementById('dashboardChart-online');

const funcionariosOnline = 1;
const funcionariosOffline = 0;

const dbCOnline = new Chart(ctxOnline, {
  type: "pie",
  data: {
    labels: ["Online", "Offline"],
    datasets: [{
      label: "Funcionarios Online",
      data: [funcionariosOnline, funcionariosOffline],
      backgroundColor: ['#10B981', '#F59E0B']
    }]
  }
});

const dashboardChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Clientes", "Projetos", "Faturamento", "Empregados"],
    datasets: [{
      label: "Indicadores",
      data: [clientes, projetos, faturamento, empregados],
      backgroundColor: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B"],
      borderRadius: 10,
    }]
  }
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
    empregados
  ];

  dashboardChart.update();
}

atualizar()



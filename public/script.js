// Função para atualizar o dashboard com dados da API
async function atualizarDashboard() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();

    // Atualizar CPU
    atualizarCard('cpu', data.cpu.valor, data.cpu.tipo);

    // Atualizar Memória
    atualizarCard('ram', data.memoria.valor, data.memoria.tipo);

    // Atualizar Temperatura
    atualizarCard('temp', data.temperatura.valor, data.temperatura.tipo);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    // Mostrar erro nos status
    document.getElementById('status-cpu').textContent = 'Status: Erro';
    document.getElementById('status-ram').textContent = 'Status: Erro';
    document.getElementById('status-temp').textContent = 'Status: Erro';
  }
}

// Função para atualizar um card específico com alertas
function atualizarCard(tipo, valor, tipoSensor) {
  const valorElement = document.getElementById(`valor-${tipo}`);
  const statusElement = document.getElementById(`status-${tipo}`);
  const cardElement = valorElement.closest('.card');

  valorElement.textContent = valor;

  let isCritical = false;
  if (tipoSensor === 'cpu' && valor > 80) {
    isCritical = true;
  } else if (tipoSensor === 'memoria' && valor > 12) {
    isCritical = true;
  } else if (tipoSensor === 'temperatura' && valor > 80) {
    isCritical = true;
  }

  if (isCritical) {
    cardElement.classList.remove('normal');
    cardElement.classList.add('alerta', 'critico');
    statusElement.textContent = 'Status: ALERTA CRÍTICO!';
  } else {
    cardElement.classList.remove('alerta', 'critico');
    cardElement.classList.add('normal');
    statusElement.textContent = 'Status: OK';
  }
}

// Atualizar a cada 2 segundos
setInterval(atualizarDashboard, 2000);

// Atualizar imediatamente ao carregar
atualizarDashboard();
const monitorRam = new MonitorHardware('card-ram');
const monitorTemp = new MonitorHardware('card-temp');

async function buscarDados() {
    try {
        const response = await fetch('/api/status');
        const dados = await response.json();

        monitorCpu.atualizarInterface(dados.cpu.valor, 'cpu');
        monitorRam.atualizarInterface(dados.memoria.valor, 'ram');
        monitorTemp.atualizarInterface(dados.temperatura.valor, 'temp');

    } catch (erro) {
        console.error("Erro ao buscar dados do servidor:", erro);
    }
}

setInterval(buscarDados, 2000);
buscarDados();
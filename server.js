const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

class HardwareEngine {
  constructor(tipo) {
    this.tipo = tipo;
  }

  lerDado() {
    let valor;
    if (this.tipo === 'cpu') {
      valor = Math.floor(Math.random() * 101);
    } else if (this.tipo === 'memoria') {
      valor = Math.round((Math.random() * 16) * 100) / 100;
    } else if (this.tipo === 'temperatura') {
      valor = Math.round((30 + Math.random() * 60) * 10) / 10;
    } else {
      valor = Math.floor(Math.random() * 101);
    }

    return {
      tipo: this.tipo,
      valor: valor,
      timestamp: new Date().toLocaleTimeString()
    };
  }
}

const sensorCpu = new HardwareEngine('cpu');
const sensorMemoria = new HardwareEngine('memoria');
const sensorTemperatura = new HardwareEngine('temperatura');

app.get('/api/status', (req, res) => {
  const cpu = sensorCpu.lerDado();
  const memoria = sensorMemoria.lerDado();
  const temperatura = sensorTemperatura.lerDado();

  res.json({ cpu, memoria, temperatura });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
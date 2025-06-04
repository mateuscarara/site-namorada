const imagens = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'];
let indice = 0;
let carrosselAtivo = false;
let cronometroAtivo = false;
let coracoesAtivo = false;
let maquinaAtiva = false;

function mostrarSurpresa() {
  // Se já está ativa, ignora novos cliques
  if (carrosselAtivo || cronometroAtivo || coracoesAtivo || maquinaAtiva) return;

  document.getElementById('surpresa').style.display = 'block';
  document.getElementById('audio').play();

  iniciarCarrossel();
  iniciarCronometro();
  criarCoracoes();

  const texto = "Desde que você entrou na minha vida, tudo ficou mais bonito. 💕\nObrigado por ser quem você é. Te amo!";
  maquinaEscrever(texto, 'mensagemMaquina', 50);
}

// 🎞️ Carrossel
function iniciarCarrossel() {
  if (carrosselAtivo) return;
  carrosselAtivo = true;
  const img = document.getElementById('imagemCarrossel');
  setInterval(() => {
    img.style.opacity = 0;
    setTimeout(() => {
      indice = (indice + 1) % imagens.length;
      img.src = imagens[indice];
      img.style.opacity = 1;
    }, 1000);
  }, 4000);
}

// ⏳ Cronômetro
const dataInicio = new Date("2025-03-15T00:00:00");
function iniciarCronometro() {
  if (cronometroAtivo) return;
  cronometroAtivo = true;

  setInterval(() => {
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();

    if (dias < 0) {
      meses--;
      const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
      dias += mesAnterior.getDate();
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    const diffMs = agora - dataInicio;
    const totalSegundos = Math.floor(diffMs / 1000);
    const segundos = totalSegundos % 60;
    const minutos = Math.floor(totalSegundos / 60) % 60;
    const horas = Math.floor(totalSegundos / 3600) % 24;

    document.getElementById("cronometro").textContent =
      `Estamos juntos há: ${anos} ano(s), ${meses} mês(es), ${dias} dia(s), `
      + `${horas}h ${minutos}m ${segundos}s 💖`;
  }, 1000);
}

// Máquina de escrever
function maquinaEscrever(texto, elementoId, velocidade = 50) {
  if (maquinaAtiva) return; // evita duplicação
  maquinaAtiva = true;

  let i = 0;
  const elemento = document.getElementById(elementoId);
  elemento.textContent = '';
  function escrever() {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
      setTimeout(escrever, velocidade);
    } else {
      maquinaAtiva = false; // termina para poder reusar no futuro se quiser
    }
  }
  escrever();
}

// Corações flutuantes
function criarCoracoes() {
  if (coracoesAtivo) return;
  coracoesAtivo = true;

  const container = document.querySelector('.hearts-container');
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    container.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 6000);
  }, 300);
}

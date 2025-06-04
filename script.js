const botao = document.getElementById("botaoSurpresa");
const surpresa = document.getElementById("surpresa");
const audio = document.getElementById("audio");
const imagemCarrossel = document.getElementById("imagemCarrossel");

botao.addEventListener("click", () => {
  if (surpresa.style.display === "none") {
    surpresa.style.display = "block";
    audio.play();
    iniciarCarrossel();
    iniciarCronometro();
    if (!coracoesAtivos) criarCoracoes();
  }
});

// 🎞️ Carrossel
const imagens = ["foto1.jpg", "foto2.jpg", "foto3.jpg"];
let indice = 0;
let carrosselAtivo = false;

function iniciarCarrossel() {
  if (carrosselAtivo) return;
  carrosselAtivo = true;
  setInterval(() => {
    indice = (indice + 1) % imagens.length;
    imagemCarrossel.src = imagens[indice];
  }, 3000);
}

// ⏳ Cronômetro
const dataInicio = new Date("2025-03-15T00:00:00");

function iniciarCronometro() {
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
      `Estamos juntos há: ${anos} ano(s), ${meses} mês(es), ${dias} dia(s), ` +
      `${horas}h ${minutos}m ${segundos}s 💖`;
  }, 1000);
}

// 💕 Corações flutuando
let coracoesAtivos = false;
function criarCoracoes() {
  coracoesAtivos = true;
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

// ======================
// Envio do formulário via fetch (ajax)
const form = document.getElementById('formMensagem');
const statusDiv = document.getElementById('statusMensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mensagem = document.getElementById('mensagem').value.trim();
  if (!mensagem) return;

  statusDiv.textContent = 'Enviando... 💌';

  try {
    const response = await fetch('https://formsubmit.co/ajax/mateus.qc@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem }),
    });

    if (response.ok) {
      statusDiv.textContent = 'Mensagem enviada com sucesso! Obrigado, amor 💖';
      form.reset();
    } else {
      throw new Error('Erro no envio');
    }
  } catch {
    statusDiv.textContent = 'Ops, não consegui enviar. Tente novamente, por favor.';
  }

  setTimeout(() => {
    statusDiv.textContent = '';
  }, 5000);
});

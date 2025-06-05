const botao = document.getElementById("botaoSurpresa");
const surpresa = document.getElementById("surpresa");
const audio = document.getElementById("audio");
const imagemCarrossel = document.getElementById("imagemCarrossel");
const form = document.getElementById("formMensagem");
const feedbackMsg = document.getElementById("feedbackMsg");

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
const imagens = ["foto1.jpg", "foto2.jpg", "foto4.jpg"];
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
      `Eu te amo há: ${anos} ano(s), ${meses} mês(es), ${dias} dia(s), ` +
      `${horas}h ${minutos}m ${segundos}s 💖`;
  }, 1000);
}

// 💕 Corações flutuando
let coracoesAtivos = false;
function criarCoracoes() {
  coracoesAtivos = true;
  const container = document.querySelector(".hearts-container");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    container.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 6000);
  }, 300);
}

// 🎉 Confete
function criarConfete() {
  for (let i = 0; i < 30; i++) {
    const confete = document.createElement("div");
    confete.classList.add("confete");
    confete.style.left = Math.random() * window.innerWidth + "px";
    confete.style.top = "0px"; // começo do topo
    confete.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    confete.style.animationDuration = (1 + Math.random()) + "s"; // duração entre 1s e 2s
    confete.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(confete);
    confete.addEventListener("animationend", () => confete.remove());
  }
}

// 🎯 Envio do formulário com fetch para evitar reload
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const mensagem = form.mensagem.value.trim();
  if (!mensagem) return;

  try {
    // Envie para o endpoint do FormSubmit
    const response = await fetch("https://formsubmit.co/ajax/mateus.qc@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem }),
    });

    if (response.ok) {
      feedbackMsg.textContent = "Mensagem enviada com sucesso! Obrigado, amor 💖";
      feedbackMsg.style.color = "#4caf50";
      feedbackMsg.classList.add("show");
      criarConfete();
      form.reset();
    } else {
      throw new Error("Erro no envio");
    }
  } catch {
    feedbackMsg.textContent = "Ops, algo deu errado. Tente novamente.";
    feedbackMsg.style.color = "#f44336";
    feedbackMsg.classList.add("show");
  }

  // Scroll para feedback visível
  feedbackMsg.scrollIntoView({ behavior: "smooth", block: "center" });

  // Esconder a mensagem depois de 4 segundos
  setTimeout(() => {
    feedbackMsg.classList.remove("show");
    feedbackMsg.textContent = "";
  }, 4000);
});
function digitarMensagem(texto, elementoId, velocidade = 50) {
  const elemento = document.getElementById(elementoId);
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, velocidade);
}

document.addEventListener("DOMContentLoaded", () => {
  digitarMensagem(
    "Desde que você entrou na minha vida, tudo ficou mais bonito. 💕 Obrigado por ser quem você é. Te amo!",
    "mensagemDigitada"
  );
});

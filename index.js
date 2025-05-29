/*
  Arquivo: index.js
  JS principal do Quiz de Biologia Celular
  Sem partículas de feedback, centralização de textos e botões, ícone de tema corrigido.
*/

// ================== QUESTÕES ===================
const perguntasQuiz = [
  {
    pergunta: "Qual organela é responsável pela produção de energia na célula?",
    alternativas: [
      "Retículo endoplasmático",
      "Mitocôndria",
      "Complexo de Golgi",
      "Lisossomo"
    ],
    correta: 1
  },
  {
    pergunta: "O que diferencia uma célula eucariótica de uma procariótica?",
    alternativas: [
      "Presença de núcleo definido",
      "Presença de ribossomos",
      "Ausência de parede celular",
      "Capacidade fotossintética"
    ],
    correta: 0
  },
  {
    pergunta: "O DNA das células está localizado principalmente em qual estrutura?",
    alternativas: [
      "Lisossomo",
      "Mitocôndria",
      "Núcleo",
      "Retículo endoplasmático"
    ],
    correta: 2
  },
  {
    pergunta: "Qual dessas NÃO é uma organela celular?",
    alternativas: [
      "Cloroplasto",
      "Aparelho de Golgi",
      "Peroxissomo",
      "Celulose"
    ],
    correta: 3
  },
  {
    pergunta: "A função principal dos ribossomos é:",
    alternativas: [
      "Produzir ATP",
      "Armazenar lipídios",
      "Sintetizar proteínas",
      "Fazer digestão intracelular"
    ],
    correta: 2
  },
  {
    pergunta: "Qual dessas estruturas está presente em células vegetais, mas ausente em animais?",
    alternativas: [
      "Mitocôndria",
      "Cloroplasto",
      "Ribossomo",
      "Lisossomo"
    ],
    correta: 1
  },
  {
    pergunta: "O que ocorre na fase G1 do ciclo celular?",
    alternativas: [
      "Replicação do DNA",
      "Síntese de proteínas e crescimento",
      "Divisão celular",
      "Condensação dos cromossomos"
    ],
    correta: 1
  },
  {
    pergunta: "O que são células-tronco?",
    alternativas: [
      "Células especializadas do sangue",
      "Células que não possuem núcleo",
      "Células indiferenciadas com potencial de se diferenciar",
      "Células da epiderme"
    ],
    correta: 2
  },
  {
    pergunta: "Qual organela faz a digestão intracelular?",
    alternativas: [
      "Lisossomo",
      "Complexo de Golgi",
      "Peroxissomo",
      "Cloroplasto"
    ],
    correta: 0
  },
  {
    pergunta: "Em que estrutura ocorre a fotossíntese?",
    alternativas: [
      "Mitocôndria",
      "Cloroplasto",
      "Retículo endoplasmático liso",
      "Núcleo"
    ],
    correta: 1
  },
  // Perguntas extras para modo difícil
  {
    pergunta: "O que caracteriza a membrana plasmática?",
    alternativas: [
      "Ser composta por polissacarídeos",
      "Possuir dupla camada de fosfolipídios",
      "Ser rígida e impermeável",
      "Armazenar DNA"
    ],
    correta: 1
  },
  {
    pergunta: "A principal função do Complexo de Golgi é:",
    alternativas: [
      "Produzir energia",
      "Modificar, empacotar e transportar proteínas",
      "Fazer digestão intracelular",
      "Produzir ribossomos"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a função dos peroxissomos?",
    alternativas: [
      "Desintoxicação celular",
      "Produção de energia",
      "Armazenar água",
      "Produzir proteínas"
    ],
    correta: 0
  },
  {
    pergunta: "O citoesqueleto é responsável por:",
    alternativas: [
      "Armazenar nutrientes",
      "Dar forma e suporte à célula",
      "Produzir hormônios",
      "Fazer fotossíntese"
    ],
    correta: 1
  },
  {
    pergunta: "A parede celular das células vegetais é composta principalmente por:",
    alternativas: [
      "Celulose",
      "Quitina",
      "Glicogênio",
      "Peptidoglicano"
    ],
    correta: 0
  },
  {
    pergunta: "Qual dessas NÃO é função da mitocôndria?",
    alternativas: [
      "Produção de ATP",
      "Respiração celular",
      "Síntese de proteínas",
      "Metabolismo energético"
    ],
    correta: 2
  },
  {
    pergunta: "A meiose resulta em:",
    alternativas: [
      "Células idênticas à original",
      "Células com metade do número de cromossomos",
      "Duplicação do DNA sem divisão",
      "Produção de proteínas"
    ],
    correta: 1
  },
  {
    pergunta: "Qual dessas estruturas está presente em todas as células?",
    alternativas: [
      "Núcleo",
      "Cloroplasto",
      "Ribossomo",
      "Parede celular"
    ],
    correta: 2
  },
  {
    pergunta: "O núcleo é delimitado por:",
    alternativas: [
      "Uma camada única de lipídios",
      "Parede celular",
      "Dupla membrana nuclear",
      "Retículo endoplasmático"
    ],
    correta: 2
  },
  {
    pergunta: "A principal função dos vacúolos em células vegetais é:",
    alternativas: [
      "Armazenar substâncias e manter o turgor",
      "Produzir energia",
      "Controlar a divisão celular",
      "Produzir proteínas"
    ],
    correta: 0
  }
];

// ===================== VARIÁVEIS DE ESTADO ===========================
let perguntasSelecionadas = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
let totalPerguntas = 0;
let modoEscuro = false;
let easterEggAtivo = false;
let easterEggClicks = [];
let temaSecreto = false;

// Mensagens motivacionais
const motivacionais = [
  "Você está indo bem!",
  "Continue assim!",
  "Ótimo progresso!",
  "Faltam poucas perguntas!",
  "Mantenha o foco!",
  "Quase lá!"
];

// =================== ELEMENTOS DOM PRINCIPAIS ================================
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const finalScreen = document.getElementById('final-screen');
const btnFacil = document.getElementById('btn-facil');
const btnDificil = document.getElementById('btn-dificil');
const reiniciarBtn = document.getElementById('reiniciar-btn');

const perguntaEl = document.getElementById('pergunta');
const alternativasEl = document.getElementById('alternativas');
const barraProgresso = document.getElementById('barra-progresso');
const contadorPerguntas = document.getElementById('contador-perguntas');
const mensagemMotivacional = document.getElementById('mensagem-motivacional');
const ajudaBtn = document.getElementById('ajuda-btn');
const notification = document.getElementById('notification');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const logo = document.getElementById('logo');

// ================== FUNÇÕES UTILITÁRIAS ======================================
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getMotivacional() {
  const restante = totalPerguntas - indicePerguntaAtual;
  if (restante === 0) return "";
  if (restante === 1) return "Última pergunta!";
  if (restante <= 3) return motivacionais[3];
  if (restante <= 5) return motivacionais[2];
  if (indicePerguntaAtual < 3) return motivacionais[0];
  return motivacionais[1];
}

let notificacaoTimeout = null;
function mostrarNotificacao(msg) {
  clearTimeout(notificacaoTimeout);
  notification.textContent = msg;
  notification.classList.add('ativa');
  notificacaoTimeout = setTimeout(() => {
    notification.classList.remove('ativa');
  }, 2700);
}

// ==================== FLUXO PRINCIPAL DO QUIZ ===============================
function iniciarQuiz(qtd) {
  pontuacao = 0;
  indicePerguntaAtual = 0;
  easterEggAtivo = false;
  easterEggClicks = [];
  temaSecreto = false;
  document.body.classList.remove('secreto');
  perguntasSelecionadas = embaralharArray([...perguntasQuiz]).slice(0, qtd);
  totalPerguntas = qtd;
  startScreen.style.display = 'none';
  finalScreen.style.display = 'none';
  quizScreen.style.display = 'flex';
  mostrarPergunta();
  atualizarBarra();
}

function mostrarPergunta() {
  const atual = perguntasSelecionadas[indicePerguntaAtual];
  perguntaEl.textContent = atual.pergunta;
  perguntaEl.style.textAlign = "center";
  alternativasEl.innerHTML = '';
  atual.alternativas.forEach((alt, i) => {
    const btn = document.createElement('button');
    btn.className = 'alternativa-btn';
    btn.textContent = alt;
    btn.style.textAlign = "center";
    btn.tabIndex = 0;
    btn.onclick = () => responder(i, btn);
    alternativasEl.appendChild(btn);
  });
  atualizarBarra();
}

function responder(indice, btn) {
  if (alternativasEl.querySelector('.correta, .errada')) return;
  const atual = perguntasSelecionadas[indicePerguntaAtual];
  const correta = indice === atual.correta;
  if (correta) {
    btn.classList.add('correta');
  } else {
    btn.classList.add('errada');
    setTimeout(() => {
      alternativasEl.children[atual.correta].classList.add('correta');
    }, 180);
  }
  if (correta) pontuacao++;
  setTimeout(() => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual >= totalPerguntas) {
      mostrarResultado();
    } else {
      mostrarPergunta();
    }
  }, 900);
}

function mostrarResultado() {
  quizScreen.style.display = 'none';
  finalScreen.style.display = 'flex';
  const mensagemFinal = document.getElementById('mensagem-final');
  let texto = `Você acertou <strong>${pontuacao}</strong> de <strong>${totalPerguntas}</strong> perguntas.<br/>`;
  if (pontuacao === totalPerguntas) texto += "Uau! Você é um(a) mestre em Biologia Celular!";
  else if (pontuacao >= totalPerguntas * 0.7) texto += "Excelente resultado! Parabéns!";
  else if (pontuacao >= totalPerguntas * 0.5) texto += "Bom desempenho, mas você pode melhorar!";
  else texto += "Não desanime, continue estudando e tente novamente!";
  mensagemFinal.innerHTML = texto;
}

function atualizarBarra() {
  const progresso = ((indicePerguntaAtual) / totalPerguntas) * 100;
  barraProgresso.style.width = `${progresso}%`;
  contadorPerguntas.textContent = `Pergunta ${indicePerguntaAtual + 1}/${totalPerguntas}`;
  mensagemMotivacional.textContent = getMotivacional();
}

function reiniciarQuiz() {
  startScreen.style.display = 'flex';
  finalScreen.style.display = 'none';
  quizScreen.style.display = 'none';
}

// ==================== AJUDA E NOTIFICAÇÕES ===================================
const ajudas = {
  quiz: "Clique na alternativa para responder. O quiz avança automaticamente e não é possível voltar perguntas. Use a barra de progresso e motivacionais para acompanhar seu desempenho!",
  start: "Escolha o nível de dificuldade para começar. Fácil: 10 perguntas. Difícil: 20 perguntas. Leia as instruções antes de iniciar!",
  final: "Parabéns! Veja seu resultado e clique em 'Voltar para Tela Inicial' para jogar novamente."
};

ajudaBtn.addEventListener('click', () => {
  mostrarNotificacao(ajudas.quiz);
});

// =================== TEMA CLARO/ESCURO & ESTRELAS ============================

function aplicarTema() {
  if (temaSecreto) return;
  if (modoEscuro) {
    document.body.classList.add('dark');
    // Lua SVG centralizada
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17.75 16.25c-3.45 0-6.25-2.8-6.25-6.25 0-2.41 1.38-4.51 3.39-5.55.55-.29.7-1.01.29-1.45-.37-.39-.98-.45-1.37-.11C9.02 6.16 7 9.36 7 13c0 4.42 3.58 8 8 8 3.64 0 6.84-2.02 7.86-5.31.14-.44-.13-.91-.58-1.04-1.04-.32-2.14-.49-3.28-.45.02 0 .02 0 0 0z" fill="#FFC107"/>
      </svg>
    `;
    desenharEstrelas();
  } else {
    document.body.classList.remove('dark');
    // Sol SVG centralizada
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="#FFD600"/>
        <g stroke="#FFD600" stroke-width="1.5" stroke-linecap="round">
          <line x1="12" y1="2" x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="5" y2="12"/>
          <line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        </g>
      </svg>
    `;
    removerEstrelas();
  }
}

themeToggle.addEventListener('click', () => {
  if (temaSecreto) return;
  modoEscuro = !modoEscuro;
  aplicarTema();
});

// Estrelas no fundo (modo escuro)
let canvasEstrelas = null;
let ctxEstrelas = null;
let estrelas = [];
function desenharEstrelas() {
  if (temaSecreto) return;
  if (!canvasEstrelas) {
    canvasEstrelas = document.createElement('canvas');
    canvasEstrelas.style.position = 'fixed';
    canvasEstrelas.style.top = '0';
    canvasEstrelas.style.left = '0';
    canvasEstrelas.style.width = '100vw';
    canvasEstrelas.style.height = '100vh';
    canvasEstrelas.style.pointerEvents = 'none';
    canvasEstrelas.style.zIndex = '0';
    canvasEstrelas.width = window.innerWidth;
    canvasEstrelas.height = window.innerHeight;
    document.body.appendChild(canvasEstrelas);
    ctxEstrelas = canvasEstrelas.getContext('2d');
    window.addEventListener('resize', () => {
      canvasEstrelas.width = window.innerWidth;
      canvasEstrelas.height = window.innerHeight;
    });
  }
  estrelas = [];
  for (let i = 0; i < 85; i++) {
    estrelas.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.5,
      brilho: Math.random() * 0.6 + 0.2,
      delta: Math.random() * 0.035 + 0.01,
      fase: Math.random() * Math.PI * 2
    });
  }
  function animar() {
    if (!modoEscuro || temaSecreto) { ctxEstrelas.clearRect(0,0,canvasEstrelas.width,canvasEstrelas.height); return; }
    ctxEstrelas.clearRect(0,0,canvasEstrelas.width,canvasEstrelas.height);
    for (let estrela of estrelas) {
      estrela.fase += estrela.delta;
      let op = estrela.brilho + Math.sin(estrela.fase) * 0.35;
      ctxEstrelas.beginPath();
      ctxEstrelas.arc(estrela.x, estrela.y, estrela.r, 0, 2 * Math.PI);
      ctxEstrelas.fillStyle = `rgba(255,255,255,${Math.max(0.09, op)})`;
      ctxEstrelas.shadowColor = "#fff";
      ctxEstrelas.shadowBlur = 5;
      ctxEstrelas.fill();
      ctxEstrelas.shadowBlur = 0;
    }
    requestAnimationFrame(animar);
  }
  animar();
}
function removerEstrelas() {
  if (canvasEstrelas) {
    canvasEstrelas.remove();
    canvasEstrelas = null;
    ctxEstrelas = null;
    estrelas = [];
  }
}

// ===================== EASTER EGG: TEMA SECRETO ==============================
logo.addEventListener('click', () => handleEasterEggClick());
logo.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") handleEasterEggClick();
});
function handleEasterEggClick() {
  const now = Date.now();
  easterEggClicks = easterEggClicks.filter(ts => now - ts < 1200);
  easterEggClicks.push(now);
  if (easterEggClicks.length >= 10 && !temaSecreto) {
    easterEggClicks = [];
    ativarTemaSecreto();
  }
}
function ativarTemaSecreto() {
  temaSecreto = true;
  document.body.classList.add('secreto');
  document.body.classList.remove('dark');
  removerEstrelas();
  themeIcon.innerHTML = "🎉";
  mostrarNotificacao("🎉 Tema secreto ativado! Aproveite o visual especial!");
  setTimeout(() => {
    mostrarNotificacao("Clique no botão de tema para voltar ao normal.");
  }, 2500);
}
themeToggle.addEventListener('click', () => {
  if (temaSecreto) {
    temaSecreto = false;
    document.body.classList.remove('secreto');
    aplicarTema();
    mostrarNotificacao("Tema padrão restaurado!");
  }
});

// ==================== EVENTOS PRINCIPAIS =====================================
btnFacil.addEventListener('click', () => iniciarQuiz(10));
btnDificil.addEventListener('click', () => iniciarQuiz(20));
reiniciarBtn.addEventListener('click', () => reiniciarQuiz());

startScreen.querySelector('.logo').addEventListener('dblclick', () => mostrarNotificacao(ajudas.start));
finalScreen.querySelector('.logo').addEventListener('dblclick', () => mostrarNotificacao(ajudas.final));

aplicarTema();
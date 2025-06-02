// Lista de perguntas do quiz. Cada obj tem a pergunta, as alternativas e qual é a certa (indice)
// TODO: Add mais perguntas? Ou um sistema pra carregar de um JSON? Fica pra proxima fase.
const quizQuestions = [
  {
    question: "Qual organela é responsável pela produção de energia na célula?",
    options: ["Retículo endoplasmático", "Mitocôndria", "Complexo de Golgi", "Lisossomo"],
    correctAnswerIndex: 1 // Mitocôndria é a certa
  },
  {
    question: "O que diferencia uma célula eucariótica de uma procariótica?",
    options: ["Presença de núcleo definido", "Presença de ribossomos", "Ausência de parede celular", "Capacidade fotossintética"],
    correctAnswerIndex: 0 // Núcleo definido!
  },
  // ... resto das perguntas, vou omitir pra nao ficar gigante aqui, mas a logica é a mesma
  {
    question: "O DNA das células está localizado principalmente em qual estrutura?",
    options: ["Lisossomo", "Mitocôndria", "Núcleo", "Retículo endoplasmático"],
    correctAnswerIndex: 2
  },
  {
    question: "Qual dessas NÃO é uma organela celular?",
    options: ["Cloroplasto", "Aparelho de Golgi", "Peroxissomo", "Celulose"],
    correctAnswerIndex: 3 // Celulose é componente da parede, nao organela
  },
  {
    question: "A função principal dos ribossomos é:",
    options: ["Produzir ATP", "Armazenar lipídios", "Sintetizar proteínas", "Fazer digestão intracelular"],
    correctAnswerIndex: 2
  },
  {
    question: "Qual dessas estruturas está presente em células vegetais, mas ausente em animais?",
    options: ["Mitocôndria", "Cloroplasto", "Ribossomo", "Lisossomo"],
    correctAnswerIndex: 1 // Cloroplasto, pra fotossintese
  },
  {
    question: "O que ocorre na fase G1 do ciclo celular?",
    options: ["Replicação do DNA", "Síntese de proteínas e crescimento", "Divisão celular", "Condensação dos cromossomos"],
    correctAnswerIndex: 1
  },
  {
    question: "O que são células-tronco?",
    options: ["Células especializadas do sangue", "Células que não possuem núcleo", "Células indiferenciadas com potencial de se diferenciar", "Células da epiderme"],
    correctAnswerIndex: 2
  },
  {
    question: "Qual organela faz a digestão intracelular?",
    options: ["Lisossomo", "Complexo de Golgi", "Peroxissomo", "Cloroplasto"],
    correctAnswerIndex: 0 // Lisossomos!
  },
  {
    question: "Em que estrutura ocorre a fotossíntese?",
    options: ["Mitocôndria", "Cloroplasto", "Retículo endoplasmático liso", "Núcleo"],
    correctAnswerIndex: 1
  },
  // Perguntas extras pro modo difícil
  {
    question: "O que caracteriza a membrana plasmática?",
    options: ["Ser composta por polissacarídeos", "Possuir dupla camada de fosfolipídios", "Ser rígida e impermeável", "Armazenar DNA"],
    correctAnswerIndex: 1
  },
  {
    question: "A principal função do Complexo de Golgi é:",
    options: ["Produzir energia", "Modificar, empacotar e transportar proteínas", "Fazer digestão intracelular", "Produzir ribossomos"],
    correctAnswerIndex: 1
  },
  {
    question: "Qual é a função dos peroxissomos?",
    options: ["Desintoxicação celular", "Produção de energia", "Armazenar água", "Produzir proteínas"],
    correctAnswerIndex: 0
  },
  {
    question: "O citoesqueleto é responsável por:",
    options: ["Armazenar nutrientes", "Dar forma e suporte à célula", "Produzir hormônios", "Fazer fotossíntese"],
    correctAnswerIndex: 1
  },
  {
    question: "A parede celular das células vegetais é composta principalmente por:",
    options: ["Celulose", "Quitina", "Glicogênio", "Peptidoglicano"],
    correctAnswerIndex: 0
  },
  {
    question: "Qual dessas NÃO é função da mitocôndria?",
    options: ["Produção de ATP", "Respiração celular", "Síntese de proteínas", "Metabolismo energético"],
    correctAnswerIndex: 2 // Mitocondria não faz sintese de proteinas diretamente (tem ribossomos proprios mas pra suas proteinas)
  },
  {
    question: "A meiose resulta em:",
    options: ["Células idênticas à original", "Células com metade do número de cromossomos", "Duplicação do DNA sem divisão", "Produção de proteínas"],
    correctAnswerIndex: 1 // Gametas!
  },
  {
    question: "Qual dessas estruturas está presente em todas as células?",
    options: ["Núcleo", "Cloroplasto", "Ribossomo", "Parede celular"],
    correctAnswerIndex: 2 // Ribossomos sao universais (proc e euc)
  },
  {
    question: "O núcleo é delimitado por:",
    options: ["Uma camada única de lipídios", "Parede celular", "Dupla membrana nuclear", "Retículo endoplasmático"],
    correctAnswerIndex: 2 // Carioteca
  },
  {
    question: "A principal função dos vacúolos em células vegetais é:",
    options: ["Armazenar substâncias e manter o turgor", "Produzir energia", "Controlar a divisão celular", "Produzir proteínas"],
    correctAnswerIndex: 0
  }
];

// VARIAVEIS GLOBAIS - pra controlar o estado do quiz
let selectedQuestions = []; // Array com as perguntas q vao pro quiz atual (embaralhadas e cortadas)
let currentQuestionIndex = 0; // Qual pergunta o usuario ta vendo
let score = 0; // Pontuacao
let totalQuestions = 0; // Total de perguntas no quiz atual (10 ou 20)
let isDarkMode = false; // O tema ta escuro ou claro?
let secretThemeClicks = []; // Array pra contar os cliques no titulo pro easter egg
let isSecretThemeActive = false; // O tema secreto ta ativo?

// Mensagens motivacionais - pra aparecerem embaixo da barra de progresso
const motivationalMessages = [
  "Você está indo bem!", "Continue assim!", "Ótimo progresso!",
  "Faltam poucas perguntas!", "Mantenha o foco!", "Quase lá!"
];

// PEGANDO OS ELEMENTOS DO HTML (DOM Elements) - guardando numa var pra usar dps. Tipo atalhos.
const initialScreenContainer = document.getElementById('initial-screen-container'); // Tela inicial
const quizInterfaceContainer = document.getElementById('quiz-interface-container'); // Tela do quiz
const resultsScreenContainer = document.getElementById('results-screen-container'); // Tela de resultados
const easyDifficultyButton = document.getElementById('easy-difficulty-button'); // Botao Facil
const hardDifficultyButton = document.getElementById('hard-difficulty-button'); // Botao Dificil
const restartQuizButton = document.getElementById('restart-quiz-button'); // Botao Reiniciar

const questionTextElement = document.getElementById('question-text'); // Onde o texto da pergunta aparece
const answerOptionsContainer = document.getElementById('answer-options-container'); // Div onde os botoes de alternativa entram
const progressBarValueElement = document.getElementById('progress-bar-value'); // A barrinha azul q cresce
const questionCounterDisplay = document.getElementById('question-counter-display'); // "Pergunta X/Y"
const motivationalMessageDisplay = document.getElementById('motivational-message-display'); // Onde a msg motivacional aparece
const helpButton = document.getElementById('help-button'); // Botao de ajuda (?)
const systemNotificationPanel = document.getElementById('system-notification-panel'); // A caixa de notificacao flutuante
const themeSwitcherButton = document.getElementById('theme-switcher-button'); // Botao de trocar tema (sol/lua)
const themeSwitcherIconContainer = document.getElementById('theme-switcher-icon-container'); // Onde o icone do tema (SVG) fica
const appHeaderTitle = document.getElementById('app-header-title'); // O titulo principal (pra detectar cliques do easter egg)

// FUNCOES UTILITARIAS - coisas q ajudam em varios lugares

// Funcao pra embaralhar um array (Fisher-Yates shuffle). Copiei da net, mas entendi como funciona! hehe
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de lugar
  }
  return array;
}

// Pega uma msg motivacional aleatoria ou especifica dependendo de qtas perguntas faltam
function getMotivationalMessage() {
  const remaining = totalQuestions - currentQuestionIndex;
  if (remaining === 0) return ""; // Nenhuma qd acaba
  if (remaining === 1) return "Última pergunta!"; // Especial pra ultima
  // Logica simples pra pegar uma msg da lista
  if (remaining <= 3) return motivationalMessages[3];
  if (remaining <= 5) return motivationalMessages[2];
  if (currentQuestionIndex < 3) return motivationalMessages[0];
  return motivationalMessages[1]; // Padrao
}

// Mostra uma notificacao flutuante
let notificationTimeout = null; // Pra controlar o tempo q a notificacao fica na tela
function showNotification(message) {
  clearTimeout(notificationTimeout); // Se ja tiver uma, cancela o sumico dela
  systemNotificationPanel.textContent = message; // Poe o texto na div
  systemNotificationPanel.classList.add('active'); // Add a classe pra ela aparecer (CSS faz a animacao)
  // Faz a notificacao sumir dps de um tempo
  notificationTimeout = setTimeout(() => {
    systemNotificationPanel.classList.remove('active');
  }, 2700); // 2.7 segundos. Tempo bom pra ler.
}

// LOGICA PRINCIPAL DO QUIZ

// Funcao pra INICIAR o quiz (chamada qd clica em Facil/Dificil)
function startQuiz(numberOfQuestions) {
  score = 0; // Zera pontuacao
  currentQuestionIndex = 0; // Volta pra primeira pergunta
  secretThemeClicks = []; // Zera cliques do easter egg
  isSecretThemeActive = false; // Desativa tema secreto se tiver
  document.body.classList.remove('secret-theme'); // Remove a classe do body tb

  // Pega todas as perguntas, embaralha, e corta o numero q a gente quer (10 ou 20)
  selectedQuestions = shuffleArray([...quizQuestions]).slice(0, numberOfQuestions);
  totalQuestions = numberOfQuestions; // Guarda o total de perguntas pro quiz atual

  // Esconde tela inicial e de resultados, mostra a tela do quiz
  initialScreenContainer.style.display = 'none';
  resultsScreenContainer.style.display = 'none';
  quizInterfaceContainer.style.display = 'flex'; // flex pq no CSS ta assim

  displayQuestion(); // Mostra a primeira pergunta
  updateProgressBar(); // Atualiza a barra de progresso (vai estar em 0%)
}

// Mostra a pergunta atual e as alternativas na tela
function displayQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex]; // Pega a pergunta atual do array
  questionTextElement.textContent = currentQuestion.question; // Poe o texto da pergunta no H2
  questionTextElement.style.textAlign = "center"; // Centraliza (ja ta no CSS mas vai q)

  answerOptionsContainer.innerHTML = ''; // Limpa as alternativas anteriores! Importante!

  // Cria um botao pra cada alternativa da pergunta atual
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button'); // Cria o elemento <button>
    button.className = 'answer-option-button'; // Add a classe do CSS pra estilizar
    button.textContent = option; // Texto do botao = texto da alternativa
    button.style.textAlign = "center"; // De novo, redundancia talvez
    button.tabIndex = 0; // Pra poder focar com Tab
    // Qd o botao é clicado, chama a func handleAnswer, passando o indice da alternativa e o proprio botao
    button.onclick = () => handleAnswer(index, button);
    answerOptionsContainer.appendChild(button); // Add o botao na div de alternativas
  });
  updateProgressBar(); // Atualiza contador "Pergunta X/Y" e msg motivacional
}

// Funcao chamada qd o usuario clica numa alternativa
function handleAnswer(selectedIndex, buttonElement) {
  // Se ja tiver uma alternativa marcada como correta/errada (evitar cliques duplos rapidos)
  if (answerOptionsContainer.querySelector('.correct-answer, .incorrect-answer')) return;

  const currentQuestion = selectedQuestions[currentQuestionIndex]; // Pega a pergunta atual
  const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex; // Verifica se acertou

  if (isCorrect) {
    buttonElement.classList.add('correct-answer'); // Marca o botao clicado como certo (verde)
  } else {
    buttonElement.classList.add('incorrect-answer'); // Marca como errado (vermelho)
    // Mostra qual era a certa dps de um tempinho (180ms)
    setTimeout(() => {
      // Pega o botao da alternativa correta e marca ele
      answerOptionsContainer.children[currentQuestion.correctAnswerIndex].classList.add('correct-answer');
    }, 180);
  }

  if (isCorrect) score++; // Se acertou, aumenta a pontuacao

  // Espera um pouco (900ms) antes de ir pra proxima pergunta ou resultado
  // Pra dar tempo do usuario ver o feedback (verde/vermelho)
  setTimeout(() => {
    currentQuestionIndex++; // Avanca pra proxima pergunta
    if (currentQuestionIndex >= totalQuestions) { // Se ja respondeu todas...
      showResults(); // Mostra a tela de resultados
    } else { // Senao...
      displayQuestion(); // Mostra a proxima pergunta
    }
  }, 900); // TODO: esse tempo de 900ms ta bom? testar dps
}

// Mostra a tela de RESULTADOS FINAIS
function showResults() {
  quizInterfaceContainer.style.display = 'none'; // Esconde tela do quiz
  resultsScreenContainer.style.display = 'flex'; // Mostra tela de resultados

  const finalScoreMessage = document.getElementById('final-score-message'); // Pega o <p> do resultado
  // Monta a msg final com a pontuacao
  let messageText = `Você acertou <strong>${score}</strong> de <strong>${totalQuestions}</strong> perguntas.<br/>`;
  // Msg extra dependendo da pontuacao
  if (score === totalQuestions) messageText += "Uau! Você é um(a) mestre em Biologia Celular!";
  else if (score >= totalQuestions * 0.7) messageText += "Excelente resultado! Parabéns!";
  else if (score >= totalQuestions * 0.5) messageText += "Bom desempenho, mas você pode melhorar!";
  else messageText += "Não desanime, continue estudando e tente novamente!";
  finalScoreMessage.innerHTML = messageText; // Poe a msg no <p> (innerHTML pq tem <strong>)
}

// ATUALIZA a barra de progresso e os textos relacionados (contador, msg motivacional)
function updateProgressBar() {
  // Calcula a porcentagem de progresso (pergunta atual / total)
  // currentQuestionIndex comeca em 0, entao +1 pra barra nao ficar zerada na primeira pergunta se quiser mostrar progresso da pergunta 1
  // Mas aqui a barra representa as *completas*, entao currentQuestionIndex (0-indexed) é o numero de completas.
  const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;
  progressBarValueElement.style.width = `${progressPercentage}%`; // Define a largura da barra azul

  // Atualiza o texto "Pergunta X/Y" (currentQuestionIndex é 0-indexed, entao +1 pra mostrar pro usuario)
  questionCounterDisplay.textContent = `Pergunta ${currentQuestionIndex + 1}/${totalQuestions}`;
  motivationalMessageDisplay.textContent = getMotivationalMessage(); // Poe a msg motivacional
}

// Funcao pra REINICIAR o quiz (chamada pelo botao "Voltar para Tela Inicial")
function resetQuiz() {
  initialScreenContainer.style.display = 'flex'; // Mostra tela inicial
  resultsScreenContainer.style.display = 'none'; // Esconde resultados
  quizInterfaceContainer.style.display = 'none'; // Esconde tela do quiz
  // As vars (score, etc) vao ser resetadas qd startQuiz for chamado de novo
}

// MENSAGENS DE AJUDA - um objeto com as msgs pra cada tela/contexto
const helpMessages = {
  quiz: "Clique na alternativa para responder. O quiz avança automaticamente e não é possível voltar perguntas. Use a barra de progresso e motivacionais para acompanhar seu desempenho!",
  start: "Escolha o nível de dificuldade para começar. Fácil: 10 perguntas. Difícil: 20 perguntas. Leia as instruções antes de iniciar!",
  final: "Parabéns! Veja seu resultado e clique em 'Voltar para Tela Inicial' para jogar novamente."
};

// Evento do botao de AJUDA (?)
helpButton.addEventListener('click', () => {
  showNotification(helpMessages.quiz); // Mostra a msg de ajuda da tela do quiz
});

// LOGICA DO TEMA (CLARO/ESCURO) E ESTRELAS (efeitinho visual)

// Aplica o tema (claro ou escuro) e desenha/remove estrelas
function applyTheme() {
  if (isSecretThemeActive) return; // Se o tema secreto ta ativo, nao faz nada aqui

  if (isDarkMode) { // Se for pra por tema escuro...
    document.body.classList.add('dark-theme'); // Add classe no body (CSS cuida do resto)
    // SVG da LUA pro botao de tema
    themeSwitcherIconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17.75 16.25c-3.45 0-6.25-2.8-6.25-6.25 0-2.41 1.38-4.51 3.39-5.55.55-.29.7-1.01.29-1.45-.37-.39-.98-.45-1.37-.11C9.02 6.16 7 9.36 7 13c0 4.42 3.58 8 8 8 3.64 0 6.84-2.02 7.86-5.31.14-.44-.13-.91-.58-1.04-1.04-.32-2.14-.49-3.28-.45.02 0 .02 0 0 0z" fill="#FFC107"/>
      </svg>
    `; // Esse SVG é meio chatinho de por aqui, mas é o jeito.
    drawStars(); // Chama a func pra desenhar as estrelas animadas
  } else { // Senao (tema claro)...
    document.body.classList.remove('dark-theme'); // Tira a classe do tema escuro
    // SVG do SOL pro botao de tema
    themeSwitcherIconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="#FFD600"/>
        <g stroke="#FFD600" stroke-width="1.5" stroke-linecap="round">
          <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        </g>
      </svg>
    `;
    removeStars(); // Tira as estrelas da tela
  }
}

// Evento do botao de TROCAR TEMA
themeSwitcherButton.addEventListener('click', () => {
  if (isSecretThemeActive) { // Se o tema secreto estiver ativo, clicar aqui desativa ele
    isSecretThemeActive = false;
    document.body.classList.remove('secret-theme');
    applyTheme(); // Volta pro tema normal (claro ou escuro, dependendo do isDarkMode)
    showNotification("Tema padrão restaurado!");
    return; // Para a execucao aqui
  }
  // Senao, só alterna o tema normal
  isDarkMode = !isDarkMode; // Inverte o valor (true vira false, false vira true)
  applyTheme(); // Aplica o novo tema
});

// Logica das ESTRELAS ANIMADAS (pro tema escuro) - usando Canvas API
let starsCanvas = null; // O elemento <canvas>
let starsContext = null; // O contexto 2D do canvas (pra desenhar)
let starsArray = []; // Array com as infos de cada estrela (posicao, tamanho, brilho)

function drawStars() {
  if (isSecretThemeActive) return; // Nao desenha estrelas no tema secreto
  if (!starsCanvas) { // Se o canvas ainda nao existe, cria ele
    starsCanvas = document.createElement('canvas');
    // Estilos pro canvas ficar no fundo, ocupando tudo e sem atrapalhar cliques
    starsCanvas.style.position = 'fixed'; starsCanvas.style.top = '0'; starsCanvas.style.left = '0';
    starsCanvas.style.width = '100vw'; starsCanvas.style.height = '100vh';
    starsCanvas.style.pointerEvents = 'none'; starsCanvas.style.zIndex = '0'; // Fica bem atras
    starsCanvas.width = window.innerWidth; starsCanvas.height = window.innerHeight; // Tamanho do canvas = tamanho da tela
    document.body.appendChild(starsCanvas); // Add o canvas no body
    starsContext = starsCanvas.getContext('2d'); // Pega o contexto pra desenhar

    // Se redimensionar a janela, atualiza o tamanho do canvas tb
    window.addEventListener('resize', () => {
      if (starsCanvas) { // So se o canvas ainda existir
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
      }
    });
  }
  starsArray = []; // Limpa o array de estrelas (pra caso ja existissem)
  // Cria 85 estrelas com posicoes, tamanhos e brilhos aleatorios
  for (let i = 0; i < 85; i++) {
    starsArray.push({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.5, // Raio da estrela
      brightness: Math.random() * 0.6 + 0.2, // Brilho base
      delta: Math.random() * 0.035 + 0.01, // Velocidade da animacao de brilho
      phase: Math.random() * Math.PI * 2 // Fase inicial da animacao de brilho (senoide)
    });
  }
  // Funcao de animacao (loop) pras estrelas
  function animateStars() {
    // Se nao for tema escuro, ou se for tema secreto, ou se o contexto sumiu, para a animacao e limpa
    if (!isDarkMode || isSecretThemeActive || !starsContext) {
      if (starsContext) starsContext.clearRect(0,0,starsCanvas.width,starsCanvas.height); // Limpa o canvas
      return; // Para o loop
    }
    starsContext.clearRect(0,0,starsCanvas.width,starsCanvas.height); // Limpa o canvas a cada frame
    for (let star of starsArray) { // Desenha cada estrela
      star.phase += star.delta; // Atualiza a fase da animacao de brilho
      let opacity = star.brightness + Math.sin(star.phase) * 0.35; // Calcula a opacidade (brilho pulsante)
      starsContext.beginPath();
      starsContext.arc(star.x, star.y, star.r, 0, 2 * Math.PI); // Desenha o circulo da estrela
      starsContext.fillStyle = `rgba(255,255,255,${Math.max(0.09, opacity)})`; // Cor branca com opacidade variavel
      starsContext.shadowColor = "#fff"; starsContext.shadowBlur = 5; // Efeito de brilho com sombra
      starsContext.fill();
      starsContext.shadowBlur = 0; // Reseta a sombra pra proxima estrela
    }
    requestAnimationFrame(animateStars); // Pede pro navegador chamar animateStars de novo no proximo frame (loop)
  }
  animateStars(); // Comeca a animacao
}
function removeStars() { // Tira o canvas das estrelas da tela
  if (starsCanvas) {
    starsCanvas.remove(); // Remove o elemento do DOM
    starsCanvas = null; // Limpa as variaveis
    starsContext = null;
    starsArray = [];
  }
}

// EASTER EGG: TEMA SECRETO (ativado com 10 cliques rapidos no titulo)
// Evento de clique no TITULO PRINCIPAL (pra ativar o easter egg)
appHeaderTitle.addEventListener('click', () => handleSecretThemeClick());
// E tb com Enter ou Espaco se tiver focado (acessibilidade)
appHeaderTitle.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") handleSecretThemeClick();
});

function handleSecretThemeClick() { // Gerencia os cliques pro easter egg
  const now = Date.now(); // Pega o tempo atual em milissegundos
  // Filtra os cliques antigos (mais de 1.2s atras)
  secretThemeClicks = secretThemeClicks.filter(timestamp => now - timestamp < 1200);
  secretThemeClicks.push(now); // Add o clique atual
  // Se tiver 10 ou mais cliques rapidos e o tema secreto NAO estiver ativo...
  if (secretThemeClicks.length >= 10 && !isSecretThemeActive) {
    secretThemeClicks = []; // Zera os cliques pra nao reativar sem querer
    activateSecretTheme(); // Ativa o tema!
  }
}

function activateSecretTheme() {
  isSecretThemeActive = true; // Marca como ativo
  document.body.classList.add('secret-theme'); // Add classe no body (CSS cuida do visual)
  document.body.classList.remove('dark-theme'); // Tira o tema escuro se tiver
  removeStars(); // Tira as estrelas normais
  themeSwitcherIconContainer.innerHTML = "🎉"; // Poe um emoji de festa no botao de tema
  showNotification("🎉 Tema secreto ativado! Aproveite o visual especial!");
  // Mostra outra notificacao dps de um tempo explicando como sair
  setTimeout(() => {
    showNotification("Clique no botão de tema para voltar ao normal.");
  }, 2500);
}
// O listener do themeSwitcherButton ja cuida de desativar o tema secreto (adicionei la em cima)

// EVENTOS PRINCIPAIS DOS BOTOES DE DIFICULDADE E REINICIAR
easyDifficultyButton.addEventListener('click', () => startQuiz(10)); // Facil = 10 perguntas
hardDifficultyButton.addEventListener('click', () => startQuiz(20)); // Dificil = 20 perguntas
restartQuizButton.addEventListener('click', () => resetQuiz()); // Reiniciar

// Adiciona listeners de double click nos titulos das telas inicial e final pra mostrar ajuda (opcional, mas legal)
// Como o ID 'logo' mudou pra 'app-header-title' e a classe 'logo' pra 'app-title', preciso pegar eles certo.
// O appHeaderTitle (ID) ja tem o listener pro easter egg.
// Para os outros (que sao por classe nos containers):
initialScreenContainer.querySelector('.app-title').addEventListener('dblclick', () => showNotification(helpMessages.start));
resultsScreenContainer.querySelector('.app-title').addEventListener('dblclick', () => showNotification(helpMessages.final));
// TODO: esses dblclick sao meio escondidos, talvez um icone de 'i' (info) fosse melhor?


// INICIALIZACAO - chama applyTheme pra por o tema (claro por padrao) e os icones corretos
applyTheme();
// Fim do JS. Ufa, comentar tudo da um trabalhinho, mas ajuda a entender dps!

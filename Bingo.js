// Função para gerar números aleatórios sem repetições dentro de um intervalo
function gerarNumerosAleatorios(min, max, quantidade) {
  var numeros = new Set();

  while (numeros.size < quantidade) {
    var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(numero);
  }

  return Array.from(numeros);
}

// Função para criar uma nova tabela de cartela
function criarCartela(nomeJogador) {
  var tabela = document.createElement('table');

  var colunas = ['B', 'I', 'N', 'G', 'O'];
  var numerosColunas = [
    gerarNumerosAleatorios(1, 15, 5),
    gerarNumerosAleatorios(16, 30, 5),
    gerarNumerosAleatorios(31, 45, 5),
    gerarNumerosAleatorios(46, 60, 5),
    gerarNumerosAleatorios(61, 75, 5)
  ];

  // Cabeçalho da tabela
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  colunas.forEach(function(coluna) {
    var th = document.createElement('th');
    th.textContent = coluna;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  tabela.appendChild(thead);

  // Corpo da tabela
  var tbody = document.createElement('tbody');
  for (var i = 0; i < 5; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 5; j++) {
      var td = document.createElement('td');
      if (j === 2 && i === 2) {
        td.textContent = 'X'; // Célula central marcada com 'X'
      } else {
        td.textContent = numerosColunas[j][i];
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tabela.appendChild(tbody);

  // Div para exibir a tabela de cartela
  var divCartelas = document.querySelector('.area_cartelas .body_cartelas');
  
  // Remover tabela de exemplo, se existir
  var tabelaExemplo = divCartelas.querySelector('.cartela-exemplo');
  if (tabelaExemplo) {
    divCartelas.removeChild(tabelaExemplo);
  }

  // Criar div para a nova tabela de cartela
  var divCartela = document.createElement('div');
  divCartela.className = 'cartela';
  
  // Exibir o nome do jogador
  var nomeJogadorElement = document.createElement('h4');
  nomeJogadorElement.textContent = nomeJogador;
  divCartela.appendChild(nomeJogadorElement);
  
  divCartela.appendChild(tabela);
  divCartelas.appendChild(divCartela);
}

// Função para gerar uma nova tabela de cartela
function gerarCartela() {
  var nomeJogador = prompt("Digite o nome do jogador:");
  if (nomeJogador === null || nomeJogador === "") {
    return; // Se o nome do jogador não for inserido, a função será interrompida
  }

  criarCartela(nomeJogador);
}

var numerosSorteados = [];
var numeroAtual = 1;

function jogar() {
  var intervalo = setInterval(function() {
    var numeroSorteado = gerarNumeroAleatorio();
    numerosSorteados.push(numeroSorteado);
    exibirNumeroSorteado(numeroSorteado);
    marcarCartelaSorteada(numeroSorteado);

    if (numeroAtual === 75) {
      clearInterval(intervalo);
    }

    numeroAtual++;
  }, 400);
}

function exibirNumeroSorteado(numeroSorteado) {
  var bodyNumeros = document.querySelector('.body_numeros');
  var numeroElemento = document.createElement('span');
  numeroElemento.textContent = numeroSorteado + ' '; // Adiciona um espaço após o número
  bodyNumeros.appendChild(numeroElemento);
}


function marcarCartelaSorteada(numeroSorteado) {
  var cartelas = document.querySelectorAll('.cartela');

  cartelas.forEach(function(cartela) {
    var celulas = cartela.getElementsByTagName('td');

    for (var i = 0; i < celulas.length; i++) {
      var numero = parseInt(celulas[i].innerText);
      if (numero === numeroSorteado) {
        celulas[i].classList.add('marcado');
      }
    }
  });
}

function gerarNumeroAleatorio() {
  var min = 1;
  var max = 75;
  var numero = Math.floor(Math.random() * (max - min + 1)) + min;
  return numero;
}

function reiniciarJogo() {
  // Limpar as tabelas
  var bodyCartelas = document.querySelector('.body_cartelas');
  bodyCartelas.innerHTML = '';

  // Limpar os números sorteados
  var bodyNumeros = document.querySelector('.body_numeros');
  bodyNumeros.innerHTML = '';
}

// Função para marcar um número sorteado na tabela da cartela
function marcarNumero(numero) {
  var celulas = document.querySelectorAll('.cartela td');
  celulas.forEach(function(celula) {
    if (celula.textContent === numero) {
      celula.classList.add('marcado');
    }
  });

  // Verificar se algum jogador ganhou
  var cartelas = document.querySelectorAll('.cartela');
  var ganhadores = [];
  cartelas.forEach(function(cartela) {
    var linhas = cartela.querySelectorAll('tr');
    var colunas = cartela.querySelectorAll('td');
    var vitoria = false;

    // Verificar se alguma linha tem 5 células marcadas em sequência
    linhas.forEach(function(linha) {
      var marcadasLinha = 0;
      var celulasLinha = linha.querySelectorAll('td');
      celulasLinha.forEach(function(celula) {
        if (celula.classList.contains('marcado')) {
          marcadasLinha++;
        }
      });
      if (marcadasLinha === 5) {
        vitoria = true;
      }
    });

    // Verificar se alguma coluna tem 5 células marcadas em sequência
    for (var i = 0; i < 5; i++) {
      var marcadasColuna = 0;
      for (var j = 0; j < 5; j++) {
        if (colunas[i + j * 5].classList.contains('marcado')) {
          marcadasColuna++;
        }
      }
      if (marcadasColuna === 5) {
        vitoria = true;
      }
    }

    if (vitoria) {
      var nomeJogador = cartela.querySelector('h4').textContent;
      ganhadores.push(nomeJogador);
    }
  });

  // Exibir indicação na tela
  var vencedoresDiv = document.getElementById('vencedores');
  if (ganhadores.length > 0) {
    vencedoresDiv.textContent = 'Jogador(es) ganhador(es): ' + ganhadores.join(', ');
  } else {
    vencedoresDiv.textContent = '';
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  var celulas = document.querySelectorAll('.cartela td');
  celulas.forEach(function(celula) {
    celula.classList.remove('marcado');
  });

  var vencedoresDiv = document.getElementById('vencedores');
  vencedoresDiv.textContent = '';
}

function reiniciarJogo() {
  var cartelas = document.querySelectorAll('.cartela');
  cartelas.forEach(function(cartela) {
    cartela.remove();
  });

  var numerosSorteadosDiv = document.querySelector('.body_numeros');
  numerosSorteadosDiv.innerHTML = '';
}







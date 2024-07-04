// Array com os caminhos das imagens dos banners
var banners = ["img/atencao.png", "img/atencao2.png"];
// Variável que controla o índice do banner atual
var bannerAtual = 0;

// Função que valida o campo de busca
function validaBusca() {
    // Verifica se o campo de busca está vazio
    if (document.querySelector('#q').value == '') {
        // Se estiver vazio, exibe um alerta ao usuário
        alert('Não podia ter deixado em branco a busca!');
        // Retorna falso para evitar o envio do formulário
        return false;
    }
}

// Associa a função validaBusca ao evento de envio do formulário
document.querySelector('#form-busca').onsubmit = validaBusca;

// Função que troca o banner exibido no carrossel
function trocaBanner() {
    // Atualiza o índice do banner atual, garantindo que seja circular
    bannerAtual = (bannerAtual + 1) % 2;
    // Atualiza a imagem do banner no elemento HTML correspondente
    document.querySelector('.destaque img').src = banners[bannerAtual];
}

// Seleciona os elementos de controle de pausa e play do carrossel
var controle2 = document.querySelector('.play');
var controle = document.querySelector('.pause');

// Inicia o carrossel automaticamente, trocando os banners a cada 1 segundo
var timer = setInterval(trocaBanner, 1000);

// Evento ao clicar no botão de pausa do carrossel
controle.onclick = function () {
    // Verifica se o carrossel está pausado
    if (controle.className == 'pause') {
        // Se estiver pausado, interrompe o timer para pausar o carrossel
        clearInterval(timer);
        // Altera a classe do botão de pausa para o botão de play
        controle2.className == 'play';
    } else {
        // Se não estiver pausado, apenas altera a classe do botão de play
        controle2.className = 'play';
    }
    // Retorna falso para impedir a ação padrão do elemento
    return false;
};

// Evento ao clicar no botão de play do carrossel
controle2.onclick = function () {
    // Verifica se o carrossel está em pausa
    if (controle2.className == 'play') {
        // Se estiver em pausa, reinicia o timer para retomar o carrossel
        timer = setInterval(trocaBanner, 1000);
        // Altera a classe do botão de play para refletir o estado
        controle2.className = 'play';
    }
};

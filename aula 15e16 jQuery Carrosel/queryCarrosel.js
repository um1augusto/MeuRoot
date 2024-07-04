$(document).ready(function() {
    // Variável para controlar o índice da imagem atual no carrossel
    let currentIndex = 0;

    // Seleciona todas as imagens dentro da div com classe 'imagem'
    const images = $('.imagem');

    // Obtém o número total de imagens no carrossel
    const imageCount = images.length;

    // Obtém a largura do contêiner do carrossel
    const containerWidth = $('.container-carrosel').width();

    // Função para exibir uma imagem com base no índice fornecido
    function showImage(index) {
        // Calcula o deslocamento horizontal para exibir a imagem desejada
        const newTransform = -index * containerWidth + 'px';

        // Aplica o transform CSS para mover as imagens horizontalmente
        $('.imagem-carrosel').css('transform', `translateX(${newTransform})`);
    }

    // Evento de clique para o botão 'Próximo'
    $('.next').click(function() {
        // Atualiza o índice da imagem para a próxima imagem no carrossel
        currentIndex = (currentIndex + 1) % imageCount;
        
        // Chama a função para exibir a imagem atualizada
        showImage(currentIndex);
    });

    // Evento de clique para o botão 'Anterior'
    $('.prev').click(function() {
        // Calcula o índice da imagem anterior no carrossel
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        
        // Chama a função para exibir a imagem atualizada
        showImage(currentIndex);
    });
});

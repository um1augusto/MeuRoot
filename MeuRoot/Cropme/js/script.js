$(document).ready(function() {
    $('#cropme').cropme({
      // Configurações opcionais do Cropme
      preview: '.cropme-preview',
      aspectRatio: 16 / 9,
      autoZoom: true,
      zoomText: 'Zoom',
      zoomElem: '.cropme-zoom'
    });
  
    $('#crop-button').click(function() {
      console.log('Clicou no botão'); // Verifique se o evento de clique está sendo capturado
      var imageData = $('#cropme').cropme('get');
      console.log(imageData); // Verifique se você está recebendo os dados da imagem
    });
  });
  
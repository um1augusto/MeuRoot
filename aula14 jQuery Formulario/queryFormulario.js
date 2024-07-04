// queryFormulario.js

$(document).ready(function() {
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Resetar erros
        $('.error').text('');

        // Obter valores do formulário
        let name = $('#name').val();
        let email = $('#email').val();
        let message = $('#message').val();

        // Validação de nome
        if (!name) {
            $('#nameError').text('Por favor, informe seu nome.');
            return; // Encerra a função sem enviar o formulário
        }

        // Validação de email
        if (!email) {
            $('#emailError').text('Por favor, informe seu email.');
            return; // Encerra a função sem enviar o formulário
        } else if (!isValidEmail(email)) {
            $('#emailError').text('Email inválido.');
            return; // Encerra a função sem enviar o formulário
        }

        // Validação de mensagem
        if (!message) {
            $('#messageError').text('Por favor, escreva uma mensagem.');
            return; // Encerra a função sem enviar o formulário
        }

        // Exibir os dados do formulário na área de confirmação
        $('#confirmationText').html(`
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong> ${message}</p>
        `);
        $('#confirmationMessage').slideDown(); // Mostra a área de confirmação
        $('#contactForm')[0].reset(); // Limpa o formulário

        // Função auxiliar para validar email
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    });
});

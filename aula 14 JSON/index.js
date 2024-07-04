// Utiliza fetch para carregar o arquivo JSON
fetch("./data.json")
    .then(response => response.json())  // Converte a resposta para JSON
    .then(data => {
        // Obtém o elemento <ul> onde os dados serão exibidos
        const dataList = document.getElementById('dataList');
        
        // Obtém a lista de pessoas do JSON
        const pessoas = data.pessoas;
        
        // Itera sobre cada pessoa e cria um <li> para cada uma
        for (let i = 0; i < pessoas.length; i++) {
            const pessoa = pessoas[i];
            const li = document.createElement('li');  // Cria um elemento <li>
            // Define o texto do <li> com informações da pessoa
            li.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, CPF: ${pessoa.cpf}, Telefone: ${pessoa.telefone}`;
            dataList.appendChild(li);  // Adiciona o <li> ao <ul>
        }
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));  // Captura e exibe erros


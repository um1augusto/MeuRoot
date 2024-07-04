// Utiliza fetch para carregar o arquivo JSON
fetch("./alunos.json")
    .then(response => response.json())  // Converte a resposta para JSON
    .then(data => {
        // Obtém o elemento <ul> onde os dados serão exibidos
        const dataList = document.getElementById('dataList');
        
        // Itera sobre os dados do JSON e cria <li> para cada disciplina
        for (let disciplina in data) {
            if (Object.hasOwnProperty.call(data, disciplina)) {
                const alunos = data[disciplina];  // Obtém a lista de alunos para a disciplina atual
                const li = document.createElement('li');  // Cria um elemento <li>
                li.textContent = `${disciplina}: ${alunos.join(', ')}`;  // Define o texto do <li>
                dataList.appendChild(li);  // Adiciona o <li> ao <ul>
            }
        }
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));  // Captura e exibe erros


const pokemonName = document.querySelector(".pokemon_name"); // Elemento para exibir o nome do Pokémon
const pokemonNumber = document.querySelector(".pokemon_number"); // Elemento para exibir o número do Pokémon
const pokemonImage = document.querySelector(".pokemon_image"); // Elemento para exibir a imagem do Pokémon
const pokemonWeight = document.querySelector('.pokemon_peso'); // Elemento para exibir o peso do Pokémon
const pokemonType = document.querySelector('.pokemon_tipo'); // Elemento para exibir o tipo do Pokémon
const pokemonSound = document.querySelector('.pokemon_sound'); // Elemento para exibir o som do Pokémon
const backgroundMusic = document.getElementById("background-music"); // Música de fundo da página
const form = document.querySelector(".form"); // Formulário de pesquisa
const input = document.querySelector(".input_search"); // Campo de entrada de pesquisa
const buttonPrev = document.querySelector(".btn-prev"); // Botão de navegação para o Pokémon anterior
const buttonNext = document.querySelector(".btn-next"); // Botão de navegação para o próximo Pokémon

let searchPokemon = 1; // Número inicial do Pokémon a ser exibido

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Requisição à API do Pokémon

  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); // Obtenção dos dados do Pokémon
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'; // Exibe "Loading..." enquanto os dados são carregados
  pokemonNumber.innerHTML = ''; // Limpa o número do Pokémon exibido

  const data = await fetchPokemon(pokemon); // Busca os dados do Pokémon

  if (data) {
    pokemonImage.style.display = 'block'; // Exibe a imagem do Pokémon
    pokemonName.innerHTML = data.name; // Exibe o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Exibe o número do Pokémon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Exibe a imagem animada do Pokémon
    input.value = ''; // Limpa o campo de pesquisa
    searchPokemon = data.id; // Atualiza o número do Pokémon exibido

    // Atualiza peso e tipo do Pokémon
    pokemonWeight.innerHTML = data.weight / 10 + ' kg'; // Peso em kg
    pokemonType.innerHTML = data.types.map(type => type.type.name).join(', '); // Tipo do Pokémon

    // Atualiza som do Pokémon
    pokemonSound.src = `https://pokemoncries.com/cries/${data.id}.mp3`; // Fonte do som do Pokémon
    pokemonSound.volume = 0.5;

  } else {
    pokemonImage.style.display = 'none'; // Esconde a imagem do Pokémon
    pokemonName.innerHTML = 'Not found :c'; // Exibe mensagem de erro se o Pokémon não for encontrado
    pokemonNumber.innerHTML = ''; // Limpa o número do Pokémon exibido
  }
}

// Event listener para o formulário de pesquisa
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário
  renderPokemon(input.value.toLowerCase()); // Renderiza o Pokémon baseado no valor do campo de pesquisa
});

// Event listener para o botão "Prev" (anterior)
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1; // Reduz o número do Pokémon atual
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Event listener para o botão "Next" (próximo)
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Aumenta o número do Pokémon atual
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

renderPokemon(searchPokemon); // Renderiza o Pokémon inicial ao carregar a página

backgroundMusic.volume = 0.1; // Define o volume da música de fundo
backgroundMusic.autoplay = true; // Inicia a música automaticamente
backgroundMusic.loop = true; // Faz a música de fundo repetir continuamente

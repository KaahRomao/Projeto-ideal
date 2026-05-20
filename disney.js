// variavel que guarda os dados da API
const url = "https://api.disneyapi.dev/character";
// variaveis que importam do HTML
const img = document.querySelector("img");
const button = document.querySelector("button");
const form = document.querySelector("form");
const input = document.querySelector("#guessCharacter");
//! variavel de array vazia para guardar os dados da API para quando a API responder
let personagens = [];
//! variavel que controla o indice exibido
let indiceAtual = 0;
// Criação de função assincrona para buscar dados do URL da API da Disney
async function getCharacter(url) {
  const dados = await (await fetch(url)).json();
  //console.table(dados);
  //! Chamamos a função para passar os dados para o filterCharacter
  filterCharacter(dados);
}
// Chama essa função para rodar os fetch
getCharacter(url);

// Função para filtrar os dados que queremos
function filterCharacter(dados) {
  // A variavel para guardar os dados do "dados.data" que são aonde os personagens estão dentro do link
  personagens = dados.data;
  // Chamamos a função para exibir o personagem no indice atual
  insertCharacter(personagens[indiceAtual]);
}
// função para inserir os dados no HTML
function insertCharacter(personagem) {
  //Criamos o objeto "personagem" e assim atualiza eles no HTML
  // os .join (", ") são porque aqueles espaços são arrays lá no URL da API.. dai serve para separar eles bonitinho, mesmo que já faça isso automaticamente
  img.src = personagem.imageUrl;
  document.querySelector("#id").textContent = personagem._id;
  document.querySelector("#name").textContent = personagem.name;
  document.querySelector("#film").textContent = personagem.films.join(", ");
  document.querySelector("#game").textContent =
    personagem.videoGames.join(", ");
}

//Funçãoo que para achar o personagem no Input
function findCharacter() {
  // Criamos uma variavel para guardar o valor do Input
  let valorInput = document.getElementById("guessCharacter").value;
  // A variavel "termoBusca" serve para tirar aqueles "%20" para pesquisar... e troca por espaços
  const termoBusca = encodeURIComponent(valorInput.trim());

  // Um if/else para saber se é number ou string para poder pesquisar por nome ou indice
  // O parâmetro (isNaN(valorinput)) verifica se é number ou não
  if (isNaN(valorInput)) {
    // A variavel "urlFind" coloca o url da API que busca por nome + o valor do input (que já está sem os caracteres que representa os espaços no navegador)
    const urlFind = "https://api.disneyapi.dev/character?name=" + termoBusca;
    // Função chamada para buscar o personagem de acordo com o parâmetro
    getCharacter(urlFind);
  } else {
    // Como o indice atual estava vazio, a gente preenche com o valor do input
    // Colocado o Number para transformar em "Number", porque se não tivesse, seria uma string, assim não funcionando
    indiceAtual = Number(valorInput);
    // Chama a função de inserir o personagem de acordo com o indice.
    insertCharacter(personagens[indiceAtual]);
  }
}
//Criação de evento para que o form não reinicie a cada clique no botão para buscar
form.addEventListener("submit", function (e) {
  e.preventDefault();
  findCharacter();
});

// modo dark depois

// Criação de eventos para avançar e voltar pelos indices
voltar.addEventListener("click", function () {
  indiceAtual--;
  insertCharacter(personagens[indiceAtual]);
});

avancar.addEventListener("click", function () {
  indiceAtual++;
  insertCharacter(personagens[indiceAtual]);
});

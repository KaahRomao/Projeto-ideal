// variavel que guarda os dados da API
const url = "https://api.disneyapi.dev/character";
// variaveis que importam do HTML
const image = document.querySelector("#images");
image.addEventListener("error", function () {
  console.log("entrou no error");
  image.src = "/assets/img/placeholder.png";
});
const button = document.querySelector("button");
const form = document.querySelector("form");
const input = document.querySelector("#guessCharacter");
const voltar = document.querySelector("#voltar");
const avancar = document.querySelector("#avancar");
//! variavel de array vazia para guardar os dados da API para quando a API responder
let personagens = [];
//! variavel que controla o indice exibido
let indiceAtual = 0;

// Criação de função assincrona para buscar dados do URL da API da Disney
async function getCharacter(url, indice = 0) {
  try {
    if (!url) throw new Error("A Api não foi achada!");
    const dadosDisney = await fetch(url);
    if (dadosDisney.ok === false)
      throw new Error("Fetch não buscou as informações!");
    const dados = await dadosDisney.json();
    if (!dados) throw new Error("Não foi transformada para .json");
    filterCharacter(dados, indice);
  } catch (error) {
    console.error(error);
    console.error("Algo deu errado, chefe!");
  }
}
// Chama essa função para rodar os fetch
getCharacter(url);

// Função para filtrar os dados que queremos
function filterCharacter(dados, indiceAtual = 0) {
  // A variavel para guardar os dados do "dados.data" que são aonde os personagens estão dentro do link
  personagens = dados.data;

  if (personagens.length === 0) {
    console.log("Personagem não encontrado!");
    clearDisplay("Personagem não encontrado!");
    return;
  }
  // Chamamos a função para exibir o personagem no indice atual
  insertCharacter(personagens[indiceAtual]);
}
// função para inserir os dados no HTML
function insertCharacter(personagem) {
  if (!personagem) {
    console.log("Personagem não encontrado!");
    clearDisplay("Personagem não encontrado!");
    return;
  }

  if (personagem.imageUrl) {
    image.src = personagem.imageUrl;
  } else {
    image.src = "./assets/img/placeholder.png";
  }

  //Criamos o objeto "personagem" e assim atualiza eles no HTML
  // os .join (", ") são porque aqueles espaços são arrays lá no URL da API.. dai serve para separar eles bonitinho, mesmo que já faça isso automaticamente
  document.querySelector("#id").textContent = indiceAtual;
  document.querySelector("#name").textContent = personagem.name;
  document.querySelector(".name").textContent = personagem.name;
  if (personagem.films && personagem.films.length > 0) {
    document.querySelector("#film").textContent = personagem.films.join(", ");
  } else {
    document.querySelector("#film").textContent = "Nenhum filme encontrado";
  }

  if (personagem.videoGames && personagem.videoGames.length > 0) {
    document.querySelector("#game").textContent =
      personagem.videoGames.join(", ");
  } else {
    document.querySelector("#game").textContent = "Nenhum jogo encontrado";
  }
}

function clearDisplay(mensagem) {
  image.src = "./assets/img/placeholder.png";
  document.querySelector(".name").textContent = mensagem;
  document.querySelector("#id").textContent = "";
  document.querySelector("#name").textContent = "";
  document.querySelector("#film").textContent = "";
  document.querySelector("#game").textContent = "";
  document.querySelector("#guessCharacter").value = "";

  setTimeout(function () {
    getCharacter(url);
  }, 3000);
}

//Funçãoo que para achar o personagem no Input
function findCharacter() {
  // Criamos uma variavel para guardar o valor do Input
  let valorInput = document.getElementById("guessCharacter").value;
  // A variavel "termoBusca" serve para tirar aqueles "%20" para pesquisar... e troca por espaços
  const termoBusca = encodeURIComponent(valorInput.trim());
  if (valorInput.trim() === "") {
    console.log("Personagem não encontrado!");
    clearDisplay("Personagem não encontrado!");
    return;
  }

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

    if (indiceAtual >= 0 && indiceAtual <= 49) {
      // Chama a função de inserir o personagem de acordo com o indice.
      insertCharacter(personagens[indiceAtual]);
    } else {
      console.log("personagem não encontrado");
      clearDisplay("Personagem não encontrado");
    }
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
  if (indiceAtual < 0) indiceAtual = 49;
  insertCharacter(personagens[indiceAtual]);
});

avancar.addEventListener("click", function () {
  indiceAtual++;
  if (indiceAtual > 49) indiceAtual = 0;
  insertCharacter(personagens[indiceAtual]);
});

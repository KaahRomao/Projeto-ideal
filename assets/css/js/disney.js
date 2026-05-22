const url = "https://api.disneyapi.dev/character";
const img = document.querySelector("img");
const form = document.querySelector("form");
const input = document.querySelector("#guessCharacter");

let personagens = [];
let indiceAtual = 0;
let paginaInfo = null;

async function getCharacter(url) {
  const dados = await (await fetch(url)).json();
  filterCharacter(dados);
}

getCharacter(url);

function filterCharacter(dados) {
  personagens = dados.data;
  paginaInfo = dados.info;
  insertCharacter(personagens[indiceAtual]);
}

function insertCharacter(personagem) {
  img.src = personagem.imageUrl;
  document.querySelector("#id").textContent = personagem._id;
  document.querySelector("#name").textContent = personagem.name;
  document.querySelector("#film").textContent = personagem.films.join(", ");
  document.querySelector("#game").textContent =
    personagem.videoGames.join(", ");
}

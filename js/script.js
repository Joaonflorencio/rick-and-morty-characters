const currentPage = 1;

function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      displayCharacters(data.results);
    })
    .catch(error => console.error('Error:', error));
}

function displayCharacters(characters) {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = ''; 
  characters.forEach(character => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p>Name: ${character.name}</p>
      <p>Species: ${character.species}</p>
    `;
    characterList.appendChild(li);
  });
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    fetchCharacters(currentPage);
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  currentPage += 1;
  fetchCharacters(currentPage);
});

fetchCharacters(currentPage);
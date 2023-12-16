const characterList = document.getElementById("character-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

let currentPage = 1;

// Función para obtener y mostrar personajes
function getRickAndMortyCharacters(page) {
fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
  .then((response) => response.json())
  .then((data) => {
      const characters = data.results;
      characterList.innerHTML = ''; // Limpiar la lista actual
      characters.forEach((character) => {
          const listItem = document.createElement("li");
          const characterImage = document.createElement("img");
          characterImage.src = character.image; // URL de la imagen
          characterImage.alt = character.name; // Texto alternativo de la imagen
          listItem.appendChild(characterImage);

          const characterInfo = document.createElement("div");
          characterInfo.classList.add("character-info");
          characterInfo.innerHTML = `
              <p><span>Name:</span> ${character.name}</p>
              <p><span>Species</span>: ${character.species}</p>
          `;
          listItem.appendChild(characterInfo);

          characterList.appendChild(listItem);
      });

      // Actualizar el número de página actual
      currentPage = page;
      updatePaginationButtons(data.info);
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
  });
}

// Función para actualizar los botones de paginación
function updatePaginationButtons(info) {
  if (currentPage > 1) {
      prevPageButton.disabled = false;
  } else {
      prevPageButton.disabled = true;
  }
  if (currentPage < info.pages) {
      nextPageButton.disabled = false;
  } else {
      nextPageButton.disabled = true;
  }
}

// Event listeners para los botones de paginación
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
      getRickAndMortyCharacters(currentPage - 1);
  }
});

nextPageButton.addEventListener("click", () => {
    getRickAndMortyCharacters(currentPage + 1);
});

// Llamar a la función para obtener y mostrar los personajes en la página 1
getRickAndMortyCharacters(currentPage);
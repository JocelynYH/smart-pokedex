window.addEventListener("load", highlightDom, false);

console.log('now running')
async function highlightDom() {
    console.log('running')

  await getPokedexData();
  console.log('got data')
    const visibleEncounters = Array.from(document.querySelector("h3 #Visible_encounters").parentElement.nextElementSibling.children[0].children);
    const randomEncounters = Array.from(document.querySelector("h3 #Random_encounters").parentElement.nextElementSibling.children[0].children);
    const wandering = Array.from(document.querySelector("h3 #Wanderers").parentElement.nextElementSibling.nextElementSibling.children[0].children)
    const allPokemonInArea = visibleEncounters.concat(randomEncounters.concat(wandering));

    console.log('all pokemons from bulbapedia', allPokemonInArea)

  chrome.storage.local.get(
    "pokedexData",
    function ({ pokedexData: allPokemon }) {
      const uncaught = getUncaughtPokemon(JSON.parse(allPokemon));
      console.log("uncaught pokemans", uncaught);
      console.log("all pokemon in area", allPokemonInArea)

      for (let i = 0; i < allPokemonInArea.length; i++) {
        const row = allPokemonInArea[i];

        // is a pokemon row
        if (row.childElementCount > 6) {
            let pokemonName = row.children[0].children[0].children[1].textContent;
            pokemonName = pokemonName
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
            console.log("bulbapedia mon", pokemonName);
            if (uncaught.indexOf(pokemonName) > -1)
            for (let cell of Array.from(row[i].children)) {
                cell.style.backgroundColor = 'grey' }
        }


        // drop enter symbol

        // if pokemon is caught, mark out the row
        
      }
    }
  );
}

function getPokedexData() {
  console.log("get pokedex data api running");
  return fetch("https://pokedextracker.com/api/captures?dex=169280")
    .then((r) => r.text())
    .then((result) => {
      chrome.storage.local.set({ pokedexData: result });
    });
}

function getUncaughtPokemon(pokedexData) {
  let uncaughtPokemonNames = [];

  for (let i = 0; i < pokedexData.length; i++) {
    const pokemon = pokedexData[i];
    if (!pokemon["captured"])
      uncaughtPokemonNames.push(pokemon["pokemon"]["name"].toLowerCase());
  }
  return uncaughtPokemonNames;
}

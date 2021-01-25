window.addEventListener("load", highlightDom, false);

console.log("now running");
async function highlightDom() {
  console.log("running");

  await getPokedexData();
  console.log("got data");
  const visibleEncounters = Array.from(
    document.querySelector("h3 #Visible_encounters").parentElement
      .nextElementSibling.children[0].children
  );
  const randomEncounters = Array.from(
    document.querySelector("h3 #Random_encounters").parentElement
      .nextElementSibling.children[0].children
  );
  const wandering = Array.from(
    document.querySelector("h3 #Wanderers").parentElement.nextElementSibling
      .nextElementSibling.children[0].children
  );
  const allPokemonInArea = visibleEncounters.concat(
    randomEncounters.concat(wandering)
  );

  console.log("all pokemons from bulbapedia", allPokemonInArea);

  chrome.storage.local.get(
    "pokedexData",
    function ({ pokedexData: allPokemon }) {
      const caught = getCaughtPokemon(JSON.parse(allPokemon));
      console.log("caught pokemans", caught);
      console.log("all pokemon in area", allPokemonInArea);

      for (let i = 0; i < allPokemonInArea.length; i++) {
        const row = allPokemonInArea[i];

        // contains a pokemon. (not a header row)
        if (row.childElementCount > 5) {
          const spanWithPokemonName = row.querySelector(
            "div div:nth-child(1) span"
          );
          if (!spanWithPokemonName) continue;
          const pokemonName = spanWithPokemonName.textContent
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

          console.log("bulbapedia mon", pokemonName);

          // if pokemon is caught, mark out the row
          if (caught[pokemonName]) {
            for (let cell of row.children) {
              cell.style.backgroundColor = "grey";
            }
          }
        }
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

function getCaughtPokemon(pokedexData) {
    let caughtPokemonDict = {};

    for (let i = 0; i < pokedexData.length; i++) {
        const pokemon = pokedexData[i];
        const name = pokemon["pokemon"]["name"].toLowerCase();
        if (pokemon["captured"]) caughtPokemonDict[name] = true;
      }
      return caughtPokemonDict;
}
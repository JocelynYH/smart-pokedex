window.addEventListener("load", highlightDom, false);

console.log("now running");
async function highlightDom() {
  console.log("running");

  await getPokedexData();
  console.log("got data");
  const visibleEncounters = getPokemonRows("h3 #Visible_encounters");
  const randomEncounters = getPokemonRows("h3 #Random_encounters")
  const wandering = getPokemonRows("h3 #Wanderers");

  const allPokemonInAreaRows = visibleEncounters.concat(
    randomEncounters.concat(wandering)
  );
  if (!allPokemonInAreaRows) return;

  console.log("all pokemons from bulbapedia", allPokemonInAreaRows);

  chrome.storage.local.get(
    "pokedexData",
    function ({ pokedexData: allPokemon }) {
      const caught = getCaughtPokemon(JSON.parse(allPokemon));
      console.log("caught pokemans", caught);
      console.log("all pokemon in area", allPokemonInAreaRows);

      for (let i = 0; i < allPokemonInAreaRows.length; i++) {
        const row = allPokemonInAreaRows[i];

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

function getPokemonRows(headerQuery) {
    const encounterSection = document.querySelector(headerQuery);
    if (encounterSection) {
        const header = encounterSection.parentElement;
        let sibling = header.nextElementSibling;

        while (sibling.nodeName !== "H3") {
            if (sibling.nodeName === "TABLE" && sibling.classList.contains('roundy')) {
                const rows = sibling.querySelector('tbody').children;
                return Array.from(rows);
            }
            sibling = sibling.nextElementSibling;
        }
    
    }
    return [];
}
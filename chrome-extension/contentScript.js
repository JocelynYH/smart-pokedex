window.addEventListener("load", highlightDom, false);

async function highlightDom() {
  await getPokedexData();
  const allPokemonInArea = Array.from(
    document.querySelectorAll("#content tbody tr .name")
  );

  chrome.storage.local.get(
    "pokedexData",
    function ({ pokedexData: allPokemon }) {
      const uncaught = getUncaughtPokemon(JSON.parse(allPokemon));
      console.log("uncaught pokemans", uncaught);
      console.log("all pokemon in area", allPokemonInArea)

      for (let i = 0; i < allPokemonInArea.length; i++) {
        const pokemonNameLink = allPokemonInArea[i];

        // is a pokemon row

        //   let pokemonName = pokemonNameLink.href.match(/(?<=pokedex-swsh\/).*/);
        let pokemonName = pokemonNameLink.textContent;
        if (!pokemonName) continue;
        else
          pokemonName = pokemonName
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        console.log("serebii mon", pokemonName);

        // drop enter symbol

        // if pokemon is caught, mark out the row
        if (uncaught.indexOf(pokemonName) > -1)
          pokemonNameLink.style.backgroundColor = "red";
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

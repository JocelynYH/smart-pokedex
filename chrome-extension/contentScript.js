window.addEventListener("load", highlightDom, false);

async function highlightDom() {
  await getPokedexData();
  const allPokemonInArea = Array.from(
    document.querySelectorAll("#content tbody tr:nth-child(2) td a")
  );

  chrome.storage.local.get("pokedexData", function ({ pokedexData: allPokemon }) {
    
    const uncaught = getUncaughtPokemon(JSON.parse(allPokemon))
    console.log("uncaught pokemans", uncaught);
    console.log('serebii pokemon', allPokemonInArea)


    for (let i = 0; i < allPokemonInArea.length; i++) {
      const pokemonNameLink = allPokemonInArea[i];

      // is a pokemon row

      let pokemonName = pokemonNameLink.href.match(/(?<=pokedex-swsh\/).*/);
      if (!pokemonName) continue;
      else pokemonName = pokemonName[0].toLowerCase();

      // drop enter symbol

      // if pokemon is caught, mark out the row
      if (uncaught.indexOf(pokemonName) > -1) pokemonNameLink.parentElement.style.backgroundColor = "white";
    }
  });
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
    console.log('one single pokemon', pokemon)
    if (!pokemon["captured"])
      uncaughtPokemonNames.push(pokemon["pokemon"]["name"].toLowerCase());
  }
  return uncaughtPokemonNames;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sendResponse);
  console.log("ajsllsafjlksafljk;fssfajlkfslk");
  chrome.storage.local.get("pokedexData", function (data) {
    const rawPokedexData = data.pokedexData;
    console.log(rawPokedexData);
    const uncaught = getUncaughtPokemon(JSON.parse(rawPokedexData));
    console.log(uncaught);
    console.log("greeting", request.greeting);
    highlightDom(uncaught, function () {
      if (request.greeting === "highlightPokemon")
        sendResponse({ status: "completed" });
    });
  });
});

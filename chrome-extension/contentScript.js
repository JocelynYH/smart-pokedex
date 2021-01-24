window.addEventListener ("load", myMain, false);

function myMain () {
    const uncaught = ["tranquill","oddish","bellossom","mamoswine","musharna","xatu","ninjask","shedinja","hitmonchan","hitmontop","vespiquen","kirlia","skuntank","palpitoad","dusknoir","gastly","haunter","gengar","seaking","remoraid","pyukumuku","garbodor","excadrill","persian","alcremie","ribombee","ferroseed","ferrothorn","gourgeist","vaporeon","jolteon","umbreon","glaceon","meowstic","lanturn","croagunk","stunfisk","bisharp","bonsly","clefable","whimsicott","rhydon","rhyperior","gothorita","gothitelle","karrablast","escavalier","beheeyem","mandibuzz","chandelure","weavile","lucario","toxtricity","heliolisk","flygon","runerigus","cofagrigus","aegislash","morelull","oranguru","turtonator","togedemaru","lapras","lunatone","solrock","mr. rime","darmanitan","charmeleon","silvally","pupitar","tyranitar","zweilous","jangmo-o","kommo-o","blissey","luxio","luxray","bisharp","alakazam","kirlia","remoraid","lickitung","karrablast","escavalier","venusaur","squirtle","wartortle","blastoise","tangela","tangrowth","croagunk","oranguru","seaking","starmie","dedenne","magnemite","magneton","stoutland","heracross","psyduck","exploud","lycanroc","scrafty","mienfoo","mienshao","jangmo-o","kommo-o","krokorok","krookodile","mandibuzz","rhydon","rhyperior","lanturn","clauncher","clawitzer","horsea","seadra","kingdra","petilil","lilligant","exeggutor","zarude","mamoswine","mr. rime","electivire","weavile","clefable","chandelure","gothorita","gothitelle","vaporeon","jolteon","umbreon","glaceon","tyrantrum","aurorus","galvantula","karrablast","escavalier","darmanitan","shelgon","salamence","gible","gabite","garchomp","kabuto","kabutops","metang","lucario","zweilous","tyranitar","golbat","archeops","walrein","whimsicott","ferroseed","ferrothorn","cradily","anorith","relicanth","lapras","aggron","dragonite","cobalion","terrakion","virizion"];
    const allPokemonInArea = Array.from(document.querySelectorAll('#content tbody tr:nth-child(2) td a'));
    for (let i = 0; i <allPokemonInArea.length; i++) {
        const pokemonCell = allPokemonInArea[i];
    
        // is a pokemon row
    
        let pokemonName = pokemonCell.href.match(/(?<=pokedex-swsh\/).*/);
        if (!pokemonName) continue;
        else pokemonName = pokemonName[0].toLowerCase();

        console.log(pokemonName)

        // drop enter symbol
        
        // if pokemon is caught, mark out the row
        if (uncaught.indexOf(pokemonName) > -1)  pokemonCell.parentElement.style.backgroundColor = 'white'
    }
}
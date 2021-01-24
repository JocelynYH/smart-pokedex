import requests
import json
import pickle

url = 'https://pokedextracker.com/api/captures?dex=169280'
headersData = {
    'authority': 'dpokedextracker.com',
    'user-agent': 'dMozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'dnt': '1',
    'accept': '*/*',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://pokedextracker.com/u/seaweed4/sword-isle-dex'
}

resp = requests.get(url,headers=headersData)

pokedexData = json.loads(resp.content)

# curl 'https://pokedextracker.com/api/captures?dex=169280' \
#   -H 'authority: pokedextracker.com' \
#   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' \
#   -H 'dnt: 1' \
#   -H 'accept: */*' \
#   -H 'sec-fetch-site: same-origin' \
#   -H 'sec-fetch-mode: cors' \
#   -H 'sec-fetch-dest: empty' \
#   -H 'referer: https://pokedextracker.com/u/seaweed4/sword-isle-dex' \
#   -H 'accept-language: es-US,es;q=0.9,en-US;q=0.8,en;q=0.7' \
#   --compressed

# print("my resp", json.dumps(resp.content, indent=4, sort_keys=True))


# with open('data.json', 'w') as f:
#     # foundPokemon = []
#     # for elem in data:
#     #     if elem['captured']:
#     #         foundPokemon.append(elem['pokemon']['name'])
#     # with open('foundPokemon.json', 'w') as file:
#     #     json.dump(foundPokemon, file)
#     json.dump(pokedexData, f, sort_keys=True, indent=4)

file = open("uncaught.txt", "w")
file.seek(0)
file.write("[")

for pokemonElem in pokedexData:
    # if i === len(pokemonElem) - 1 and :
    #     file.write
    if not pokemonElem['captured']:
        file.write('"'+ pokemonElem['pokemon']['name'].lower() + '",')


file.write("]")
file.truncate()
const BASE_URL = "https://pokeapi.co/api/v2/";
let pokemons = [];

async function loadPokeData(path = "") {
    let response = await fetch(BASE_URL + path);
    return await response.json();
}

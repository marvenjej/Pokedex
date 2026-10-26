function init() {
    loadPokemon();
}

async function loadPokemon() {
    let pokemonList = await loadPokeData("pokemon?limit=20&offset=" + pokemons.length);
    for (let listEntry of pokemonList.results) {
        let pokemonDetails = await loadPokeData(listEntry.url.replace(BASE_URL, ""));
        pokemons.push(pokemonDetails);
    }
    renderPokedex();
}

function renderPokedex() {
    let pokedexRef = document.getElementById("pokedex");
    pokedexRef.innerHTML = "";
    for (let pokemon of pokemons) {
        pokedexRef.innerHTML += getPokemonCardHtml(pokemon);
    }
}

function getPokemonCardHtml(pokemon) {
    let name = capitalize(pokemon.name);
    let image = pokemon.sprites.other["official-artwork"].front_default;
    let color = getTypeColor(pokemon.types[0].type.name);
    return getCardTemplate(name, image, color, getTypesHtml(pokemon.types));
}

function getTypesHtml(types) {
    let typesHtml = "";
    for (let typeSlot of types) {
        typesHtml += getTypeTemplate(capitalize(typeSlot.type.name));
    }
    return typesHtml;
}

function getTypeColor(typeName) {
    return getNatureColor(typeName) || getFighterColor(typeName) || getMysticColor(typeName) || "#a8a878";
}

function getNatureColor(typeName) {
    switch (typeName) {
        case "grass": return "#9bcc50";
        case "bug": return "#a8b820";
        case "water": return "#6390f0";
        case "ground": return "#e0c068";
        case "rock": return "#b8a038";
        case "ice": return "#98d8d8";
    }
}

function getFighterColor(typeName) {
    switch (typeName) {
        case "fire": return "#f08030";
        case "fighting": return "#c03028";
        case "electric": return "#f8d030";
        case "steel": return "#b8b8d0";
        case "flying": return "#a890f0";
        case "normal": return "#c6c6a7";
    }
}

function getMysticColor(typeName) {
    switch (typeName) {
        case "poison": return "#a040a0";
        case "psychic": return "#f85888";
        case "ghost": return "#705898";
        case "dragon": return "#7038f8";
        case "dark": return "#705848";
        case "fairy": return "#ee99ac";
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

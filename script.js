let currentIndex = 0;
let scrollPosition = 0;

function init() {
    loadPokemon();
}

async function loadPokemon() {
    showLoading();
    try {
        let pokemonList = await loadPokeData("pokemon?limit=20&offset=" + pokemons.length);
        let newPokemons = await Promise.all(getDetailRequests(pokemonList.results));
        addPokemons(newPokemons);
        renderPokedex();
    } catch (error) {
        console.error(error);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    let loadingRef = document.getElementById("loading");
    let loadMoreRef = document.getElementById("load-more-button");
    loadingRef.hidden = false;
    loadMoreRef.disabled = true;
}

function hideLoading() {
    let loadingRef = document.getElementById("loading");
    let loadMoreRef = document.getElementById("load-more-button");
    loadingRef.hidden = true;
    loadMoreRef.disabled = false;
}

function getDetailRequests(results) {
    let requests = [];
    for (let listEntry of results) {
        requests.push(loadPokeData(listEntry.url.replace(BASE_URL, "")));
    }
    return requests;
}

function addPokemons(newPokemons) {
    for (let pokemon of newPokemons) {
        pokemons.push(pokemon);
    }
}

function renderPokedex() {
    let pokedexRef = document.getElementById("pokedex");
    pokedexRef.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
        pokedexRef.innerHTML += getPokemonCardHtml(pokemons[i], i);
    }
}

function openDialog(index) {
    currentIndex = index;
    renderDialog();
    let dialogRef = document.getElementById("dialog");
    dialogRef.showModal();
    lockScroll();
}

function closeDialog() {
    let dialogRef = document.getElementById("dialog");
    dialogRef.close();
}

function closeOnBackdrop(event) {
    if (event.target.id == "dialog") {
        closeDialog();
    }
}

function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.style.top = -scrollPosition + "px";
    document.documentElement.classList.add("no-scroll");
}

function unlockScroll() {
    document.documentElement.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
}

function renderDialog() {
    let pokemon = pokemons[currentIndex];
    let name = capitalize(pokemon.name);
    let nameRef = document.getElementById("overlay-pokemon-name");
    let imageRef = document.getElementById("dialog-image");
    nameRef.innerHTML = name;
    imageRef.src = pokemon.sprites.other["official-artwork"].front_default;
    imageRef.alt = name;
    document.getElementById("dialog-stats").innerHTML = getStatsHtml(pokemon.stats);
}

function showNext() {
    currentIndex = (currentIndex + 1) % pokemons.length;
    renderDialog();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + pokemons.length) % pokemons.length;
    renderDialog();
}

function getStatsHtml(stats) {
    let statsHtml = "";
    for (let statSlot of stats) {
        let statName = statSlot.stat.name;
        if (statName == "hp" || statName == "attack" || statName == "defense") {
            statsHtml += getStatTemplate(getStatLabel(statName), statSlot.base_stat);
        }
    }
    return statsHtml;
}

function getStatLabel(statName) {
    if (statName == "hp") {
        return "HP";
    }
    return capitalize(statName);
}

function getPokemonCardHtml(pokemon, index) {
    let name = capitalize(pokemon.name);
    let image = pokemon.sprites.other["official-artwork"].front_default;
    let color = getTypeColor(pokemon.types[0].type.name);
    return getCardTemplate(index, name, image, color, getTypesHtml(pokemon.types));
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

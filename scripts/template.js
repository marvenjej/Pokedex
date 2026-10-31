function getCardTemplate(index, name, image, color, typesHtml) {
    return `
        <li>
            <button type="button" class="card" data-id="card" aria-label="Open ${name}" style="background-color: ${color}" onclick="openDialog(${index})">
                <img data-id="card-image" src="${image}" alt="${name}">
                <h2>${name}</h2>
                <ul class="types">${typesHtml}</ul>
            </button>
        </li>`;
}

function getTypeTemplate(typeName) {
    return `<li class="type">${typeName}</li>`;
}

function getStatTemplate(statName, value) {
    return `
        <li class="stat">
            <span>${statName}</span>
            <span>${value}</span>
        </li>`;
}

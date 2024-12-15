let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

for (let i = 0; i < 12; i++) {
    pokemon_cards.appendChild(card_template.content.cloneNode(true));
    let elem = document.getElementById("0");
    elem.id = i + 1;

    let tags = elem.getElementsByClassName("tags")[0]
    tags.appendChild(tag_template.content.cloneNode(true));
    tags.appendChild(tag_template.content.cloneNode(true));
}
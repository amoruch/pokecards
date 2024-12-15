let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

let api = "https://pokeapi.co/api/v2/pokemon";

let image_url = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

let all_pokemons;

function f(x) {
    return "0".repeat(3 - x.toString().length) + x;
}

async function aboba() {
    let x = await fetch(api);
    let y = await x.json();
    all_pokemons = y.results;

    for (let i = 0; i < 12; i++) {
        pokemon_cards.appendChild(card_template.content.cloneNode(true));

        let elem = document.getElementById("0");
        let aboba = all_pokemons[i].name;
        elem.getElementsByClassName("name")[0].innerText = aboba;
        elem.getElementsByTagName("img")[0].src = image_url + f(i + 1) + ".png";
        elem.id = i + 1;
    
        let tags = elem.getElementsByClassName("tags")[0];
        tags.appendChild(tag_template.content.cloneNode(true));
        tags.appendChild(tag_template.content.cloneNode(true));
    }
}

aboba();
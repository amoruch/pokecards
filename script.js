let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

let api = "https://pokeapi.co/api/v2/pokemon";
let href;
let from = 0;

let image_url = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

let all_pokemons;

function f(x) {
    return "0".repeat(3 - x.toString().length) + x;
}

function load_pokemons() {
    for (let i = 0; i < 20; i++) {
        pokemon_cards.appendChild(card_template.content.cloneNode(true));

        let elem = document.getElementById("0");
        elem.id = i + 1;
    
        let tags = elem.getElementsByClassName("tags")[0];
        tags.appendChild(tag_template.content.cloneNode(true));
        tags.appendChild(tag_template.content.cloneNode(true));
    }

    let url_string = window.location.href; 
    let url = new URL(url_string);
    let c = url.searchParams.get("page");
    if (c == null) {
        c = 1;
    }
    c = parseInt(c) + 1;
    console.log(c)
    href = url.origin + url.pathname + "?page=" + c;
}

async function load_images() {
    let x = await fetch(api);
    let y = await x.json();
    all_pokemons = y.results;
    api = y.next;
    for (let i = 0; i < all_pokemons.length; i++) {
        let elem = document.getElementById(i + 1);
        let aboba = all_pokemons[i].name;

        elem.getElementsByClassName("name")[0].innerText = aboba;
        elem.getElementsByTagName("img")[0].src = image_url + f(from + i + 1) + ".png";
    }
}

function next_page() {
    location.href=href;
    //load_images();
}

load_pokemons();
load_images();
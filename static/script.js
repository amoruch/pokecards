let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

let api = "https://pokeapi.co/api/v2/pokemon?offset=";
let image_url = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

let page = 1;

function get_page() {
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let a = url.pathname;
    return parseInt(a.split('/')[1]);
}

function f(x) {
    return "0".repeat(Math.max(0, 3 - x.toString().length)) + x;
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
}

async function load_images() {
    let x = await fetch(api + ((page - 1) * 20));
    let y = await x.json();
    let all_pokemons = y.results;
    api = y.next;
    for (let i = 0; i < all_pokemons.length; i++) {
        let elem = document.getElementById(i + 1);
        let aboba = all_pokemons[i].name;

        elem.getElementsByClassName("name")[0].innerText = aboba;
        elem.getElementsByTagName("img")[0].src = image_url + f((page - 1) * 20 + i + 1) + ".png";
    }
}

function prev_page() {
    if (page < 2) {
        return;
    }
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/' + (get_page() - 1);
    location.href=href;
}

function next_page() {
    if (page > 100) {
        return;
    }
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/' + (get_page() + 1);
    location.href=href;
}

page = get_page()
load_pokemons();
load_images();
let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

let input = document.querySelector("#uname");

let api = "https://pokeapi.co/api/v2/pokemon?offset=";
let image_url = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

let page = 1;

let tag_colors = {
    "grass": ["green", "#00AA00"],
    "poison": ["#40FD14", "#11DD11"],
    "fire": ["red", "#FF5555"],
    "flying": ["lightblue", "#BBBBBB"],
    "water": ["blue", "#0099FF"],
    "bug": ["orange", "#55DD55"],
    "normal": ["gray", "#AAAAAA"],
    "electric": ["#00F0FF", "#00C0CC"],
    "ground": ["brown", "#967B00"],
    "fairy": ["pink", "lightpink"],
    // here goes random colors
    "fighting": ["#F54021", "#FF7514"],
    "psychic": ["#00BB2D", "#E6D690"],
    "rock": ["#025669", "#3B3C36"],
    "steel": ["#6C7059", "#35682D"],
    "ice": ["#7FB5B5", "#82898F"],
    "ghost": ["#6C3B2A", "#6C7156"],
    "dragon": ["#999950", "#D0D0D0"],
    "dark": ["#EA899A", "#B32821"]
};

function get_page() {
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let a = url.pathname;
    return parseInt(a.split('/')[1]);
}

function f(x) {
    return "0".repeat(Math.max(0, 3 - x.toString().length)) + x;
}

async function get_pokemon_types(name) {
    let x = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    let y = await x.json();
    let pokemon_types = y.types;
    let types = [];
    for (let i = 0; i < pokemon_types.length; i++) {
        types.push(pokemon_types[i].type.name);
    }
    return types;
}

async function load_content() {
    // disable buttons
    let buttons = [];
    if (page == 1){
        buttons = document.getElementsByClassName("prev_but");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
    if (page == 66) {
        buttons = document.getElementsByClassName("next_but");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }

    // load pokemons' info
    let x = await fetch(api + ((page - 1) * 20));
    let y = await x.json();
    let all_pokemons = y.results;
    
    // load pokemons' cards
    for (let i = 0; i < all_pokemons.length; i++) {
        pokemon_cards.appendChild(card_template.content.cloneNode(true));

        let elem = document.getElementById("0");
        elem.id = i + 1;
    }

    // load pokemons' img and description
    for (let i = 0; i < all_pokemons.length; i++) {
        let elem = document.getElementById(i + 1);
        let name = all_pokemons[i].name;
        let id = (page - 1) * 20 + i + 1;

        elem.getElementsByClassName("name")[0].innerText = name;
        elem.getElementsByTagName("a")[0].href = "/pokemon/" + f(id);
        elem.getElementsByClassName("id")[0].innerText = "#" + f(id);
        elem.getElementsByTagName("img")[0].src = image_url + f(id) + ".png";
        let types = [];
        try {
            types = await get_pokemon_types(name);
        } catch(e) {
            types = []
        }
        let tags = elem.getElementsByClassName("tags")[0];
        for (let i = 0; i < types.length; i++) {
            tags.appendChild(tag_template.content.cloneNode(true));
            let type_button = tags.getElementsByTagName("button")[i]
            let p = type_button.getElementsByTagName("p")[0];
            p.innerText = types[i];
            type_button.style.backgroundColor = tag_colors[types[i]][0];
        }
        if (types.length > 1) {
            let grad = "linear-gradient(0.375turn, " + tag_colors[types[0]][1] + ", " + tag_colors[types[1]][1] + ")";
            elem.style.background = grad;
        }
        else {
            elem.style.backgroundColor = tag_colors[types[0]][1];
        }
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
    if (page > 65) {
        return;
    }
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/' + (get_page() + 1);
    location.href=href;
}

function search() {
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/pokemon/' + input.value;
    location.href=href;
}

page = get_page()
load_content();
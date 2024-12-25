let pokemon_cards = document.getElementById("pokemon_cards");
let card_template = document.getElementById("card");
let tag_template = document.getElementById("tag");

let api = "https://pokeapi.co/api/v2/pokemon/";
let image_url = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/";

let id = 2;

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

function get_id() {
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let a = url.pathname.split('/');
    return parseInt(a[a.length - 1]);
}

function f(x) {
    return "0".repeat(Math.max(0, 3 - x.toString().length)) + x;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function get_pokemon_data(a) {
    let x = await fetch(api + a);
    let y = await x.json();
    const { name, id, types, weight, height, abilities, stats } = y;
    //x = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + a);
    //y = await x.json();
    return { name, id, types, weight, height, abilities, stats };
}

async function load_content() {
    let x = await fetch(api + id);
    let y = await x.json();
    const { name, types, weight, height, abilities, stats } = y;
    //x = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + a);
    //y = await x.json();

    document.getElementsByTagName("body")[0].style = "background-color: " + tag_colors[types[0].type.name][1];

    document.getElementsByClassName("name")[0].innerText = capitalizeFirstLetter(name);
    document.getElementsByClassName("id")[0].innerText = "#" + f(id);
    document.getElementsByClassName("pokemon")[0].getElementsByTagName("img")[0].src = image_url + f(id) + ".png";

    for (let i = 0; i < types.length; i++) {
        document.getElementsByClassName("type")[i].innerText = types[i].type.name;
        document.getElementsByClassName("type")[i].style = "background-color: " + tag_colors[types[i].type.name][0];
    }

    document.getElementsByClassName("weight")[0].getElementsByTagName("p")[0].innerText = weight / 10 + " kg";
    document.getElementsByClassName("height")[0].getElementsByTagName("p")[0].innerText = height / 10 + " m";
    document.getElementsByClassName("move")[0].getElementsByTagName("p")[0].innerText = abilities[0].ability.name

    for (let i = 0; i < 6; i++) {
        n = stats[i].stat.name;
        v = stats[i].base_stat;
        elem = document.getElementById(n);
        elem.getElementsByTagName("p")[1].innerText = v;
        elem.getElementsByTagName("progress")[0].value = v;
    }
}

function prev() {
    if (id < 2) {
        return;
    }
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/pokemon/' + (id - 1);
    location.href=href;
}

function next() {
    if (id > 1300) {
        return;
    }
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + '/pokemon/' + (id + 1);
    location.href=href;
}

function back() {
    let url_string = window.location.href; 
    let url = new URL(url_string);
    let href = url.origin + "/" + (parseInt((id - 1) / 20) + 1);
    location.href=href;
    return;
}

id = get_id();
load_content();
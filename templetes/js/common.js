
{/*
Example of vertical card 
<div class="col-lg-2">
    <a href="${href}">
        <div class="card music-card">
            <img class="card-img-top" src="${img_url}" alt="song2 img">
            <div class="card-body">
                <figcaption class="card-title">${top_text}</figcaption>
                <figcaption class="card-text">${bottom_text}</figcaption>
            </div>
        </div>
    </a>
</div> 
*/}
export function create_vertical_card(top_text, bottom_text, img_url, href){
    let user_name_div = document.createElement("figcaption");
    user_name_div.classList.add("card-text");
    user_name_div.appendChild(document.createTextNode(bottom_text));

    let playlist_name_div = document.createElement("figcaption");
    playlist_name_div.classList.add("card-title");
    playlist_name_div.appendChild(document.createTextNode(top_text));
    
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.appendChild(playlist_name_div);
    card_body.appendChild(user_name_div);

    let anchor_playlist = document.createElement("a");
    anchor_playlist.setAttribute("href", href); 
    anchor_playlist.appendChild(card_body);

    let card_img = document.createElement("img");
    card_img.classList.add("card-img-top");
    card_img.setAttribute("src", img_url);
    card_img.setAttribute("alt", "playlist img");

    let card_div = document.createElement("div");
    card_div.classList.add("card");
    card_div.classList.add("music-card");
    card_div.appendChild(card_img);
    card_div.appendChild(anchor_playlist);

    let most_outer_div = document.createElement("div");
    most_outer_div.classList.add("col-lg-2");
    most_outer_div.appendChild(card_div);
    return most_outer_div;
}

export const EACH_ROW = 5;
const EMPTY_PLAYLIST_CARD = create_vertical_card("top text", "bottom text", "/public/ProfilePic/DefaultProfilePic.png", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
const BORDER = document.createElement("div");
BORDER.classList.add("col-lg-1");

export function padding_border(){
    return BORDER.cloneNode(true);
}
export function empty_vertical_card(){
    return EMPTY_PLAYLIST_CARD.cloneNode(true);
}

export function create_half_horizontal_card(top_text, bottom_text, img_url, href){
    let card_title = document.createElement("figcaption");
    card_title.classList.add("card-title");
    card_title.appendChild(document.createTextNode(top_text));

    let card_text = document.createElement("figcaption");
    card_text.classList.add("card-text");
    card_text.appendChild(document.createTextNode(bottom_text));

    let card_body_div = document.createElement("div");
    card_body_div.classList.add("card-body", "p-0");
    card_body_div.append(card_title, card_text);
    
    let card_body_div_wrapper = document.createElement("div");
    card_body_div_wrapper.classList.add("col-lg-auto");
    card_body_div_wrapper.append(card_body_div);
    
    let card_img = document.createElement("img");
    card_img.setAttribute("src", img_url);
    card_img.classList.add("img-fluid", "rounded-start", "card-img-top");

    let card_img_div = document.createElement("div");
    card_img_div.append(card_img);
    card_img_div.classList.add("col-lg-1");

    let inner_card_div = document.createElement("div");
    inner_card_div.classList.add("row", "no-gutters");
    inner_card_div.append(card_img_div, card_body_div_wrapper);

    let card_div = document.createElement("div");
    card_div.classList.add("card", "music-card", "p-1", "m-1");
    card_div.append(inner_card_div);

    let anchor = document.createElement("a");
    anchor.setAttribute("href", href);
    anchor.append(card_div);
    return anchor;
}
const EMPTY_HALF_HORIZONTAL_CARD = create_half_horizontal_card("Alpha", "C418", "/public/ProfilePic/DefaultProfilePic.png", "music")
export function empty_half_horizontal_card(){
    return EMPTY_HALF_HORIZONTAL_CARD.cloneNode(true);
}


export function top_card(top_text, bottom_text, img_url, href){
    /* 
    Templete of top card
    <a href="${href}">
        <div class="card music-card top-card">
            <div class="row no-gutters fluid">
                <div class="col-md-6">
                    <img src="${img_url}" class="img-fluid rounded-start card-img-top">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <figcaption class="card-title h6">${top_text}</figcaption>
                        <figcaption class="card-text">${bottom_text}</figcaption>
                    </div>
                </div>
            </div>
        </div>
    </a> 
    */
    let card_title = document.createElement("figcaption");
    card_title.classList.add("card-title", "h6");
    card_title.append(top_text);

    let card_text = document.createElement("figcaption");
    card_text.classList.add("card-text");
    card_text.append(bottom_text);

    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.append(card_title, card_text);

    let card_body_div_wrapper = document.createElement("div");
    card_body_div_wrapper.classList.add("col-md-6");
    card_body_div_wrapper.append(card_body);

    let img = document.createElement("img");
    img.setAttribute("src", img_url);
    img.classList.add("img-fluid", "rounded-start", "card-img-top");
    
    let img_div = document.createElement("div");
    img_div.classList.add("col-md-6");
    img_div.append(img);

    let inner_card_div = document.createElement("div");
    inner_card_div.classList.add("row", "no-gutters", "fluid");
    inner_card_div.append(img_div, card_body_div_wrapper);

    let card_div = document.createElement("div");
    card_div.classList.add("card", "music-card", "top-card");
    card_div.append(inner_card_div);

    let anchor = document.createElement("a");
    anchor.setAttribute("href", href);
    anchor.append(card_div);
    return anchor;
}


export function get_parameter(){
    const url = window.location.href;
    let url_split = url.split("?");
    let parameters = url_split[1].split("&");
    let dict = {};
    parameters.forEach(element => {
        let [key, value] = element.split("=");
        dict[key] = value;
    });
    return dict;
}

const SHOW_ALL_SHOW_LESS_STATES = ["Show all", "Show less"];
export function on_showall(id){
    // add more card elements, or vice versa
    // "show all" -> "show less" or vice versa

    let show_button = document.getElementById(id);
    
    // hidden thing addition row in html itself since im too lazy to read about create
    // html element in JS. Will fix this later if necessary
    let hidden_rows = null;
    if(id.includes("music")){
        hidden_rows = document.getElementsByClassName("music-row default-hidden");
    }
    else if(id.includes("playlist")){
        hidden_rows = document.getElementsByClassName("playlist-row default-hidden");
    }
    
    if(show_button.textContent === SHOW_ALL_SHOW_LESS_STATES[0]){
        show_button.textContent = SHOW_ALL_SHOW_LESS_STATES[1];
        Array.prototype.filter.call(hidden_rows, function(row){
            row.hidden = false;
        });

    }
    else if(show_button.textContent == SHOW_ALL_SHOW_LESS_STATES[1]){
        show_button.textContent = SHOW_ALL_SHOW_LESS_STATES[0];
        Array.prototype.filter.call(hidden_rows, function(row){
            row.hidden = true;
        });
    }
}



const PLAYLIST_ROW = document.createElement("div")
PLAYLIST_ROW.classList.add("row", "playlist-row", "my-3");
const PLAYLIST_ROW_HIDDEN = PLAYLIST_ROW.cloneNode(true);
PLAYLIST_ROW_HIDDEN.classList.add("default-hidden");
PLAYLIST_ROW_HIDDEN.hidden = true;
export function create_playlist_row(hidden){
    if(hidden){
        return PLAYLIST_ROW_HIDDEN.cloneNode(true);
    }
    return PLAYLIST_ROW.cloneNode(true);
}


const MUSIC_ROW = document.createElement("div")
MUSIC_ROW.classList.add("row", "music-row", "my-3");
const MUSIC_ROW_HIDDEN = MUSIC_ROW.cloneNode(true);
MUSIC_ROW_HIDDEN.classList.add("default-hidden");
MUSIC_ROW_HIDDEN.hidden = true;
export function create_music_row(hidden){
    /* 
    templete of row of vertical card
    <div class="row music-row my-3">
        <div class="col-lg-1"></div>
            vertical card1
            vertical card2
            vertical card3
            vertical card4
            vertical card5
        <div class="col-lg-1"></div>
    </div>
    */
    if(hidden){
        return PLAYLIST_ROW_HIDDEN.cloneNode(true)
    }
    return PLAYLIST_ROW.cloneNode(true);
}


export function horizontal_card(top_text, bottom_text, img_url, href, hidden){
    /*
    <a href=${href}>
        <div class="card music-card p-1 my-2">
            <div class="row no-gutters">
                <div class="col-lg-1"><img class="img-fluid rounded-start card-img-top" src="${img_url}" ></div>
                <div class="col-lg-10 card-description">
                    <figcaption class="card-body py-0">
                        <div class="card-title my-0">${top_text}</div>
                        <div class="card-text my-0">${bottom_text}</div>
                    </figcaption>
                </div>
                <div class="col-lg-1 vertical-dropdown">
                    dropdown
                </div>
            </div>
        </div>
    </a>
    */
    let top_text_div = document.createElement("div");
    top_text_div.classList.add("card-title", "my-0");
    top_text_div.append(top_text);

    let bottom_text_div = document.createElement("div");
    bottom_text_div.classList.add("card-text", "my-0");
    bottom_text_div.append(bottom_text);

    let card_body = document.createElement("figcaption");
    card_body.classList.add("card-body", "py-0");
    card_body.append(top_text_div, bottom_text_div);
    
    let img = document.createElement("img");
    img.classList.add("img-fluid", "rounded-start", "card-img-top");
    img.setAttribute("src", img_url);

    let img_div = document.createElement("div");
    img_div.classList.add("col-lg-1");
    img_div.append(img);

    let card_body_wrapper = document.createElement("div");
    card_body_wrapper.classList.add("card-description", "col-lg-10");
    card_body_wrapper.append(card_body);

    // tobe dropdown here

    let dropdown_div = document.createElement("div");
    dropdown_div.classList.add("col-lg-1", "vertical-dropdown");
    // to append dropdown here

    let row = document.createElement("div");
    row.classList.add("row", "no-gutters");
    row.append(img_div, card_body_wrapper, dropdown_div);

    let whole_card = document.createElement("div");
    whole_card.classList.add("card", "music-card", "p-1", "my-2");
    whole_card.append(row);
    
    let anchor = document.createElement("a");
    if (hidden){
        anchor.classList.add("music-row", "default-hidden");
        anchor.hidden = true;
    }
    anchor.setAttribute("href", href);
    anchor.append(whole_card);
    return anchor;
}

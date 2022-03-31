
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
const EMPTY_PLAYLIST_CARD = create_vertical_card("top text", "bottom text", "https://www.memecreator.org/static/images/memes/4100601.jpg", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
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
const EMPTY_HALF_HORIZONTAL_CARD = create_half_horizontal_card("Alpha", "C418", "public/minecraft-volume-alpha.jpg", "music")
export function empty_half_horizontal_card(){
    return EMPTY_HALF_HORIZONTAL_CARD.cloneNode(true);
}

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
export function top_card(top_text, bottom_text, img_url, href){
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


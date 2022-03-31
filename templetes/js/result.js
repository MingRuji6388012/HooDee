


window.onload = async function() {
    const $_GET = get_parameter();
    console.log($_GET);
    let query_text = $_GET["query_text"];
    let quantifier = $_GET["quantifier"];

    let user_list = null, music_list = null, playlist_list = null;
    if(quantifier === "user" || quantifier === "all"){
        user_list = fetch(`/api/user/search_by_username?UserName=${query_text}`, {
            method: "GET",
        }).then(res => res.json());
    }
    if(quantifier === "music" || quantifier === "all"){
        music_list = fetch(`/api/music/search_by_musicname/${query_text}`, {
            method: "GET",
        }).then(res => res.json());
    }
    if(quantifier === "playlist" || quantifier === "all"){
        playlist_list = fetch(`/api/playlist/search_by_playlistname/${query_text}`, {
            method: "GET",
        }).then(res => res.json());
    }
    let data = {
        user: await user_list,
        music: await music_list,
        playlist: await playlist_list
    };
    console.log(data);

    // push item in templete here *sigh*

    // music handler
    music_handler(data);
    
    // playlist handler
    playlist_handler(data);

    // user handler
    user_handler(data);
}

function get_parameter(){
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

function create_vertical_card(top_text, bottom_text, img_url, href){
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

const EACH_ROW = 5;
const EMPTY_PLAYLIST_CARD = create_vertical_card("Don't stop me", "Oily😀", "public/dont stop me now.webp", "playlist.html");
const BORDER = document.createElement("div");
BORDER.classList.add("col-lg-1");

function padding_border(){
    return BORDER.cloneNode(true);
}
function empty_vertical_card(){
    return EMPTY_PLAYLIST_CARD.cloneNode(true);
}
function playlist_handler(data){
    if(data.playlist !== null && !data.playlist.error){
        document.querySelector("#playlist").hidden = false;
        let parent_node = document.querySelector("#playlist-append"); 
        let playlists = data.playlist.playlists;
        let author_name, playlist_name, playlist_img, playlist_href;
        parent_node.appendChild(padding_border());
        for(let c = 0; c < EACH_ROW; c++){
            let playlist_div = null; 
            if(c < playlists.length) {
                author_name = playlists[c].UserName;
                playlist_name = playlists[c].PlaylistName;
                playlist_img = playlists[c].PlaylistIMG;
                playlist_href = "playlist.html"; // TODO: tbd
                playlist_div = create_vertical_card(playlist_name, author_name, playlist_img, playlist_href);
            }
            else{ // default
                playlist_div = empty_vertical_card(); 
            }
            parent_node.appendChild(playlist_div);
        }
        parent_node.appendChild(padding_border());
    }
    else if (data.playlist !== null && data.playlist.error){
        console.log("error occur in backend");
        console.log(data.playlist.message);
    }
}
function user_handler(data){
    if(data.user !== null && !data.user.error){
        document.querySelector("#artist").hidden = false; // its called artist for backward compatibility reason
        let parent_node = document.querySelector("#user-append"); 
        let users = data.user.users;
        let top_text, bottom_text, href;
        parent_node.appendChild(padding_border());
        for(let c = 0; c < EACH_ROW; c++){
            let verti_card_div = null; 
            if(c < users.length) {
                top_text = users[c].UserName;
                bottom_text = users[c].UserProfileIMG;
                href = "artist"; // TODO: tbd
                verti_card_div = create_vertical_card(top_text, "User", bottom_text, href);
            }
            else{ // default
                verti_card_div = empty_vertical_card(); 
            }
            parent_node.appendChild(verti_card_div);
        }
        parent_node.appendChild(padding_border());
    }
    else if(data.playlist !== null && data.user.error){
        console.log("error occur in backend");
        console.log(data.user.message);
    }
}
function music_handler(data){
    if(data.music !== null && !data.music.error){
        document.querySelector("#top-music").hidden = false; // im not so sure that what should be hidden
        let parent_node = document.querySelector("#music-append"); 
        let musics = data.music.musics;
        let music, top_text, bottom_text, href, img;
        for(let c = 0; c < EACH_ROW; c++){
            if(c < musics.length) {
                music = musics[c];
                top_text = music.MusicName;
                bottom_text = music.UserName;
                img = music.MusicIMG ? music.MusicIMG : "public/what is love.jpg"; // default value
                
                href = music.MusicFile; // TODO: tbd
                if(c === 0){// bring the first to the topcard
                    document.querySelector("#top-music-append").appendChild(top_card(top_text, bottom_text, img, href));
                    continue;
                }
                half_hori_card_div = create_half_horizontal_card(top_text, bottom_text, img, href);
            }
            else{ // default
                half_hori_card_div = empty_half_horizontal_card(); 
            }
            parent_node.appendChild(half_hori_card_div);
        }
    }
    else if(data.music !== null && data.music.error){
        console.log("error occur in backend");
        console.log(data.music.message);
    }
}
function create_half_horizontal_card(top_text, bottom_text, img_url, href){
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
function empty_half_horizontal_card(){
    return EMPTY_HALF_HORIZONTAL_CARD.cloneNode(true);
}
function top_card(top_text, bottom_text, img_url, href){
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


/* 
<a href="artist.html">
    <div class="card music-card top-card">
        <div class="row no-gutters fluid">
            <div class="col-md-6">
                <img src="public/misumi-san.jpg" class="img-fluid rounded-start card-img-top" alt="...">
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <figcaption class="card-title h6">Misumi Yuka</figcaption>
                    <figcaption class="card-text">Artist</figcaption>
                </div>
            </div>
        </div>
    </div>
</a> 
*/
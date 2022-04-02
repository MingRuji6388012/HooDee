import { 
    EACH_ROW, 
    create_vertical_card, 
    padding_border, 
    empty_vertical_card, 
    create_half_horizontal_card, 
    empty_half_horizontal_card, 
    top_card,
    get_parameter
} from "./common.js"

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
    // maybe make these three async later

    // music handler
    music_handler(data);
    
    // playlist handler
    playlist_handler(data);

    // user handler
    user_handler(data);
}

function playlist_handler(data){
    if(data.playlist !== null && !data.playlist.error){
        document.querySelector("#playlist").hidden = false;
        let parent_node = document.querySelector("#playlist-append"); 
        let playlists = data.playlist.playlists;
        let author_name, playlist_name, playlist_img, playlist_href, playlist;
        parent_node.appendChild(padding_border());
        for(let c = 0; c < EACH_ROW; c++){
            let playlist_div = null; 
            if(c < playlists.length) {
                playlist = playlists[c];
                author_name = playlist.UserName;
                playlist_name = playlist.PlaylistName;
                playlist_img = playlist.PlaylistIMG;
                playlist_href = `/playlist?playlist_id=${playlists[c].PlaylistID}`;
                playlist_div = create_vertical_card(playlist_name, author_name, playlist_img, playlist_href, "playlist", playlist);
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
        let top_text, img_url, href, user;
        parent_node.appendChild(padding_border());
        for(let c = 0; c < EACH_ROW; c++){
            let verti_card_div = null; 
            if(c < users.length) {
                user = users[c];
                top_text = user.UserName;
                img_url = user.UserProfileIMG;
                href = `/user?user_id=${user.UserID}`; // TODO: tbd
                verti_card_div = create_vertical_card(top_text, "User", img_url, href, "user", user);
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
        let music, top_text, bottom_text, href, img, half_hori_card_div;
        for(let c = 0; c < EACH_ROW; c++){
            if(c < musics.length) {
                music = musics[c];
                top_text = music.MusicName;
                bottom_text = music.UserName;
                img = music.MusicIMG ? music.MusicIMG : "public/what is love.jpg"; // default value
                
                href = music.MusicFile; // TODO: tbd
                if(c === 0){// bring the first to the topcard
                    document.querySelector("#top-music-append").appendChild(top_card(top_text, bottom_text, img, href, "music", music));
                    continue;
                }
                console.log(music);
                half_hori_card_div = create_half_horizontal_card(top_text, bottom_text, img, href, "music", music);
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

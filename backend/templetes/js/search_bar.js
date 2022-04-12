// import {
//     change_login_to_profile
// } from "./common.js"

// window.onload = async function(){
//     const change_login = change_login_to_profile();
// }


// used in every where that has search bar
function on_click_cross(id){
    elem = document.getElementById(id);
    console.log(elem.value);
    elem.value = "";
}

async function on_search(){
    // e.preventDefault(); // for f*cking jquery
    const query_text = document.getElementById("search-bar").value;
    if(!query_text.length){
        console.log("please fill something into the text field");
        return;
    }
    const all_quatifier = document.getElementById("all-radio-button").checked || false;
    const user_quatifier = document.getElementById("user-radio-button").checked || false;
    const music_quatifier = document.getElementById("music-radio-button").checked || false;
    const playlist_quatifier = document.getElementById("playlist-radio-button").checked || false;

    let user_list = null, music_list = null, playlist_list = null; 
    if(all_quatifier || user_quatifier){
        user_list = fetch(`/api/user/search_by_username?UserName=${query_text}`, {
            method: "GET",
        })
    }
    if(all_quatifier || music_quatifier){
        console.log(query_text);
        console.log(`/api/music/search_by_musicname/${query_text}`);
        music_list = fetch(`/api/music/search_by_musicname/${query_text}`, {
            method: "GET",
        })
    }
    if(all_quatifier || playlist_quatifier){
        playlist_list = fetch(`/api/playlist/search_by_playlistname/${query_text}`, {
            method: "GET",
        })
    }
    let data = {
        user: await (user_list.then(res => res.json())),
        music: await (music_list.then(res => res.json())),
        playlist: await (playlist_list.then(res => res.json()))
    };
    console.log(data);
}
import {  
    horizontal_card, 
    get_parameter,
    change_login_to_profile,
    is_playlist_followed
} from "./common.js"

window.onload = async function(){

    const change_login = change_login_to_profile();
    const $_GET = get_parameter();
    let playlist_id = $_GET["playlist_id"]

    // fetch data
    let playlist_info = fetch(`/api/playlist/search_by_playlistid?PlaylistID=${playlist_id}`, {
        method: "GET"
    }).then(res => res.json());
    
    let musics_in_playlist = fetch(`/api/playlist/musics_in_playlist?PlaylistID=${playlist_id}`, {
        method: "GET"
    }).then(res => res.json());
    
    playlist_info = await playlist_info;
    musics_in_playlist = await musics_in_playlist;

    console.log(playlist_info);
    console.log(musics_in_playlist);
    await change_login;
    playlist_info_append(playlist_info);
    music_append(musics_in_playlist);
}

function playlist_info_append(playlist_info){
    if(!playlist_info.error){
        document.querySelector("title").textContent = `${playlist_info.playlist.PlaylistName} - HooDee`;
        document.querySelector("#playlist-name").textContent = playlist_info.playlist.PlaylistName;
        document.querySelector("#playlist-creator").textContent = playlist_info.playlist.UserName;
        document.querySelector("#playlist-follows").textContent = `${playlist_info.playlist.Followers.length} FOLLOWERS`;
        
        const user_session = JSON.parse(sessionStorage.getItem("user"));
        let text = "Follow", onclick_handler = follow_handler;
        let follow_button = document.createElement("button");
        follow_button.classList.add("btn", "follow-button");
        if(user_session && is_playlist_followed(playlist_info.playlist.PlaylistID, user_session.PlaylistsFollow)){
            text = "Unfollow";
            onclick_handler = unfollow_handler;
        }
        follow_button.append(text);
        follow_button.onclick = onclick_handler;
        document.querySelector("#follow-button-append").append(follow_button);
    }
}

function music_append(musics_in_playlist){
    if(!musics_in_playlist.error){
        let parent_node = document.querySelector("#music-append");
        let musics = musics_in_playlist.musics;
        let top_text, bottom_text, href, img_url, idx, music;
        for (idx = 0; idx < musics.length; idx++) {
            music = musics[idx];
            top_text = music.MusicName;
            bottom_text = music.UserName;
            img_url = music.MusicIMG;
            href = music.MusicFile;
            parent_node.append(horizontal_card(top_text, bottom_text, img_url, href, false, "music", music));
        }    
    }
}


{/* 
<div class="card music-card p-1 my-2">
    <div class="row no-gutters">
        <div class="col-lg-1"><img class="img-fluid rounded-start card-img-top" src="public/Aimer.jpg" alt=""></div>
        <div class="col-lg-10 card-description">
            <figcaption class="card-body py-0">
                <div class="card-title my-0">One and last</div>
                <div class="card-text my-0"><a href="artist">Aimer</a></div>
            </figcaption>
        </div>
        <div class="col-lg-1 vertical-dropdown">
            <div> <img class="showWhenHover" src="public/button/dropdown.png" alt="choices"></div>
        </div>
    </div>
</div> 
*/} 

function follow_handler(){
    const user_session = JSON.parse(sessionStorage.getItem("user"));
    if(user_session){
        const $_GET = get_parameter();
        let playlist_id = $_GET["playlist_id"]
        fetch("/api/playlist/user_follow", {
            method: "post",
            body: JSON.stringify({
                UserID: user_session.UserID,
                PlaylistID: playlist_id
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){;
                console.log(res.message)
                alert("Can't follow");
                return;
            }
            alert("Follow Complete");
            location.reload();
        });
    }
    else{
        alert("You must login before follow playlist!");
    }
}

function unfollow_handler(){
    const user_session = JSON.parse(sessionStorage.getItem("user"));
    if(user_session){
        const $_GET = get_parameter();
        let playlist_id = $_GET["playlist_id"]
        fetch("/api/playlist/user_follow", {
            method: "delete",
            body: JSON.stringify({
                UserID: user_session.UserID,
                PlaylistID: playlist_id
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){;
                console.log(res.message)
                alert("Can't Unfollow");
                return;
            }
            alert("Unfollow Complete");
            location.reload();
        });
    }
    else{
        alert("You must login before unfollow playlist!");
    }
}
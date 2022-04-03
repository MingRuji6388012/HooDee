import { 
    get_parameter,
    create_vertical_card,
    empty_vertical_card,
    EACH_ROW,
    padding_border,
    create_playlist_row,
    horizontal_card,
    change_login_to_profile,
    is_user_followed
} from "./common.js"

window.onload = async function() {

    const change_login = change_login_to_profile();
    const $_GET = get_parameter();
    let user_id = $_GET["user_id"];

    let user = fetch(`api/user/search_by_id/${user_id}`).then((res) => res.json());
    let musics = fetch(`api/music/search_by_authorid/${user_id}`).then(res => res.json());
    let playlists = fetch(`api/playlist/search_by_userid/${user_id}`).then(res => res.json());

    const datas = {
        user: await user,
        musics: await musics,
        playlists: await playlists
    };
    console.log(datas);
    await change_login;

    set_title(datas);
    show_user_title(datas);
    show_playlist_own(datas);
    show_music_own(datas);

};

async function set_title(datas){
    document.querySelector("title").textContent = `${datas.user.user.UserName} - HooDee`;
}

async function show_user_title(datas){
    {/* 
    <div class="artist-info py-4" id="top-user-page" >
        <div class="h1 artist-name-header">Aimer</div>
        <div class="h5 artist-follower-header">20M FOLLOWERS</div>
        <br>    
        <div><button class="btn follow-button">Follow</button></div> 
    </div> 
    */}
    const user_session = JSON.parse(sessionStorage.getItem("user"));
    const username = datas.user.user.UserName;
    let parent_node = document.querySelector("#user-title-append");

    let title = document.createElement("div")
    title.classList.add("h1", "artist-name-header");
    title.append(username);

    let follower_div = document.createElement("div");
    follower_div.classList.add("h5", "artist-follower-header");
    follower_div.append(`${datas.user.user.Followers.length} FOLLOWERS`);

    let new_line = document.createElement("br");

    let text = "Follow", onclick_handler = follow_handler;
    let button = document.createElement("button");
    button.classList.add("btn", "follow-button");

    if(user_session && is_user_followed(datas.user.user.UserID, user_session.Followees)){
        text = "Unfollow";
        onclick_handler = unfollow_handler;
    }
    button.append(text);
    button.onclick = onclick_handler;

    let button_div = document.createElement("div");
    button_div.append(button)

    parent_node.append(title, follower_div, new_line, button_div);
    // parent_node.hidden = false;
}

async function show_playlist_own(datas){
    let parent_node = document.querySelector("#playlist-own-append");
    const playlists = datas.playlists.playlists;
    let idx, top_text, bottom_text, href, img_url, playlist_card, playlist_row, default_hidden = false, playlist;
    // scale so badly, but anyways...
    for(let i = 0; i < playlists.length/EACH_ROW; i++){
        if(i > 0) {
            default_hidden = true;
        }
        playlist_row = create_playlist_row(default_hidden);

        playlist_row.append(padding_border());
        for(let j = 0; j < EACH_ROW; j++){
            idx = i * EACH_ROW + j;
            if(idx < playlists.length){
                playlist = playlists[idx];
                top_text = playlist.PlaylistName;
                bottom_text = datas.user.user.UserName; // a bit cheat, but fine for now
                img_url = playlist.PlaylistIMG;
                href = `/playlist?playlist_id=${playlist.PlaylistID}`;
                console.log(top_text);
                playlist_card = create_vertical_card(top_text, bottom_text, img_url, href, "playlist", playlist);
            }
            else{
                playlist_card = empty_vertical_card();
            }
            playlist_row.append(playlist_card);
        }
        playlist_row.append(padding_border());

        parent_node.append(playlist_row);
    }
}

async function show_music_own(datas){
    let parent_node = document.querySelector("#music-own-append");
    const musics = datas.musics.musics;
    let idx, top_text, bottom_text, href, img_url, music_card, default_hidden = false, music;
    for(idx = 0; idx < musics.length; idx++){
        if (idx >= EACH_ROW){ // maybe change number later
            default_hidden = true;
        }
        music = musics[idx]
        top_text = music.MusicName;
        bottom_text = datas.user.user.UserName;
        href = music.MusicFile;
        img_url = music.MusicIMG;
        music_card = horizontal_card(top_text, bottom_text, img_url, href, default_hidden, "music", music);
        parent_node.append(music_card);
    }
}

function follow_handler(){
    const $_GET = get_parameter();
    let current_page_user_id = $_GET["user_id"];
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user){
        fetch("/api/user/follow", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FolloweeID: current_page_user_id,
                FollowerID: user.UserID
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                console.log(res.message);
                alert("you may already follow this user");
                return;
            }
            alert("Follow Complete!");
            location.reload();
        });
    }
    else{
        alert("You must login before follow anyone!");
    }
}

function unfollow_handler(){
    const $_GET = get_parameter();
    let current_page_user_id = $_GET["user_id"];
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user){
        fetch("/api/user/follow", {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FolloweeID: current_page_user_id,
                FollowerID: user.UserID
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                console.log(res.message);
                alert("didn't follow in the first place?");
                return;
            }
            alert("Unfollow Complete!");
            location.reload();
        });
    }
}
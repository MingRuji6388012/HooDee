

export function create_vertical_card(top_text, bottom_text, img_url, href, type="music", extra_info=null){
    /*
    user in session -> more functionality at in the card depends on ${type}

    <div class="col-lg-2">
        <div class="card music-card">
            <img class="card-img-top" src="public/2021.jpg" alt="2021" />
            <DROPDOWN/>
            <div class="card-body">
                <figcaption class="card-title">2021</figcaption>
                <figcaption class="card-text">Artist: <a href="artist">Lauv</a></figcaption>
            </div>
        </div>  
    </div>
    */
    type = type.toLowerCase();

    let user_name_div = document.createElement("figcaption");
    user_name_div.classList.add("card-text");
    user_name_div.append(bottom_text);

    let playlist_name_div = document.createElement("figcaption");
    playlist_name_div.classList.add("card-title");
    playlist_name_div.append(top_text);
    
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.append(playlist_name_div, user_name_div);

    let anchor_playlist = document.createElement("a");
    anchor_playlist.setAttribute("href", href); 
    anchor_playlist.appendChild(card_body);

    let dropdown_div = create_dropdown(type, extra_info);

    let card_img = document.createElement("img");
    card_img.classList.add("card-img-top");
    card_img.setAttribute("src", img_url);
    card_img.setAttribute("alt", "playlist img");

    let card_div = document.createElement("div");
    card_div.classList.add("card");
    card_div.classList.add("music-card");
    card_div.append(card_img, dropdown_div, anchor_playlist);

    let most_outer_div = document.createElement("div");
    most_outer_div.classList.add("col-lg-2");
    most_outer_div.appendChild(card_div);
    return most_outer_div;
}

const DROWDOWN_IMG_URL = "public/button/dropdown.png";
function create_dropdown(type, extra_info){
    let dropdown_img = document.createElement("img");
    dropdown_img.classList.add("dropimg");
    dropdown_img.setAttribute("src", DROWDOWN_IMG_URL);
    dropdown_img.setAttribute("width", "1");

    let dropdown_option_default = document.createElement("option");
    dropdown_option_default.setAttribute("value", "");
    dropdown_option_default.selected = true;
    dropdown_option_default.hidden = true;
    dropdown_option_default.disabled = true;
    dropdown_option_default.append(dropdown_img);

    let dropdown_go_user = document.createElement("option");
    dropdown_go_user.setAttribute("value", `redirectToUser:${extra_info.UserID ? extra_info.UserID : extra_info.PlaylistCreator}`);
    dropdown_go_user.classList.add("opt");
    dropdown_go_user.append("Go to artist");

    let dropdown_search = document.createElement("option");
    dropdown_search.setAttribute("value", "share:"); // TBD
    dropdown_search.classList.add("opt");
    dropdown_search.append("Share");

    let dropdown_sessioned_options = create_dropdown_session_related_options(type, extra_info);

    let dropdown = document.createElement("select");
    dropdown.setAttribute("name", "selectoption");
    dropdown.classList.add("dropimg");
    dropdown.onchange = ondropdown_change;
    dropdown.append(dropdown_option_default, dropdown_go_user, dropdown_search);
    dropdown.append(...dropdown_sessioned_options);

    let dropdown_div = document.createElement("div");
    dropdown_div.classList.add("dropdown");
    dropdown_div.append(dropdown);

    return dropdown_div
}


// export function change_login_to_profile(){
//     let user_info = JSON.parse(sessionStorage.getItem("user"));
//     let login_CTA = document.querySelector(".login")
//     login_CTA.style.display = "none";

//     let profile_CTA = document.querySelector(".CTA");
//     let user_img = user_info.UserProfileIMG ? user_info.UserProfileIMG : "public\ProfilePic\DefaultProfilePic.png"
//     console.log(user_img)

//     let ele_user_img = document.createElement("img");
//     ele_user_img.classList.add("user-profile-button");
//     ele_user_img.setAttribute("src", user_img);
//     ele_user_img.setAttribute("alt", "user image");
//     ele_user_img.style.width = "3rem";
//     ele_user_img.style.height = "3rem";
//     ele_user_img.style.borderRadius = "50%";
//     ele_user_img.style.marginRight = "2rem";
//     profile_CTA.append(ele_user_img);

//     // let dropdown_option_logout = document.createElement("option");
//     // dropdown_option_logout.setAttribute("value", "");
//     // dropdown_option_logout.selected = true;
//     // dropdown_option_logout.hidden = true;
//     // dropdown_option_logout.disabled = true;
//     // dropdown_option_logout.append(dropdown_img);

//     // let dropdown = document.createElement("select");
//     // dropdown.setAttribute("name", "selectoption");
//     // dropdown.classList.add("dropimg");
//     // dropdown.onchange = ondropdown_change;
//     // dropdown.append(dropdown_option_default, dropdown_go_user, dropdown_search);
//     // dropdown.append(...dropdown_sessioned_options);

//     // let dropdown_div = document.createElement("div");
//     // dropdown_div.classList.add("dropdown-profile");
//     // dropdown_div.append(dropdown);
// }

function create_dropdown_session_related_options(type, extra_info){
    let dropdown_sessioned_options = [];
    const user = JSON.parse(sessionStorage.getItem("user"));

    if(user && type === "music" && extra_info){ // assume extra_info is Music
        if(user.Role === 1){
            let delete_opt = document.createElement("option");
            delete_opt.classList.add("opt");
            delete_opt.append("Delele this music");
            delete_opt.setAttribute("value", `removeMusic:${extra_info.MusicID}`);
            dropdown_sessioned_options.push(delete_opt);
        }

        let dropdown_optgroup = document.createElement("optgroup");
        dropdown_optgroup.setAttribute("label", "Add to playlist : ")
        dropdown_optgroup.classList.add("opt");
        dropdown_sessioned_options.push(dropdown_optgroup);

        const playlists = user.playlists;
        for(let idx = 0; idx < playlists.length; idx++){
            let add_to_playlist_opt = document.createElement("option");
            add_to_playlist_opt.classList.add("opt");
            add_to_playlist_opt.setAttribute("value", `addToPlaylist:${extra_info.MusicID},${playlists[idx].PlaylistID}`);
            add_to_playlist_opt.append(playlists[idx].PlaylistName);   
            dropdown_sessioned_options.push(add_to_playlist_opt);
        }
    }
    else if(user && type === "user" && extra_info) { // assume extra_info is User (usually other than the one in the session)
        let user_opt = document.createElement("option");
        user_opt.classList.add("opt");
        user_opt.append("Follow this user");
        user_opt.setAttribute("value", `followUser:${user.UserID},${extra_info.UserID}`);
        dropdown_sessioned_options.push(user_opt);

        if(user.Role === 1){
            let delete_opt = document.createElement("option");
            delete_opt.classList.add("opt");
            delete_opt.append("Delele this user");
            delete_opt.setAttribute("value", `removeUser:${extra_info.UserID}`);
            dropdown_sessioned_options.push(delete_opt);
        }
    }
    else if(user && type === "playlist" && extra_info) { // assume extra_info is Playlist
        let playlist_opt = document.createElement("option");
        playlist_opt.classList.add("opt");
        playlist_opt.append("Follow this playlist");
        playlist_opt.setAttribute("value", `followPlaylist:${user.UserID},${extra_info.PlaylistID}`);
        dropdown_sessioned_options.push(playlist_opt);   

        if(user.Role === 1){
            let delete_opt = document.createElement("option");
            delete_opt.classList.add("opt");
            delete_opt.append("Delele this playlist");
            delete_opt.setAttribute("value", `removePlaylist:${extra_info.PlaylistID}`);
            dropdown_sessioned_options.push(delete_opt);
        }
    }
    else{
        console.log("misuse of vertical card function");
    }
    return dropdown_sessioned_options;
}

const ACTION_IN_SELECT = ["addToPlaylist", "followPlaylist", "redirectToUser", "share", "followUser", "removeUser", "removeMusic", "removePlaylist"];
function ondropdown_change(){
    // https://stackoverflow.com/questions/647282/is-there-an-onselect-event-or-equivalent-for-html-select
    const selected_action = this.value;
    console.log(selected_action);
    const [command, params] = selected_action.split(":");
    let music_id, playlist_id, user_id, follower_id;
    switch (command) {
        case ACTION_IN_SELECT[0]: // addToPlaylist:MusicID,PlaylistID
            [music_id, playlist_id] = params.split(",");
            console.log(`${command}: ${music_id} ${playlist_id}`);
            fetch("/api/playlist/add_music",  {
                method: "put",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    MusicID: music_id,
                    PlaylistID: playlist_id
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    console.log(res.message);
                    alert("Error! ")
                    return;
                }
                alert("add music into playlist success!");
            });
            break;
        case ACTION_IN_SELECT[1]: // followPlaylist:UserID,PlaylistID
            [user_id, playlist_id] = params.split(",");
            console.log(`${command}: ${user_id} ${playlist_id}`);
            fetch("/api/playlist/user_follow",  {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    UserID: user_id,
                    PlaylistID: playlist_id
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error && res.message.includes("Duplicate entry")){
                    console.log(res.message);
                    alert("You already follow this playlist");
                    return;
                }
                else if(res.error){
                    console.log(res.message);
                    alert("internal error");
                    return;
                }
                alert("Follow Playlist complete!");
            });
            break;
        case ACTION_IN_SELECT[2]: // redirectToUser:UserID
            user_id = params;
            console.log(`${command}: ${user_id}`);
            window.location.replace(`/user?user_id=${user_id}`); //redirect to ...
            break;
        case ACTION_IN_SELECT[3]: // share:
            console.log(`${command}: `);
            alert("TBD");
            // noop
            break;
        case ACTION_IN_SELECT[4]: // followUser:FolloweeID,FollowerID
            [user_id, follower_id] = params.split(",");
            console.log(`${command}: ${user_id} ${follower_id}`);
            fetch("/api/user/follow", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        FolloweeID : user_id,
                        FollowerID : follower_id
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res.error && res.message.includes("Duplicate entry")){
                        console.log(res.message);
                        alert("You are already follow this dude");
                        return;
                    }
                    else if (res.error){
                        console.log(res.message);
                        alert("internal error");
                        return;
                    }
                    alert("Following complete");
                }
            );
            break;
        case ACTION_IN_SELECT[5]: // removeUser:UserID
            user_id = params;
            fetch("/api/user/remove", {
                method: "delete",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    UserID: user_id
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    console.log(res.message);
                    alert("can't remove user");
                    return;
                }
                alert("remove user complete");
            });
            break;
        case ACTION_IN_SELECT[6]: // removeMusic:MusicID
            music_id = params;
            fetch("/api/music/remove", {
                method: "delete",
                body: JSON.stringify({MusicID: music_id}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    console.log(res.message);
                    alert("can't remove this song");
                    return;
                }
                alert("Remove song complete!");

            });
            break;
        case ACTION_IN_SELECT[7]: // removePlaylist:PlaylistID
            playlist_id = params;
            fetch("/api/playlist/delete", {
                method: "delete",
                body: JSON.stringify({PlaylistID: playlist_id}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    console.log(res.message);
                    alert("can't remove this playlist");
                    return;
                }
                alert("Remove playlist complete!");
            });
            break;
        default:
            console.log(`Command ${selected_action} invalid: misuse of ondropdown_change function`);
            break;
    }
    location.reload();
}

export const EACH_ROW = 5;
const EMPTY_VERTICAL_CARD = create_vertical_card("top text", "bottom text", "/public/ProfilePic/DefaultProfilePic.png", "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  "music", {"UserID" : 1});
const BORDER = document.createElement("div");
BORDER.classList.add("col-lg-1");

export function padding_border(){
    return BORDER.cloneNode(true);
}
export function empty_vertical_card(){
    return EMPTY_VERTICAL_CARD.cloneNode(true);
}

{/* 
<div class="card music-card p-1 m-1">
    <div class="row no-gutters">
        <div class="col-lg-1">
            <img src="public/song1.jpg" class="img-fluid rounded-start card-img-top" alt="...">
        </div>
        <div class="col-lg-auto">
            <div class="card-body p-0">
                <figcaption class="card-title non-top-result-name m-0">One and last</figcaption>
                <figcaption class="card-text non-top-result-type"><a href="artist">Aimer</a></figcaption>
            </div>
        </div>
        <div class="col-lg-1 dropdown">
            <select name="selectoption" class="dropimg" >
                <option value="" selected disabled hidden><img class="dropimg" src="public/button/dropdown.png" alt="choices" width="1"></option>
                <option class="opt" value="redirectToUser:${UserID}">Go to artist</option>
                <option class="opt" value="share:">Share</option>
                <option class="opt" value="followUser:${FolloweeID},${FollowerID}">Follow this user</option>
                <option class="opt" value="followPlaylist:${MusicID},${PlaylistID}">Follow this playlist</option>
                <optgroup class="opt" label="Add to playlist : ">
                <option class="opt" value="addToPlaylist:${MusicID},${PlaylistID}">Playlist Name 1</option>
                ...
            </select>
        </div> 
    </div>
</div>

*/}

export function create_half_horizontal_card(top_text, bottom_text, img_url, href, type, extra_info){
    let card_title = document.createElement("figcaption");
    card_title.classList.add("card-title");
    card_title.appendChild(document.createTextNode(top_text));

    let card_text = document.createElement("figcaption");
    card_text.classList.add("card-text");
    card_text.appendChild(document.createTextNode(bottom_text));

    let card_body_div = document.createElement("div");
    card_body_div.classList.add("card-body", "p-0");
    card_body_div.append(card_title, card_text);
    
    let card_body_div_anchor = document.createElement("a");
    card_body_div_anchor.classList.add("col-lg-10");
    card_body_div_anchor.setAttribute("href", href);
    card_body_div_anchor.append(card_body_div);

    let card_img = document.createElement("img");
    card_img.setAttribute("src", img_url);
    card_img.classList.add("img-fluid", "rounded-start", "card-img-top");

    let card_img_div = document.createElement("div");
    card_img_div.append(card_img);
    card_img_div.classList.add("col-lg-1");

    let dropdown_div = create_dropdown(type, extra_info);
    dropdown_div.classList.add("col-lg-1");

    let inner_card_div = document.createElement("div");
    inner_card_div.classList.add("row", "no-gutters");
    inner_card_div.append(card_img_div, card_body_div_anchor, dropdown_div);

    let card_div = document.createElement("div");
    card_div.classList.add("card", "music-card", "p-1", "m-1");
    card_div.append(inner_card_div);

    return card_div;
}
const EMPTY_HALF_HORIZONTAL_CARD = create_half_horizontal_card("Alpha", "C418", "public/minecraft-volume-alpha.jpg", "/music?music_id=1", "music", {UserID: 1}) // mock up
export function empty_half_horizontal_card(){
    return EMPTY_HALF_HORIZONTAL_CARD.cloneNode(true);
}

export function top_card(top_text, bottom_text, img_url, href, type, extra_info){
    /* 
    Templete of top card
    <a href="${href}">
        <div class="card music-card top-card">
            <div class="row no-gutters fluid">
                <div class="col-md-6">
                    <img src="${img_url}" class="img-fluid rounded-start card-img-top">
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <figcaption class="card-title h6">${top_text}</figcaption>
                        <figcaption class="card-text">${bottom_text}</figcaption>
                    </div>
                </div>
                <dropdrown/>
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

    let card_body_div_wrapper = document.createElement("a");
    card_body_div_wrapper.classList.add("col-md-5");
    card_body_div_wrapper.setAttribute("href", href);
    card_body_div_wrapper.append(card_body);

    let img = document.createElement("img");
    img.setAttribute("src", img_url);
    img.classList.add("img-fluid", "rounded-start", "card-img-top");
    
    let img_div = document.createElement("div");
    img_div.classList.add("col-md-6");
    img_div.append(img);

    let dropdown_div = create_dropdown(type, extra_info);
    dropdown_div.classList.add("col-lg-1");

    let inner_card_div = document.createElement("div");
    inner_card_div.classList.add("row", "no-gutters", "fluid");
    inner_card_div.append(img_div, card_body_div_wrapper, dropdown_div);

    let card_div = document.createElement("div");
    card_div.classList.add("card", "music-card", "top-card");
    card_div.append(inner_card_div);

    return card_div;
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


function construct_row(type){
    const PLAYLIST_ROW = document.createElement("div")
    PLAYLIST_ROW.classList.add("row", `${type}-row`, "my-3");
    const PLAYLIST_ROW_HIDDEN = PLAYLIST_ROW.cloneNode(true);
    PLAYLIST_ROW_HIDDEN.classList.add("default-hidden");
    PLAYLIST_ROW_HIDDEN.hidden = true;
    return [PLAYLIST_ROW, PLAYLIST_ROW_HIDDEN];
}

const [PLAYLIST_ROW, PLAYLIST_ROW_HIDDEN] = construct_row("playlist");
const [MUSIC_ROW, MUSIC_ROW_HIDDEN] = construct_row("music");

export function create_playlist_row(hidden){
    /* 
    templete of row of vertical card
    <div class="row playlist-row my-3">
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
        return PLAYLIST_ROW_HIDDEN.cloneNode(true);
    }
    return PLAYLIST_ROW.cloneNode(true);
}
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
        return MUSIC_ROW_HIDDEN.cloneNode(true)
    }
    return MUSIC_ROW.cloneNode(true);
}


export function horizontal_card(top_text, bottom_text, img_url, href, hidden, type, extra_info){
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

    let card_body_wrapper = document.createElement("a");
    card_body_wrapper.classList.add("card-description", "col-lg-10");
    card_body_wrapper.setAttribute("href", href);
    card_body_wrapper.append(card_body);

    let dropdown_div = create_dropdown(type, extra_info);
    dropdown_div.classList.add("col-lg-1", "vertical-dropdown");

    let row = document.createElement("div");
    row.classList.add("row", "no-gutters");
    row.append(img_div, card_body_wrapper, dropdown_div);

    let whole_card = document.createElement("div");
    whole_card.classList.add("card", "music-card", "p-1", "my-2");
    whole_card.append(row);
    
    let hidden_wrapper = document.createElement("div");
    if (hidden){
        hidden_wrapper.classList.add("music-row", "default-hidden");
        hidden_wrapper.hidden = true;
    }
    hidden_wrapper.append(whole_card);
    return hidden_wrapper;
}

export function change_login_to_profile(){
    
    let user_info = JSON.parse(sessionStorage.getItem("user"));
    if(user_info !== null){
        let login_CTA = document.querySelector(".login")
        login_CTA.style.display = "none";

        let nav = document.querySelector(".CTA");
        let logout_button = document.createElement("button");
        logout_button.classList.add("btn","logout");
        logout_button.append("Log out")
        logout_button.onclick = on_logout;

        nav.append(logout_button);
    }
    
    // let user_img = user_info.UserProfileIMG ? user_info.UserProfileIMG : "public\ProfilePic\DefaultProfilePic.png"

    // let ele_user_img = document.createElement("img");
    // ele_user_img.classList.add("user-profile-button");
    // ele_user_img.setAttribute("src", user_img);
    // ele_user_img.setAttribute("alt", "user image");
    // ele_user_img.style.width = "3rem";
    // ele_user_img.style.height = "3rem";
    // ele_user_img.style.borderRadius = "50%";
    // ele_user_img.style.marginRight = "2rem";
    
 }

function on_logout(){

    sessionStorage.clear();
    window.location.replace(`/`); //redirect to home
    alert("You already logged out!");
    document.querySelector('.btn.logout').style.display = "none";
    // document.querySelector('.login').style.display = "block";
    // logout_button.style.display = "none";
    // login_CTA.style.display = "block";

}
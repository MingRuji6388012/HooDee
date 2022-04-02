const SHOW_ALL_SHOW_LESS_STATES = ["Show all", "Show less"];
function on_showall(id){
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

window.onload = async function() {
    //Music
    let data = await fetch(`/api/music/search_by_musicname/%25`, { 
        method: "GET",
    }).then(res => res.json());
    console.log(data);
    home_music_history_appender(data);

    //Playlist
    let data2 = await fetch(`/musics_in_playlist`, { 
        method: "GET",
    }).then(res => res.json());
    console.log(data2);
    home_playlist_history_appender(data2);
};

function home_music_history_appender(data){
    if(!data.error){
        let parent_node = document.querySelector("#home-music-history-append");
        let top_text, bottom_text, img, href, card_tobe_append;
        let d;
        
        parent_node.hidden = false;
        parent_node.append(padding_border());
        for(let i = 0; i < EACH_ROW; i++){
            if(i < data["musics"].length){
                d = data["musics"][i];
                top_text = d.MusicName
                bottom_text = d.UserName;
                img = d.MusicIMG ? d.MusicIMG : "public/butter.jpg"; // default value
                href = d.MusicFile; // TODO: tbd
                card_tobe_append = create_vertical_card(top_text, bottom_text, img, href);
            }
            else{ // default
                card_tobe_append = empty_vertical_card();
            }
            parent_node.append(card_tobe_append);
        }
        parent_node.append(padding_border());
    }
}

function home_playlist_history_appender(data){
    if(!data.error){
        let parent_node = document.querySelector("#home-playlist-history-append");
        let top_text, bottom_text, img, href, card_tobe_append;
        let d;
        var bottom_img = new Image(2, 2);
        bottom_img.src = 'public/button/earphone.png';

        parent_node.hidden = false;
        parent_node.append(padding_border());
        for(let i = 0; i < EACH_ROW; i++){
            if(i < data["playlists"].length){
                d = data["playlists"][i];
                top_text = d.PlaylistName
                bottom_text = d.bottom_img; //document.body.appendchild(bottom_img)
                img = d.PlaylistIMG ? d.PlaylistIMG : "public/today's hits.jpg"; // default value
                href = d.MusicFile; // TODO: tbd
                card_tobe_append = create_vertical_card(top_text, bottom_text, img, href);
            }
            else{ // default
                card_tobe_append = empty_vertical_card();
            }
            parent_node.append(card_tobe_append);
        }
        parent_node.append(padding_border());
    }
}
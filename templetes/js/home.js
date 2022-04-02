import { 
    EACH_ROW, 
    create_vertical_card, 
    padding_border, 
    empty_vertical_card, 
    create_music_row,
    create_playlist_row
} from "./common.js"


window.onload = async function() {
    //Music
    let musics = fetch(`/api/music/search_by_musicname/%25`, { 
            method: "GET",
        }).then(res => res.json());


    //Playlist
    let playlists = fetch(`/api/playlist/search_by_playlistname/%25`, { 
            method: "GET",  
        }).then(res => res.json());

    musics = await musics;
    playlists = await playlists;
    console.log(musics);
    console.log(playlists);
    home_music_history_appender(musics);
    home_playlist_history_appender(playlists);
};

function home_music_history_appender(musics){
    /*
    <div class="row music-row my-3">
        music card
        music card
        music card
        music card
        music card
    </div>
     */
    if(!musics.error){
        let parent_node = document.querySelector("#home-music-history-append");
        let top_text, bottom_text, img_url, href, card_tobe_append, music, i, j, idx, row, default_hidden = false;
        musics = musics["musics"];
        for(i = 0; i < musics.length/EACH_ROW; i+=1){
            if(i > 0){
                default_hidden = true;
            }
            row = create_music_row(default_hidden);

            row.append(padding_border());
            for(j = 0; j < EACH_ROW; j++){
                idx = EACH_ROW * i + j;
                if(idx < musics.length){
                    music = musics[idx];
                    top_text = music.MusicName
                    bottom_text = music.UserName;
                    img_url = music.MusicIMG ? music.MusicIMG : "public/butter.jpg"; // default value
                    href = music.MusicFile; // TODO: tbd
                    card_tobe_append = create_vertical_card(top_text, bottom_text, img_url, href, "music", music);
                }
                else{ // default
                    card_tobe_append = empty_vertical_card();
                }
                row.append(card_tobe_append);
            }
            row.append(padding_border());
            parent_node.append(row);
        }
        parent_node.hidden = false;
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
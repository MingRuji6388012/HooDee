import { 
    EACH_ROW, 
    create_vertical_card, 
    padding_border, 
    empty_vertical_card, 
    // create_half_horizontal_card, 
    // empty_half_horizontal_card, 
    // top_card 
} from "./common.js"

window.onload = async function() {
    // will change to search history later
    
    // i believe %25 is wide card for searching
    let data = await fetch(`/api/music/search_by_musicname/%25`, { 
        method: "GET",
    }).then(res => res.json());
    console.log(data);
    search_history_appender(data);
};

function search_history_appender(data){
    if(!data.error){
        let parent_node = document.querySelector("#search-history-append");
        let top_text, bottom_text, img, href, card_tobe_append;
        let d;
        
        parent_node.hidden = false;
        parent_node.append(padding_border());
        for(let i = 0; i < EACH_ROW; i++){
            if(i < data["musics"].length){
                d = data["musics"][i];
                top_text = d.MusicName
                bottom_text = d.UserName;
                img = d.MusicIMG ? d.MusicIMG : "public/what is love.jpg"; // default value
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


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

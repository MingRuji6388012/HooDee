// used in every where that has search bar
function on_click_cross(id){
    elem = document.getElementById(id);
    console.log(elem.value);
    elem.value = "";
}
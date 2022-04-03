window.onload = function(){
    if(sessionStorage.getItem("user")){
        window.location.replace(`/`); //redirect to home page
    }
};

function on_login(){
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;
    const fa_2 = document.querySelector("2FA-input").value;
    const auth = { "User": {"Email": email,"Password": password,"2FA": fa_2} };
    fetch("/api/user/authentication", {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: "POST",
        body: JSON.stringify(auth),
    })
    .then(res => res.json())
    .then(res => {
        if(!res.error && res.authenticate){
            let user = res.user;
            fetch(`/api/playlist/search_by_userid/${user.UserID}`)
            .then(res => res.json())
            .then(res => {
                if(!res.error){
                    user["Playlists"] = res.playlists;
                }
                else{
                    console.log("error fetching playlist: ");
                    console.log(res.message);
                    user["Playlists"] = [];
                }
                sessionStorage.setItem("user", JSON.stringify(user));
                let user_info = JSON.parse(sessionStorage.getItem("user"));
                let user_img = user_info.UserProfileIMG
                console.log(user_img)
                window.location.replace("/"); //Redirect to HOME -> Redirect to 2FA Page
                // then we can just check for login session by `sessionStorage.getItem("user") !== null`
            });
        }
        else{
            alert("Login failed");
        }
    });
}





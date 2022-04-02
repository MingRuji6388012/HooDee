
function on_login(){
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;
    const auth = { "User": {"Email": email,"Password": password} };
    fetch("/api/user/authentication", {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: "POST",
        body: JSON.stringify(auth),
    })
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        if(!res.error && res.authenticate){
            sessionStorage.setItem("user", JSON.stringify(res.user));
            let user_info = JSON.parse(sessionStorage.getItem("user"));
            let user_img = user_info.UserProfileIMG
            console.log(user_img)
            // console.log(sessionStorage.getItem("user")); 
            // console.log(JSON.parse(sessionStorage.getItem("user")).UserProfileIMG)
            // then we can just check for login session by `sessionStorage.getItem("user") !== null`
            window.location.replace("/");
        }
    });
}




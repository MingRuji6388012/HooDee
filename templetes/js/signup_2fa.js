// window.onload = function(){
//     if(sessionStorage.getItem("user")){
//         window.location.replace(`/`); //redirect to home page
//     }
// };

window.onload = async function() {
    let QR_IMG_FROM_SESSION = sessionStorage.getItem("qr"); //Get QR code IMG from session 
    let QR_div = document.querySelector("#please-appear-here");

    console.log(QR_IMG_FROM_SESSION);
    let QR_IMG = document.createElement("img");
    QR_IMG.classList.add("QR","img");
    QR_IMG.setAttribute("src", QR_IMG_FROM_SESSION)

    QR_div.append(QR_IMG);
};

function on_signup_2fa(){
    const code = document.querySelector("#code").value;
    const email = sessionStorage.getItem("email");

    fetch("/api/user/sign-up-2fa", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: code,
            email: email
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.error){
            console.log(res.message);
            return; 
        }
        sessionStorage.setItem("token", res.token);
        window.location.replace(`/`);
    });
    // const auth = { "User": {"Email": email,"First name": fname,"Last name": lname, "Username": username, "Password": password} };
    
    // fetch("/api/user/registeration", {
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify(auth),
    // })
    // .then(res => res.json())
    // .then(res => {
    //     if(!res.error){
    //     }
    //     else{
    //         alert("Sign up failed");
    //     }
    //     window.location.replace("/signup-2fa");
    // });

}





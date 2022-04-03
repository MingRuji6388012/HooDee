// window.onload = function(){
//     if(sessionStorage.getItem("user")){
//         window.location.replace(`/`); //redirect to home page
//     }
// };

window.onload = async function() {
    let QR_IMG_FROM_SESSION = JSON.parse(sessionStorage.getItem("")); //Get QR code IMG from session 
    let QR_div = document.querySelector(".QR-show");

    let QR_IMG = document.createElement("img");
    QR_IMG.classList.add("QR","img");

    QR_div.append(QR_IMG);
};

function on_signup_2fa(){
    const code = document.querySelector("#code").value;

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





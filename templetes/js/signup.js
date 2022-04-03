window.onload = function(){
    if(sessionStorage.getItem("user")){
        window.location.replace(`/`); //redirect to home page
    }
};

function on_signup(){
    const email = document.querySelector("#email").value;
    const fname = document.querySelector("#FirstName").value;
    const lname = document.querySelector("#LastName").value;
    const username = document.querySelector("#UserName").value;
    const password = document.querySelector("#Password").value;

    const auth = { "User" : {"Email": email, "FirstName": fname, "Lastname": lname, "UserName": username, "Password": password} };
    console.log(auth);
    fetch("/api/user/registeration", {
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(auth),
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(!res.error){
            console.log(res.qr);
            console.log(res.email);
            sessionStorage.setItem("qr", res.qr);
            sessionStorage.setItem("email", res.email);

            window.location.replace(`/signup-2fa`); //Redirect to 2FA Page
        }
        else{
            alert("Sign up failed");
        }
    });
}





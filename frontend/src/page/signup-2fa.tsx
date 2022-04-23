import { Component } from "react";
import { signup2FA } from "../controller/UserController";
import "../css/signup-2fa.css"

interface SignUp2FAPageState {
    code: string;
    qr: string;
}
class SignUp2FAPage extends Component<{}, SignUp2FAPageState>{

    constructor(props:any){
        super(props);
        let qr = sessionStorage.getItem("qr");
        if(qr === null) {window.location.replace(`/`); return;}
        this.state = {
            code: "",
            qr: qr
        }
        this.onSignUp2FA = this.onSignUp2FA.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
    }

    onSignUp2FA(_:any){
        const code = this.state.code
        const email = sessionStorage.getItem("email");
        console.log(email);
        if(!email) {window.location.replace("/signup"); return;}
        signup2FA(code, email).then(res => {
            console.log(res);
            if(res.error){
                console.log(res.message);
                alert("auth fail, try again");
            }
            else{
                sessionStorage.setItem("token", res.token);   
                window.location.replace(`/login`);
            }
        });
    }

    onCodeChange(e: {target: {value:string}}) {
        this.setState({
            code: e.target.value
        });
    }

    render() {
        return (
            <div className="container mx-auto mt-4">
                <h1>Sign Up - Set 2FA</h1>
                <div>
                    <p>Scan the QR Code in the <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US">Authenticator app</a> then enter the code that you see in the app in the text field and click Submit.</p>
                    <div className="QR-show"></div>
                    <div id="please-appear-here">
                        <img src={this.state.qr} alt="hopefully qrcode"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">2FA Code</label>
                        <input type="text" className="form-control" id="code" name="code" onChange={this.onCodeChange}/>
                    </div>
                    <div className="signup-button-block">
                        <button className="btn signup-button-submit" value="Sign up" onClick={this.onSignUp2FA}>Sign up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp2FAPage;
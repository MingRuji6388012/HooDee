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
                window.location.replace("/signup")
                alert("auth fail, try again");
                return; 
            }
            sessionStorage.setItem("token", res.token);
            window.location.replace(`/login`);
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
                    <p>Scan the QR Code in the Authenticator app then enter the code that you see in the app in the text field and click Submit.</p>
                    <div className="QR-show"></div>
                    <div id="please-appear-here">
                        <img src={this.state.qr} alt="hopefully qrcode"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">2FA Code</label>
                        <input type="text" className="form-control" id="code" name="code" onChange={this.onCodeChange}/>
                    </div>
                    <div className="role-selection">
                        <div className="form-check form-check-inline d-flex justify-content-end">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="user-radio-button" value="user" defaultChecked/>
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check form-check-inline d-flex justify-content-end">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="artist-radio-button" value="artist"/>
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check form-check-inline d-flex justify-content-end">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="admin-radio-button" value="admin"/>
                            <label className="form-check-label">3</label>
                        </div>
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
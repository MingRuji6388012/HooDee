import { Component } from "react";
import { searchPlaylistsByUserID } from "../controller/PlaylistController";
import { login } from "../controller/UserController";
import "../css/login.css";

interface LoginPageState {
    email: string;
    password: string;
    fa2: string;
}
class LoginPage extends Component<{},  LoginPageState> {
    constructor(props:any){
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFA2Change = this.onFA2Change.bind(this);
        
    }
    
    onLogin(){
        login(this.state.email, this.state.password, this.state.fa2).then(res => {
            console.log(JSON.stringify(res));
            if(!res.error && res.authenticate){
                let user = res.user, token = res.token;
                searchPlaylistsByUserID(user.UserID).then((res) => {
                    user.Playlists = !res.error && res.playlists !== null? res.playlists : [];
                    sessionStorage.clear();
                    console.log(JSON.stringify(user));
                    sessionStorage.setItem("user", JSON.stringify(user));
                    sessionStorage.setItem("token", token);
                    window.location.replace("/"); //Redirect to HOME -> Redirect to 2FA Page
                });
            }
            else{
                alert("Login failed");
            }
        });
    }
    
    onEmailChange(e:any){
        this.setState({
            email : e.target.value
        });
    }
    onPasswordChange(e:any){
        this.setState({
            password : e.target.value
        });
    }
    onFA2Change(e:any){
        this.setState({
            fa2 : e.target.value
        });
    }

    render(){
        return (
            <section className="container">
                <div className="logo-form">
                    <img className="figure-img" src="/logo/Logo.png" alt="logo" height="120" />
                </div>
                <form>
                    <div className="row input-fields">
                        <div className="email-label">
                            <label>Email</label>
                        </div>
                        <div className="email-input">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control input-field" id="email-input" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" name="email" onChange={this.onEmailChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="row input-fields">
                        <div className="password-label">
                            <label>Password</label>
                        </div>
                        <div className="password-input">
                            <div className="input-group mb-3">
                                <input type="password" className="form-control input-field" id="password-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" name="password" onChange={this.onPasswordChange}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row input-fields">
                        <div className="2FA-label">
                            <label>2FA</label>
                        </div>
                        <div className="2FA-input">
                            <div className="input-group mb-3">
                                <input type="code" className="form-control input-field" id="TwoFA-input" placeholder="Your 6 digits 2FA code" aria-label="code" aria-describedby="basic-addon1" name="fa2" onChange={this.onFA2Change}/>
                            </div>
                        </div>
                    </div>
                    <div className="login-button-block">
                        <input type="button" className="btn login-button-submit" value="Log in" onClick={this.onLogin} />
                    </div>
                </form>
                <p className="mt-lg-4 go_signup">
                    Don't have an account? <a className="sign-up" href="signup" >Sign Up</a>
                </p>
            </section>
        );
    }
}

export default LoginPage;
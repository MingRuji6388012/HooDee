import { Component } from "react";
import { ROLES } from "../common";
import { signup } from "../controller/UserController";
import "../css/signup.css"

interface SignUpPageState {
    email:string;
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    role: number;
}
interface SignUpPageInitState{
    firstname:string;
    lastname:string;
    username:string;
    role: number;
    userIMG?: string;
}
class SignUpPage extends Component<SignUpPageInitState, SignUpPageState>{

    constructor(props:SignUpPageInitState){
        super(props);
        this.state = {
            email:"",
            firstname: props.firstname,
            lastname: props.lastname,
            username: props.username,
            password:"",
            role: props.role
        };
        this.onSignup = this.onSignup.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFirstnameChange = this.onFirstnameChange.bind(this);
        this.onLastnameChange = this.onLastnameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
    }

    onSignup(_:any){
        signup(this.state.email, this.state.firstname, this.state.lastname, this.state.username, this.state.password, this.state.role).then((res) => {
            console.log(res);
            if(!res.error){
                sessionStorage.setItem("qr", res.qr);
                sessionStorage.setItem("email", res.email);
                window.location.replace(`/signup-2fa`); //Redirect to 2FA Page
            }
            else{
                alert("Sign up failed");
            }
        });
    }
    
    onEmailChange(e: {target: {value: string}}){
        this.setState({
            email: e.target.value
        });
    }

    onFirstnameChange(e: {target: {value: string}}){
        this.setState({
            firstname: e.target.value
        });
    }
    
    onLastnameChange(e: {target: {value: string}}){
        this.setState({
            lastname: e.target.value
        });
    }

    onUsernameChange(e: {target: {value: string}}){
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e: {target: {value: string}}){
        this.setState({
            password: e.target.value
        });
    }

    onRoleChange(e: any){
        this.setState({
            role: Number(e.target.value)
        })
    }

    render(){
        return (
            <div className="container mx-auto mt-4">
                <h1 className="header-add">Sign Up</h1>
                <form >
                    <div className="profile-img-block d-flex justify-content-center">
                        <img className="profile-pic" src={this.props.userIMG || "/ProfilePic/DefaultProfilePic.png"} alt="Default Profile Pic" width="150" height="150"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onEmailChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <input className="form-control" id="FirstName" name="FirstName" value={this.state.firstname} onChange={this.onFirstnameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <input className="form-control" id="LastName" name="LastName" value={this.state.lastname} onChange={this.onLastnameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" id="UserName" name="UserName" value={this.state.username} onChange={this.onUsernameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password" value={this.state.password} onChange={this.onPasswordChange}/>
                    </div>
                    <div className="role-selection d-flex justify-content-center" onChange={this.onRoleChange}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="user-radio-button" value={ROLES.user} defaultChecked={this.props.role === ROLES.user}/>
                            <label className="form-check-label">User</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="artist-radio-button" value={ROLES.artist} defaultChecked={this.props.role === ROLES.artist}/>
                            <label className="form-check-label">Artist</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="admin-radio-button" value={ROLES.admin} defaultChecked={this.props.role === ROLES.admin}/>
                            <label className="form-check-label">Admin</label>
                        </div>
                    </div>
                    <div className="signup-button-block">
                        <input type="button" className="btn signup-button-submit" value="Sign up" onClick={this.onSignup} />
                    </div>
                </form>
                <div className="go_login">
                    <p className="mt-4">
                        Have an account? <a className="login_col" href="/login">Login</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
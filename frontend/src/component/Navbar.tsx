import { Component } from "react";
import { refetchUserInfo, ROLES } from "../common";
import "../css/navbar.css";
import { UserButInSessionStorage } from "../model/User";

interface NavbarState{
    buttonLogInOut: JSX.Element | null;
    sessionFeatures: JSX.Element[];
}
class Navbar extends Component<{}, NavbarState> {
    constructor(props:any){
        super(props);
        this.state = {
            buttonLogInOut: null,
            sessionFeatures: []
        };
    }

    updateLoginButton(user: UserButInSessionStorage | null){
        let text, className, onClick;
        if(!user) {
            text = "Log in";
            className = "";
            onClick = () => window.location.href = "/login";
        }
        else {
            text = "Log out";
            className = "logout btn"
            onClick = () => {
                sessionStorage.clear();
                window.location.replace(`/`); //redirect to home
                alert("You already logged out!");
            }
        }
        this.setState({
            buttonLogInOut: <button className={className} onClick={onClick}>{text}</button>
        });
    }

    componentDidMount(){
        let userJSON = sessionStorage.getItem("user");
        let user = null;
        if(userJSON){
            refetchUserInfo().then(() => {
                userJSON = sessionStorage.getItem("user") as string;
                user = JSON.parse(userJSON) as UserButInSessionStorage;
                this.addAdminFeatures(user)
                this.updateLoginButton(user);
            }).catch(() => {
                console.log("fetch failed");
            });
        }
        else{
            this.updateLoginButton(user);
        }
    }

    addAdminFeatures(_:UserButInSessionStorage){
        this.setState({
            sessionFeatures: [
                <li className="nav_items" key="add">
                    <a href="add">Add</a>
                </li>
            ]
        });
    }

    render() {
        return (
            <header className="navbar">
                <a className="home" href="/">
                    <img className="logo" src="/logo/Logo.png" alt="logo"/>
                </a>
                <nav>
                    <ul className="nav_links">
                        {this.state.sessionFeatures}
                        <li className="nav_items" key="search">
                            <a href="search">Search</a>
                        </li>
                        <li className="nav_items" key="about us">
                            <a href="about_us">About Us</a>
                        </li>
                        <li key="buttonlog">
                            {this.state.buttonLogInOut}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navbar;
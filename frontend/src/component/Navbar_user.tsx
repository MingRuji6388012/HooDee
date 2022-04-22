import { Component } from "react";
import { refetchUserInfo } from "../common";
import "../css/navbar.css";

interface NavbarState{
    isLoggedin: boolean;
    buttonLogInOut: JSX.Element | null;
}
class Navbar_user extends Component<{}, NavbarState> {
    constructor(props:any){
        super(props);
        let userJSON = sessionStorage.getItem("user");
        this.state = {
            isLoggedin: userJSON === null,
            buttonLogInOut: null
        };
    }

    updateLoginButton(){
        let text, className, onClick;
        if(this.state.isLoggedin) {
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
        console.log("refetching");
        refetchUserInfo();
        this.updateLoginButton();
    }

    render() {
        return (
            <header className="navbar">
                <a className="home" href="/">
                    <img className="logo" src="/logo/Logo.png" alt="logo"/>
                </a>
                <nav>
                    <ul className="nav_links">
                        <li className="nav_items">
                            <a href="search">Search</a>
                        </li>
                        <li className="nav_items">
                            <a href="about_us">About Us</a>
                        </li>
                        <li>
                            {this.state.buttonLogInOut}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navbar_user;
import { Component } from "react";
import "../css/navbar.css"


class Navbar extends Component {
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
                    </ul>
                    <div className="CTA"> 
                        <a className="login" href="login">
                            <button>Log in</button>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Navbar;
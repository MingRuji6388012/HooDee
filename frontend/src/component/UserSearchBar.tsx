import { Component, ReactNode } from "react";
import SearchBar from "./SearchBar";
import QuantifierRadioButtonForSearch from "./QuantifierRadioButton";

class UserSearchBar extends Component{

    render(): ReactNode {
        return (
            <div className="bar container px-0 my-5">
                <form action="/result" method="GET">
                    <SearchBar/>
                    <QuantifierRadioButtonForSearch/>
                </form>
            </div>
        );
    }
}

export default UserSearchBar;
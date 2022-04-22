import { Component, ReactNode } from "react";
import { get_parameter } from "../common";
import "../css/search_bar.css";
export interface SearchBarState {
    queryText:string;
}

class SearchBar extends Component<{}, SearchBarState> {
    constructor(prop:any){
        super(prop);
        let $_GET = get_parameter() as SearchBarState;
        this.state = {
            queryText: $_GET["queryText"] !== undefined ? $_GET["queryText"] : "",
        };
        this.onClickCross = this.onClickCross.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    onClickCross(e:any){
        this.setState({queryText: ""});
    }

    handleTextChange(e:any) {
        this.setState({queryText: e.target.value});
    }

    render(): ReactNode {
        console.log(this.state.queryText);
        return (    
            <div className="bar container px-0 my-5">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="search_bar input-group-text">
                            <img src="button/magnifier_white.png" height="34" alt="magnifier_white"/>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search bar" aria-label="Search bar" aria-describedby="basic-addon1" id="search-bar" name="queryText" value={this.state.queryText} onChange={this.handleTextChange}/>
                    <div className="input-group-append">
                        <span className="search_bar input-group-text" onClick={this.onClickCross}>
                            <img src="button/cross.png" height="34" alt="click to clear text"/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
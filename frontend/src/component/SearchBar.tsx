import { Component, ReactNode } from "react";
import { get_parameter } from "../common";
import "../css/search_bar.css";
interface stateSearchBar {
    queryText:string;
    quantifier:string;
}

class SearchBar extends Component<any, stateSearchBar> {
    constructor(prop:any){
        super(prop);
        let $_GET = get_parameter() as stateSearchBar;
        this.state = {
            queryText: $_GET["quantifier"] !== undefined ? $_GET["quantifier"] : "",
            quantifier: $_GET["queryText"] !== undefined ? $_GET["queryText"] : "all"
        };
        this.onClickCross = this.onClickCross.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    onClickCross(e:any){
        this.setState({queryText: ""});
    }

    handleTextChange(e:any) {
        this.setState({queryText: e.target.value});
    }
    handleRadioChange(e:any){
        this.setState({quantifier: e.target.value});
    }
    render(): ReactNode {
        return (
            <div className="bar container px-0 my-5">
                <form action="/result" method="GET">
                    
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

                    
                    <div className="row my-3 search-mode-radio-button" onChange={this.handleRadioChange}>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                            <input className="form-check-input" type="radio" name="quantifier" id="all-radio-button" value="all" checked={this.state.quantifier === "all"}/>
                            <label className="form-check-label">All</label>
                        </div>
                        <div className="col-lg-1 form-check form-check-inlines mx-0 px-4">
                            <input className="form-check-input" type="radio" name="quantifier" id="user-radio-button" value="user" checked={this.state.quantifier === "user"}/>
                            <label className="form-check-label">User</label>
                        </div>
                        <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                            <input className="form-check-input" type="radio" name="quantifier" id="music-radio-button" value="music" checked={this.state.quantifier === "music"}/>
                            <label className="form-check-label">Music</label>
                        </div>
                        <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                            <input className="form-check-input" type="radio" name="quantifier" id="playlist-radio-button" value="playlist" checked={this.state.quantifier === "playlist"}/>
                            <label className="form-check-label">Playlist</label>
                        </div>
                        <div className="col-lg-6 done-button mx-0 px-4">
                            <input className="btn justify-content-end" type="submit" value="Done"/>
                        </div>
                        <div className="col-lg-1"></div>

                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
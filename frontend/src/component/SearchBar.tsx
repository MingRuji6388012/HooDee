import { Component, ReactNode } from "react"
import "../css/search_bar.css"
import "../css/search.css"

// async function on_search(){
//     // e.preventDefault(); // for f*cking jquery
//     const query_text = document.getElementById("search-bar").value;
//     if(!query_text.length){
//         console.log("please fill something into the text field");
//         return;
//     }
//     const all_quatifier = document.getElementById("all-radio-button").checked || false;
//     const user_quatifier = document.getElementById("user-radio-button").checked || false;
//     const music_quatifier = document.getElementById("music-radio-button").checked || false;
//     const playlist_quatifier = document.getElementById("playlist-radio-button").checked || false;

//     let user_list = null, music_list = null, playlist_list = null; 
//     if(all_quatifier || user_quatifier){
//         user_list = fetch(`/api/user/search_by_username?UserName=${query_text}`, {
//             method: "GET",
//         })
//     }
//     if(all_quatifier || music_quatifier){
//         console.log(query_text);
//         console.log(`/api/music/search_by_musicname/${query_text}`);
//         music_list = fetch(`/api/music/search_by_musicname/${query_text}`, {
//             method: "GET",
//         })
//     }
//     if(all_quatifier || playlist_quatifier){
//         playlist_list = fetch(`/api/playlist/search_by_playlistname/${query_text}`, {
//             method: "GET",
//         })
//     }
//     let data = {
//         user: await (user_list.then(res => res.json())),
//         music: await (music_list.then(res => res.json())),
//         playlist: await (playlist_list.then(res => res.json()))
//     };
//     console.log(data);
// }

interface stateSearchBar {
    queryText:string;
    quantifier:string;
}

class SearchBar extends Component<any, stateSearchBar> {
    constructor(prop:any){
        super(prop);
        this.state = {
            queryText: "",
            quantifier: "all"
        };
        this.onClickCross = this.onClickCross.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    onClickCross(e:any){
        this.setState({["queryText"]: ""});
        // this.state.queryText = "";
    }

    handleTextChange(e:any) {
        this.setState({["queryText"]: e.target.value});
    }
    handleRadioChange(e:any){
        this.setState({["quantifier"]: e.target.value});
    }
    render(): ReactNode {
        return (
            <div className="bar container px-0 my-5">
                <form action="/result" method="GET">
                    
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="search_bar input-group-text">
                                <img src="button/magnifier_white.png" height="34"/>
                            </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Search bar" aria-label="Search bar" aria-describedby="basic-addon1" id="search-bar" name="queryText" value={this.state.queryText} onChange={this.handleTextChange}/>
                        <div className="input-group-append">
                            <span className="search_bar input-group-text" onClick={this.onClickCross}>
                                <img src="button/cross.png" height="34"/>
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
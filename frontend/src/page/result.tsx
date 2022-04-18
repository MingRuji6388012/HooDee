import { Component, ReactNode } from "react";
import SearchBar from "../component/SearchBar";
import RowVerticalCard from "../component/RowVerticalCard";
import { QueryManyMusics } from "../model/Music";
import { QueryManyUsers } from "../model/User";
import { QueryManyPlaylists } from "../model/Playlist";


function get_parameter(): object{
    // return dict of get parameter, like $_GET in PHP
    const url = window.location.href;
    let url_split = url.split("?");
    let parameters = url_split[1].split("&");
    let dict:any = {};
    parameters.forEach(element => {
        let [key, value] = element.split("=");
        dict[key] = value;
    });
    return dict;
}

interface resultQuery {
    // ?queryText=text&quantifier=all
    queryText: string;
    quantifier: string;
}
const EACH_ROW = 5;
class Result extends Component <{}, {userComponents:JSX.Element[], musicComponents:JSX.Element[], playlistComponents:JSX.Element[]}> {

    constructor(props:any){
        super(props);
        this.state = {
            userComponents: [],
            musicComponents: [],
            playlistComponents: []
        };
    }

    componentDidMount(){
        
        const $_GET = get_parameter() as resultQuery;
        console.log($_GET);
        const {queryText, quantifier} = $_GET;
    
        let user_list = null, music_list = null, playlist_list = null;
        if(quantifier === "user" || quantifier === "all"){
            user_list = fetch(`http://localhost:3001/api/user/search_by_username?UserName=${queryText}`, {
                method: "GET",
            }).then(res => res.json());
        }
        if(quantifier === "music" || quantifier === "all"){
            music_list = fetch(`http://localhost:3001/api/music/search_by_musicname/${queryText}`, {
                method: "GET",
            }).then(res => res.json());
        }
        if(quantifier === "playlist" || quantifier === "all"){
            playlist_list = fetch(`http://localhost:3001/api/playlist/search_by_playlistname/${queryText}`, {
                method: "GET",
            }).then(res => res.json());
        }
        Promise.all([user_list, music_list, playlist_list]).then((values) => {
            const [users, musics, playlists] = values as [QueryManyUsers, QueryManyMusics, QueryManyPlaylists];
            let hidden = false;
            console.log(users, musics, playlists);
            let userComponents = [], playlistComponents = [], musicComponents = [];
            for(let idx = 0; users !== null && users.users !== null && idx < users.users.length; idx+=EACH_ROW){
                const users5 = users.users.slice(idx, idx+EACH_ROW);
                userComponents.push(
                    <RowVerticalCard users={users5} type={"user"} hidden={hidden}/>
                );
                hidden = true; // hidden after first row
            }

            hidden = false;
            for(let idx = 0; musics !== null && musics.musics !== null && idx < musics.musics.length; idx+=EACH_ROW){
                const musics5 = musics.musics.slice(idx, idx+EACH_ROW);
                musicComponents.push(
                    <RowVerticalCard musics={musics5} type={"music"} hidden={hidden} />
                );
                hidden = true; // hidden after first row
            }

            hidden = false;
            for(let idx = 0; playlists !== null && playlists.playlists !== null && idx < playlists.playlists.length; idx+=EACH_ROW){
                const playlists5 = playlists.playlists.slice(idx, idx+EACH_ROW);
                playlistComponents.push(
                    <RowVerticalCard playlists={playlists5} type={"playlist"} hidden={hidden}/>
                );
                hidden = true; // hidden after first row
            }
            this.setState({userComponents: userComponents, musicComponents: musicComponents, playlistComponents: playlistComponents}); // "setting state here will trigger re-rendering", got it bro 👍
        });
    }

    render(): ReactNode {
        return (
            <div>
                <SearchBar />
                <div className="container music-container">
                    <div id="top-music">
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Top result</div>
                            <div className="col-lg-4 music-title">Musics</div>
                            <div className="col-lg-2 showall"><a href="">Show all</a></div>
                            <div className="col-lg-1"></div>
                        </div>
                        
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4" id="top-music-append"></div>
                            <div className="col-lg-6" id="music-append"></div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                    <div id="playlist">
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Playlist</div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-2 showall"><a href="">Show all</a></div>
                            <div className="col-lg-1"></div>
                        </div>
            
                        <div className="row my-3 history-row" id="playlist-append">
                            {this.state.playlistComponents}
                        </div>
                    </div>
                    <div id="artist">
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Artist</div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-2 showall"><a href="">Show all</a></div>
                            <div className="col-lg-1"></div>
                        </div>
            
                        <div className="row my-3 history-row" id="user-append">
                            {this.state.userComponents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;
import { Component, ReactNode } from "react";
import SearchBar from "../component/SearchBar";
import RowVerticalCard from "../component/RowVerticalCard";
import { MusicWithUserName, QueryManyMusics } from "../model/Music";
import { QueryManyUsers } from "../model/User";
import { QueryManyPlaylists } from "../model/Playlist";
import { EACH_ROW } from "../setting";
import "../css/result.css";
import HalfHorizontalCard from "../component/HalfHorizonalCard";
import HalfTopCard from "../component/HalfTopCard";
import { get_parameter } from "../common";
import { seachUsersByUserName } from "../controller/UserController";
import { searchMusicsByMusicName } from "../controller/MusicController";
import { searchPlaylistsByPlaylistName } from "../controller/PlaylistController";
interface resultQuery {
    // ?queryText=text&quantifier=all
    queryText: string;
    quantifier: string;
}

interface resultState {
    userFetch: QueryManyUsers;
    musicFetch: QueryManyMusics;
    playlistFetch: QueryManyPlaylists;
    userComponents: JSX.Element[];
    topMusicComponent: JSX.Element | null;
    musicComponents: JSX.Element[];
    playlistComponents: JSX.Element[];
    userHidden: boolean;
    musicHidden: boolean;
    playlistHidden: boolean;
    quantifier: string;
    updateHtml: {
        playlistShowall: string,
        musicShowall: string,
        userShowall: string
    };
}

class ResultPage extends Component <{}, resultState> {

    constructor(props:any){
        super(props);
        this.state = {
            userFetch: {
                error: true,
                users: null,
                message: ""
            },
            playlistFetch: {
                error: true,
                playlists: null,
                message: ""
            },
            musicFetch: {
                error: true,
                musics: null,
                message: ""
            },
            userComponents: [],
            topMusicComponent: null,
            musicComponents: [],
            playlistComponents: [],
            userHidden: true,
            musicHidden:true,
            playlistHidden: true,
            quantifier: "",
            updateHtml: {
                playlistShowall: "Show all",
                musicShowall: "Show all",
                userShowall: "Show all"
            }
        };
        this.handlePlaylistShowall = this.handlePlaylistShowall.bind(this);
        this.handleUserShowall = this.handleUserShowall.bind(this);
        this.handleMusicShowall = this.handleMusicShowall.bind(this);
    }

    componentDidMount(){
        const $_GET = get_parameter() as resultQuery;
        console.log($_GET);
        const {queryText, quantifier} = $_GET;
        this.setState({quantifier: quantifier});
    
        let user_list = null, music_list = null, playlist_list = null;
        if(quantifier === "user" || quantifier === "all"){
            user_list = seachUsersByUserName(queryText);
        }
        if(quantifier === "music" || quantifier === "all"){
            music_list = searchMusicsByMusicName(queryText);
        }
        if(quantifier === "playlist" || quantifier === "all"){
            playlist_list = searchPlaylistsByPlaylistName(queryText);
        }
        Promise.all([user_list, music_list, playlist_list]).then((values) => {
            const [users, musics, playlists] = values as [QueryManyUsers, QueryManyMusics, QueryManyPlaylists];
            this.setState({userFetch: users, musicFetch: musics, playlistFetch: playlists});
            console.log(users, musics, playlists);
            this.updateComponent();
        });
    }

    updateComponent(){
        const users = this.state.userFetch, musics = this.state.musicFetch, playlists = this.state.playlistFetch;
        let userComponents = [], playlistComponents = [], musicComponents = [], topMusicComponent = null;

        if(this.state.quantifier === "user" || this.state.quantifier === "all"){
            for(let idx = 0; users !== null && users.users !== null && idx < users.users.length; idx+=EACH_ROW){
                const users5 = users.users.slice(idx, idx+EACH_ROW);
                userComponents.push(
                    <RowVerticalCard users={users5} type={"user"}/>
                );
                if(this.state.userHidden) break;
            }
        }
        if((this.state.quantifier === "music" || this.state.quantifier === "all") && musics !== null && musics.musics !== null){
            let music: MusicWithUserName = musics.musics[0];
            topMusicComponent = <HalfTopCard  top_text={music.MusicName} bottom_text={music.UserName} img_url={music.MusicIMG} href={music.MusicFile} type={"music"} extra_info={music}/>
            
            for(let idx = 1; idx < musics.musics.length; idx++){
                music = musics.musics[idx];
                musicComponents.push(
                    <HalfHorizontalCard top_text={music.MusicName} bottom_text={music.UserName} img_url={music.MusicIMG} href={music.MusicFile} type={"music"} extra_info={music}/>
                );
                if(this.state.musicHidden && musicComponents.length >= EACH_ROW-1) break;
            }
        }
        
        if(this.state.quantifier === "playlist" || this.state.quantifier === "all"){
            for(let idx = 0; playlists !== null && playlists.playlists !== null && idx < playlists.playlists.length; idx+=EACH_ROW){
                const playlists5 = playlists.playlists.slice(idx, idx+EACH_ROW);
                playlistComponents.push(
                    <RowVerticalCard playlists={playlists5} type={"playlist"}/>
                );
                if(this.state.playlistHidden) break;
            }
        }
        this.setState({
            userComponents: userComponents, 
            musicComponents: musicComponents, 
            playlistComponents: playlistComponents, 
            topMusicComponent: topMusicComponent
        }, () => {
            this.forceUpdate()
        });
    }


    handlePlaylistShowall(e: any){
        this.setState({
            playlistHidden: !this.state.playlistHidden, 
            updateHtml:{
                playlistShowall: this.state.updateHtml.playlistShowall === "Show all" ? "Show less" : "Show all",
                musicShowall: this.state.updateHtml.musicShowall,
                userShowall: this.state.updateHtml.userShowall
            }
        }, () => { // setState is async method, FOR REAL DUDE?
            this.updateComponent();
        });
    }

    handleUserShowall(e: any){
        this.setState({
            userHidden: !this.state.userHidden,
            updateHtml:{
                playlistShowall: this.state.updateHtml.playlistShowall,
                musicShowall: this.state.updateHtml.musicShowall,
                userShowall: this.state.updateHtml.userShowall  === "Show all" ? "Show less" : "Show all"
            }
        }, () => {
            this.updateComponent();
        });
    }

    handleMusicShowall(e: any){
        this.setState({
            musicHidden: !this.state.musicHidden,
            updateHtml:{
                playlistShowall: this.state.updateHtml.playlistShowall,
                musicShowall: this.state.updateHtml.musicShowall === "Show all" ? "Show less" : "Show all",
                userShowall: this.state.updateHtml.userShowall
            }
        }, () => {
            this.updateComponent();
        });
    }

    render(): ReactNode {
        // <a href="">Show all</a> i remove this thing from html below, hence styling that apply and a tag is gone.
        return (
            <div>
                <SearchBar />
                <div className="container music-container">
                    <div id="top-music" hidden={this.state.quantifier !== "music" && this.state.quantifier !== "all"}>
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Top result</div>
                            <div className="col-lg-4 music-title">Musics</div>
                            <div className="col-lg-2 showall" onClick={this.handleMusicShowall}>
                                {this.state.updateHtml.musicShowall}
                                </div>
                            <div className="col-lg-1"></div>
                        </div>
                        
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4" id="top-music-append">
                                {this.state.topMusicComponent}
                            </div>
                            <div className="col-lg-6" id="music-append">
                                {this.state.musicComponents}
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                    <div id="playlist" hidden={this.state.quantifier !== "playlist" && this.state.quantifier !== "all"}>
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Playlist</div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-2 showall" onClick={this.handlePlaylistShowall}>{this.state.updateHtml.playlistShowall}</div>
                            <div className="col-lg-1"></div>
                        </div>
            
                        <div className="row my-3 history-row" id="playlist-append">
                            {this.state.playlistComponents}
                        </div>
                    </div>
                    <div id="artist" hidden={this.state.quantifier !== "user" && this.state.quantifier !== "all"}>
                        <div className="row my-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4 music-title">Artist</div>
                            <div className="col-lg-4"></div>
                            <div className="col-lg-2 showall" onClick={this.handleUserShowall}>{this.state.updateHtml.userShowall}</div>
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

export default ResultPage;
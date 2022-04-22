import { Component, ReactNode } from "react";
import RowVerticalCard from "../component/RowVerticalCard";
import { MusicWithUserName, QueryManyMusics } from "../model/Music";
import { QueryManyUsers } from "../model/User";
import { QueryManyPlaylists } from "../model/Playlist";
import { EACH_ROW } from "../setting";
import "../css/result.css";
import HalfHorizontalCard from "../component/HalfHorizonalCard";
import HalfTopCard from "../component/HalfTopCard";
import { get_parameter, ROLES } from "../common";
import { seachUsersByUserName, searchUserByFirstName, searchUserByUserNameButRole as searchUserByUserNameButRoleWise } from "../controller/UserController";
import { searchMusicByAuthorName, searchMusicsByMusicName } from "../controller/MusicController";
import { searchPlaylistByCreatorName, searchPlaylistsByPlaylistName } from "../controller/PlaylistController";
import UserSearchBar from "../component/UserSearchBar";
interface ResultQuery {
    // result?queryText=e&quantifier=all&subQuantifier=itsName
    queryText: string;
    quantifier: string;
    subQuantifier: string;
}

interface ResultState {
    userFetch: QueryManyUsers;              // results from fetch data from db
    musicFetch: QueryManyMusics;
    playlistFetch: QueryManyPlaylists;
    userComponents: JSX.Element[];          // lists of component to be display
    topMusicComponent: JSX.Element | null;
    musicComponents: JSX.Element[];
    playlistComponents: JSX.Element[];
    userHidden: boolean;                    // state of show or hidden
    musicHidden: boolean;
    playlistHidden: boolean;
    updateHtml: {                           // text to be update from some event
        playlistShowall: string,
        musicShowall: string,
        userShowall: string
    };
    resultQuery: ResultQuery;
}

class ResultPage extends Component <{}, ResultState> {

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
            updateHtml: {
                playlistShowall: "Show all",
                musicShowall: "Show all",
                userShowall: "Show all"
            },
            resultQuery: get_parameter() as ResultQuery
        };
        this.handlePlaylistShowall = this.handlePlaylistShowall.bind(this);
        this.handleUserShowall = this.handleUserShowall.bind(this);
        this.handleMusicShowall = this.handleMusicShowall.bind(this);
    }

    componentDidMount(){
        const {queryText, quantifier, subQuantifier} = this.state.resultQuery;
    
        let user_list = null, music_list = null, playlist_list = null;
        if((quantifier === "user" && subQuantifier === "userName") || (quantifier === "all" && subQuantifier === "itsName")){
            user_list = seachUsersByUserName(queryText);
        }
        if(quantifier === "user" && subQuantifier === "firstName") {
            user_list = searchUserByFirstName(queryText);
        }
        if(quantifier === "user" && subQuantifier === "userOnly") {
            user_list = searchUserByUserNameButRoleWise(queryText, ROLES.user);
        }
        if(quantifier === "user" && subQuantifier === "artistOnly") {
            user_list = searchUserByUserNameButRoleWise(queryText, ROLES.artist);
        }
        if((quantifier === "music" && subQuantifier === "musicName") || (quantifier === "all" && subQuantifier === "itsName")){
            music_list = searchMusicsByMusicName(queryText);
        }
        if(quantifier === "music" && subQuantifier === "aritistName"){
            music_list = searchMusicByAuthorName(queryText);
        }
        if((quantifier === "playlist" && subQuantifier === "playlistName") || (quantifier === "all" && subQuantifier === "itsName")){
            playlist_list = searchPlaylistsByPlaylistName(queryText);
        }
        if((quantifier === "playlist" && subQuantifier === "playlistCreatorName") || (quantifier === "all" && subQuantifier === "creatorName")){
            playlist_list = searchPlaylistByCreatorName(queryText);
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

        if(this.state.resultQuery.quantifier === "user" || this.state.resultQuery.quantifier === "all"){
            for(let idx = 0; users !== null && users.users !== null && idx < users.users.length; idx+=EACH_ROW){
                const users5 = users.users.slice(idx, idx+EACH_ROW);
                userComponents.push(
                    <RowVerticalCard users={users5} type={"user"}/>
                );
                if(this.state.userHidden) break;
            }
        }
        if((this.state.resultQuery.quantifier === "music" || this.state.resultQuery.quantifier === "all") && musics !== null && musics.musics !== null && musics.musics.length){
            let music: MusicWithUserName = musics.musics[0];
            topMusicComponent = <HalfTopCard  top_text={music.MusicName} bottom_text={music.UserName} img_url={music.MusicIMG} href={music.MusicFile} type={"music"} card_info={music}/>
            
            for(let idx = 1; idx < musics.musics.length; idx++){
                music = musics.musics[idx];
                musicComponents.push(
                    <HalfHorizontalCard top_text={music.MusicName} bottom_text={music.UserName} img_url={music.MusicIMG} href={music.MusicFile} type={"music"} card_info={music}/>
                );
                if(this.state.musicHidden && musicComponents.length >= EACH_ROW-1) break;
            }
        }
        
        if(this.state.resultQuery.quantifier === "playlist" || this.state.resultQuery.quantifier === "all"){
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
                <UserSearchBar />
                <div className="container music-container">
                    <div id="top-music" hidden={this.state.resultQuery.quantifier !== "music" && this.state.resultQuery.quantifier !== "all"}>
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
                    <div id="playlist" hidden={this.state.resultQuery.quantifier !== "playlist" && this.state.resultQuery.quantifier !== "all"}>
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
                    <div id="artist" hidden={this.state.resultQuery.quantifier !== "user" && this.state.resultQuery.quantifier !== "all"}>
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
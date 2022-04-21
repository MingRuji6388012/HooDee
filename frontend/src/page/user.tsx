import { Component, ReactNode } from "react";
import { UserWithFollowerFollowee } from "../model/User"
import "../css/artist.css"
import { get_parameter } from "../common";
import { MusicWithUserName } from "../model/Music";
import { PlaylistWithUserName } from "../model/Playlist";
import { EACH_ROW } from "../setting";
import HorizontalCard from "../component/HorizontalCard";
import RowVerticalCard from "../component/RowVerticalCard";
import { searchUserByUserID } from "../controller/UserController";
import { searchMusicsByUserID } from "../controller/MusicController";
import { searchPlaylistsByUserID } from "../controller/PlaylistController";

interface UserPageState {
    user: UserWithFollowerFollowee | null;          // results from fetch data from db
    musicOwn: MusicWithUserName[] | null;
    playlistOwn: PlaylistWithUserName[] | null;
    musicComponents: JSX.Element[];                 // lists of component to be display
    playlistComponents: JSX.Element[];
    musicHidden: boolean;                           // state of show or hidden
    playlistHidden: boolean;
    updateHtml: {                                   // text to be update from some event
        playlistShowall: string,
        musicShowall: string,
        followButton: string
    }
}

interface UserPageGetReqParam {
    // /user?userid=51
    userid: string;
}

class UserPage extends Component<{}, UserPageState> {


    constructor(props:any){
        super(props);
        this.state = { // init state
            user: null,
            musicOwn: null,
            playlistOwn: null,
            musicComponents: [],
            playlistComponents: [],
            musicHidden: true,
            playlistHidden: true,
            updateHtml: {
                playlistShowall: "Show all",
                musicShowall: "Show all",
                followButton: "Follow"
            }
        };
        this.handlePlaylistShowall = this.handlePlaylistShowall.bind(this);
        this.handleMusicShowall = this.handleMusicShowall.bind(this);
        this.onFollow = this.onFollow.bind(this);
    }

    componentDidMount(){
        const $_GET = get_parameter() as UserPageGetReqParam;
        const user_id = Number($_GET["userid"]);
        
        const userPromise = searchUserByUserID(user_id);
        const musicsPromise = searchMusicsByUserID(user_id);
        const playlistsPromise = searchPlaylistsByUserID(user_id);
        
        Promise.all([userPromise, musicsPromise, playlistsPromise]).then((values) => {
            const [user, musics, playlists] = values;
            this.setState(
                {
                    user: !user.error ? user.user : null,
                    musicOwn: !musics.error ? musics.musics : null,
                    playlistOwn: !playlists.error ? playlists.playlists : null
                }, 
                () => { // callback from setState
                    console.log(this.state);
                    this.updateComponent();
                }
            );
        });
    }

    updateComponent() {
        let musicComponents = [], playlistComponents = [], idx, music;
        if(this.state.musicOwn){
            for(idx = 0; idx < this.state.musicOwn.length; idx++){
                music = this.state.musicOwn[idx];
                musicComponents.push(<HorizontalCard top_text={music.MusicName} bottom_text={music.UserName} href={music.MusicFile} img_url={music.MusicIMG} type={"music"} card_info={music}/>)
                if(this.state.musicHidden && idx >= EACH_ROW-1) break;
            }
        }
        if(this.state.playlistOwn){
            for(idx = 0; idx < this.state.playlistOwn.length; idx+=EACH_ROW){
                playlistComponents.push(<RowVerticalCard playlists={this.state.playlistOwn.slice(idx, idx+EACH_ROW)} type={"playlist"}/>);
                if(this.state.playlistHidden) break; // if hidden, allow only one row (scuff AF)
            }
        }
        this.setState({
            musicComponents: musicComponents,
            playlistComponents: playlistComponents
        }, () => {
            this.forceUpdate();
        });
    }

    handlePlaylistShowall(e: any){
        let updateHtml = this.state.updateHtml;
        updateHtml.playlistShowall = updateHtml.playlistShowall === "Show all" ? "Show less" : "Show all";
        this.setState({
            playlistHidden: !this.state.playlistHidden, 
            updateHtml: updateHtml
        }, () => { // setState is async method, FOR REAL DUDE?
            this.updateComponent();
        });
    }

    handleMusicShowall(e: any){
        let updateHtml = this.state.updateHtml;
        updateHtml.musicShowall = updateHtml.musicShowall === "Show all" ? "Show less" : "Show all";
        this.setState({
            musicHidden: !this.state.musicHidden,
            updateHtml: updateHtml
        }, () => {
            this.updateComponent();
        });
    }

    onFollow(e: any) {
        console.log("unimplement, tobe implement when login system is complete");
        // let updateHtml = this.state.updateHtml;
        // updateHtml.followButton = updateHtml.followButton === "Follow" ? "Unfollow" : "Follow";
        // this.setState({
        //     updateHtml: updateHtml
        // });
    }

    render(): ReactNode {
        return (
            <div>
                <div className="artist-info py-4" id="user-title-append" >
                    <div className="h1 artist-name-header">{this.state.user?.UserName}</div>
                    <div className="h5 artist-follower-header">{this.state.user?.Followers?.length} FOLLOWERS</div>
                    <br/>    
                    <div><button className="btn follow-button">{this.state.updateHtml.followButton}</button></div>
                </div>
            
                <div className="music-section my-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-9 music-title">Musics ({this.state.musicOwn?.length})</div>
                            <div className="col-lg-1 showall">
                                <div id="music-showall" onClick={this.handleMusicShowall}>
                                    {this.state.updateHtml.musicShowall}
                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
            
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10" id="music-own-append">
                                {this.state.musicComponents}
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                </div>
            
                <div className="playlist-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-9 music-title">Playlist ({this.state.playlistOwn?.length})</div>
                            <div className="col-lg-1 showall" >
                                <div id="playlist-showall" onClick={this.handlePlaylistShowall}>
                                    {this.state.updateHtml.playlistShowall}
                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                    </div>
                    <div className="container music-container" id="playlist-own-append">
                        {this.state.playlistComponents}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPage;
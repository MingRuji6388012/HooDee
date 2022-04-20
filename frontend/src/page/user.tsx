import { Component, ReactNode } from "react";
import { QueryOneUsers, UserWithFollowerFollowee } from "../model/User"
import "../css/artist.css"
import { get_parameter } from "../common";
import { MusicWithUserName, QueryManyMusics } from "../model/Music";
import { PlaylistWithUserName, QueryManyPlaylists } from "../model/Playlist";
import { API_PORT, EACH_ROW } from "../setting";
import HorizontalCard from "../component/HorizontalCard";
import RowVerticalCard from "../component/RowVerticalCard";

interface UserPropsState {
    user: UserWithFollowerFollowee | null;
    musicOwn: MusicWithUserName[] | null;
    playlistOwn: PlaylistWithUserName[] | null;
    musicComponents: JSX.Element[];
    playlistComponents: JSX.Element[];
    musicHidden: boolean;
    playlistHidden: boolean;
    updateHtml: {
        playlistShowall: string,
        musicShowall: string,
        followButton: string
    }
}

interface UserPageGetReqParam {
    user_id: string;
}

class UserPage extends Component<{}, UserPropsState> {


    constructor(props:any){
        super(props);
        this.state = {
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
        const user_id = $_GET["user_id"];
        
        const userPromise = fetch(`http://localhost:${API_PORT}/api/user/search_by_id/${user_id}`).then((res) => res.json() as Promise<QueryOneUsers>);
        const musicsPromise = fetch(`http://localhost:${API_PORT}/api/music/search_by_authorid/${user_id}`).then(res => res.json() as Promise<QueryManyMusics>);
        const playlistsPromise = fetch(`http://localhost:${API_PORT}/api/playlist/search_by_userid/${user_id}`).then(res => res.json() as Promise<QueryManyPlaylists>);
        
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
                musicComponents.push(<HorizontalCard top_text={music.MusicName} bottom_text={music.UserName} href={music.MusicFile} img_url={music.MusicIMG} type={"music"} extra_info={music}/>)
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
                            <div className="col-lg-9 music-title">Musics</div>
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
                            <div className="col-lg-9 music-title">Playlist</div>
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
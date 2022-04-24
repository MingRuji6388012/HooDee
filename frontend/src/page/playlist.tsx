import { Component } from "react";
import { get_parameter, is_playlist_followed } from "../common";
import BundleOfHorizonalCard from "../component/BundleOfHorizontalCard";
import HorizontalCard from "../component/HorizontalCard";
import { playlistFollow, playlistUnfollow, searchMusicInPlaylistByPlaylistID } from "../controller/PlaylistController";
import "../css/playlist.css";
import { PlaylistWithUserName, QueryMusicInPlaylist } from "../model/Playlist";
import { UserButInSessionStorage } from "../model/User";

interface PlaylistPageState{
    isFollowed: boolean;
    musicsComponent: JSX.Element[];
    resMusicsInMusic: QueryMusicInPlaylist | null;
    playlist: PlaylistWithUserName | null;
    updateHtml: {
        username: string,
        playlistName: string
    }
}

interface PlaylistPageParameter{
    // /playlist?playlistid=1
    playlistid: number;
}

class PlaylistPage extends Component <{}, PlaylistPageState>{

    constructor(props:any) {
        super(props);
        this.state = {
            isFollowed: false,
            musicsComponent: [],
            resMusicsInMusic: null,
            playlist: null,
            updateHtml: {
                username: "User",
                playlistName: "Playlist"
            }
        };
        this.onFollowPlaylist = this.onFollowPlaylist.bind(this);
    }

    componentDidMount() {
        this.fetchPlaylistData();
    }

    fetchPlaylistData(){
        let {playlistid} = get_parameter() as PlaylistPageParameter;
        if(typeof playlistid !== "number"){
            playlistid = Number(playlistid);
        }
        const userJSON = sessionStorage.getItem("user");
        if(userJSON){
            let user = JSON.parse(userJSON) as UserButInSessionStorage;
            this.setState({
                isFollowed: is_playlist_followed(playlistid, user.PlaylistsFollow),
            });
        }
            
        searchMusicInPlaylistByPlaylistID(playlistid).then(resMusicsInPlaylist => {
            if(!resMusicsInPlaylist.error){
                console.log(resMusicsInPlaylist);
                let musicsComponent:JSX.Element[] = [];
                resMusicsInPlaylist.musics?.forEach((v) => {
                    musicsComponent.push(<HorizontalCard top_text={v.MusicName} bottom_text={v.UserName} img_url={v.MusicIMG} href={v.MusicFile} type="music" card_info={v} />)
                });
                this.setState({
                    musicsComponent: musicsComponent,
                    resMusicsInMusic: resMusicsInPlaylist,
                    playlist: resMusicsInPlaylist.playlist,
                    updateHtml: {
                        username : (resMusicsInPlaylist.playlist as PlaylistWithUserName).UserName,
                        playlistName: (resMusicsInPlaylist.playlist as PlaylistWithUserName).PlaylistName
                    } 
                }, () => {console.log(this.state);});
            }
            else{
                console.log("/playlist: ", resMusicsInPlaylist.message);
                alert("fetch failed some how");
            }
        });
    }

    onFollowPlaylist(e: any) {
        const userJSON = sessionStorage.getItem("user");
        if(userJSON && this.state.playlist){
            const user = JSON.parse(userJSON) as UserButInSessionStorage;
            if(!this.state.isFollowed){
                playlistFollow(user.UserID, this.state.playlist.PlaylistID).then(res => {
                    if(!res.error){
                        this.setState({isFollowed: true});
                        alert("Follow complete");
                    }
                    else{
                        console.log(res.message);
                        alert("Follow failed");
                    }
                });
            }
            else {
                playlistUnfollow(user.UserID, this.state.playlist.PlaylistID).then(res => {
                    if(!res.error){
                        this.setState({isFollowed: false});
                        alert("Unfollow complete");
                    }
                    else{
                        console.log(res.message);
                        alert("Unfollow failed");
                    }
                });
            }
            this.fetchPlaylistData();
        }
        else{
            window.location.href = "/login";
            alert("not in session, can't follow");
        }
    }

    render() {
        return (
            <div>
                <section className="playlist-info py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-11">
                                <div className="playlist-name-header" id="playlist-name">{this.state.updateHtml.playlistName}</div>
                                <div className="playlist-description-header" id="playlist-creator">{this.state.updateHtml.username}</div>
                                <div className="playlist-follow-follower-header">
                                    <span className="follow-button-header" id="follow-button-append">
                                        <button className="btn follow-button" onClick={this.onFollowPlaylist}>{(!this.state.isFollowed && "Follow") || (this.state.isFollowed && "Unfollow")}</button>
                                    </span> 
                                    <span className="playlist-follower-header" id="playlist-follows"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BundleOfHorizonalCard topText="Music" horiCards={this.state.musicsComponent}/>
            </div>
        );
    }
}

export default PlaylistPage;
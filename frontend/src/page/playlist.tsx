import { Component } from "react";
import { get_parameter } from "../common";
import BundleOfHorizonalCard from "../component/BundleOfHorizontalCard";
import HorizontalCard from "../component/HorizontalCard";
import { searchMusicInPlaylistByPlaylistID } from "../controller/PlaylistController";
import "../css/playlist.css";
import { PlaylistWithUserName, QueryMusicInPlaylist } from "../model/Playlist";

interface PlaylistPageState{
    followButton: JSX.Element;
    musicsComponent: JSX.Element[];
    resMusicsInMusic: QueryMusicInPlaylist | null;
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
            followButton: <button className="btn follow-button">Follow</button>,
            musicsComponent: [],
            resMusicsInMusic: null,
            updateHtml: {
                username: "User",
                playlistName: "Playlist"
            }
        };
    }

    componentDidMount() {
        const {playlistid} = get_parameter() as PlaylistPageParameter;

        searchMusicInPlaylistByPlaylistID(playlistid).then(resMusicsInPlaylist => {
            if(!resMusicsInPlaylist.error){
                console.log(JSON.stringify(resMusicsInPlaylist));
                let musicsComponent:JSX.Element[] = [];
                resMusicsInPlaylist.musics?.forEach((v) => {
                    musicsComponent.push(<HorizontalCard top_text={v.MusicName} bottom_text={v.UserName} img_url={v.MusicIMG} href={v.MusicFile} type="music" card_info={v} />)
                });
                this.setState({
                    musicsComponent: musicsComponent,
                    resMusicsInMusic: resMusicsInPlaylist,
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
                                        {this.state.followButton}
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
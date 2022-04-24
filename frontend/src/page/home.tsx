import { Component, ReactNode } from "react";
import { QueryManyMusics } from "../model/Music";
import { QueryManyPlaylists } from "../model/Playlist";
import "../css/home.css";
import { searchMusicsByMusicName } from "../controller/MusicController";
import { searchPlaylistsByPlaylistName } from "../controller/PlaylistController";
import { EACH_ROW } from "../setting";
import RowVerticalCard from "../component/RowVerticalCard";

interface HomePageState {
    musicFetch: QueryManyMusics | null;
    playlistFetch: QueryManyPlaylists | null;
    musicComponents: JSX.Element[];
    playlistComponents: JSX.Element[];
    musicHidden: boolean;
    playlistHidden: boolean;
    updateHtml: {
        playlistShowall: string,
        musicShowall: string
    };
}

class HomePage extends Component<{}, HomePageState> {

    constructor(props:any) {
        super(props);
        this.state = {
            musicFetch: null,
            playlistFetch: null,
            musicComponents: [],
            playlistComponents: [],
            musicHidden: true,
            playlistHidden: true,
            updateHtml: {
                playlistShowall: "Show all",
                musicShowall: "Show all"
            }
        };
        this.onMusicShowall = this.onMusicShowall.bind(this);
        this.onPlaylistShowall = this.onPlaylistShowall.bind(this);
        document.title = "Home - HooDee";
    }

    componentDidMount(){
        Promise.all([searchMusicsByMusicName("%25"), searchPlaylistsByPlaylistName("%25")]).then((values) => {
            const [resMusics, resPlaylists] = values;
            if(!resMusics.error && !resPlaylists.error){
                const musics = resMusics.musics, playlists = resPlaylists.playlists;
                let idx, musicsComponents = [], playlistComponents = [];
                for(idx = 0;  musics && idx < musics.length; idx+=EACH_ROW){
                    musicsComponents.push(
                        <RowVerticalCard musics={musics.slice(idx, idx+EACH_ROW)} type={"music"}/>
                    );
                    if(this.state.musicHidden) break;
                }
                for(idx = 0;  playlists && idx < playlists.length; idx+=EACH_ROW){
                    playlistComponents.push(
                        <RowVerticalCard playlists={playlists.slice(idx, idx+EACH_ROW)} type={"playlist"}/>
                    );
                    if(this.state.playlistHidden) break;
                }

                this.setState({
                    musicFetch: resMusics,
                    playlistFetch: resPlaylists,
                    musicComponents: musicsComponents,
                    playlistComponents: playlistComponents
                });
            }
            else{
                console.log(resMusics.message, "\n", resPlaylists.message);
                alert("error in fetching data");
            }
        });
    }

    onMusicShowall(){
        let updateHtml = this.state.updateHtml;
        updateHtml.musicShowall = this.state.updateHtml.musicShowall === "Show all" ? "Show less" : "Show all";
        this.setState({
            musicHidden: !this.state.musicHidden,
            updateHtml: updateHtml
        }, () => {
            this.componentDidMount()
        });
    }
    onPlaylistShowall(){
        let updateHtml = this.state.updateHtml;
        updateHtml.playlistShowall = this.state.updateHtml.playlistShowall === "Show all" ? "Show less" : "Show all";
        this.setState({
            playlistHidden: !this.state.playlistHidden,
            updateHtml: updateHtml
        }, () => {
            this.componentDidMount()
        });
    }

    render(): ReactNode {
        return (
            <div>
                <section className="container music-container"  id="home-music-history-append">
                    <div className="row my-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-2">
                            <div className="music-title">Music</div>
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                            <div className="showall">
                                <div id="music-showall" onClick={this.onMusicShowall}>{this.state.updateHtml.musicShowall}</div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                    {this.state.musicComponents}
                </section>

                <section className="container music-container"  id="home-playlist-history-append">
                    <div className="row my-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-2">
                            <div className="music-title">Playlist</div>
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                            <div className="showall">
                                <div id="playlist-showall" onClick={this.onPlaylistShowall}>{this.state.updateHtml.playlistShowall}</div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                    {this.state.playlistComponents}
                </section>
            </div>
        );
    }
}

export default HomePage;
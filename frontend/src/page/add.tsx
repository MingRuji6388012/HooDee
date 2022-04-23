import { Component } from "react";
import { ROLES } from "../common";
import AddMusicComponent from "../component/AddMusic";
import AddPlaylistComponent from "../component/AddPlaylist";
import AddUserComponent from "../component/AddUser";
import "../css/DomainSelection.css";
import SignUpPage from "./signup";

interface AddPageState {
    classNameUser: string;
    classNameMusic: string;
    classNamePlaylist: string;
    userPressed: boolean;
    musicPressed: boolean;
    playlistPressed: boolean;
}
class AddPage extends Component<{}, AddPageState>{
    constructor(props:any){
        super(props)
        this.state = {
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton',
            userPressed: false,
            musicPressed: false,
            playlistPressed: false,
        }
        this.changeClassNameUser = this.changeClassNameUser.bind(this);
        this.changeClassNameMusic = this.changeClassNameMusic.bind(this);
        this.changeClassNamePlaylist = this.changeClassNamePlaylist.bind(this);
    }

    changeClassNameUser() {
        this.setState({
            classNameUser: 'DomainButtonChanged',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton',
            userPressed: true,
            musicPressed: false,
            playlistPressed: false
        });
    }
    
    changeClassNameMusic() {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButtonChanged',
            classNamePlaylist: 'DomainButton',
            userPressed: false,
            musicPressed: true,
            playlistPressed: false
        });
    }

    changeClassNamePlaylist () {
        this.setState({
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButtonChanged',
            userPressed: false,
            musicPressed: false,
            playlistPressed: true
        });
    }


    render(){
        return(
            <div>
                <div className="DomainList">
                    <button onClick={this.changeClassNameUser} className={this.state.classNameUser}>User/Artist/Admin</button>
                    <button onClick={this.changeClassNameMusic} className={this.state.classNameMusic}>Music</button>
                    <button onClick={this.changeClassNamePlaylist} className={this.state.classNamePlaylist}>Playlist</button>
                </div>

                {this.state.userPressed && <SignUpPage email="" firstname="" lastname="" password="" role={ROLES.user} username="" />}
                {this.state.musicPressed && <AddMusicComponent musicName="" musicURL="" />}
                {this.state.playlistPressed && <AddPlaylistComponent playlistName="" />}
            </div>


        )
    }
}

export default AddPage;
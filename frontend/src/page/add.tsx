import { Component } from "react";
import { goHomeKiddos, ROLES } from "../common";
import AddMusicComponent from "../component/AddMusic";
import AddPlaylistComponent from "../component/AddPlaylist";
import "../css/DomainSelection.css";
import { UserButInSessionStorage } from "../model/User";
import SignUpPage from "./signup";

interface AddPageState {
    classNameUser: string;
    classNameMusic: string;
    classNamePlaylist: string;
    userPressed: boolean;
    musicPressed: boolean;
    playlistPressed: boolean;
    userInSession: UserButInSessionStorage;
}
class AddPage extends Component<{}, AddPageState>{
    constructor(props:any){
        super(props)

        const userJSON = sessionStorage.getItem("user");
        if(!userJSON) {goHomeKiddos(); return;} // not in session, can't use this page
        const user = JSON.parse(userJSON) as UserButInSessionStorage;

        this.state = {
            classNameUser: 'DomainButton',
            classNameMusic: 'DomainButton',
            classNamePlaylist: 'DomainButton',
            userPressed: false,
            musicPressed: false,
            playlistPressed: false,
            userInSession: user
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
                    {(this.state.userInSession.Role === ROLES.admin) && <button onClick={this.changeClassNameUser} className={this.state.classNameUser}>User/Artist/Admin</button>}
                    {(this.state.userInSession.Role !== ROLES.user) && <button onClick={this.changeClassNameMusic} className={this.state.classNameMusic}>Music</button>}
                    <button onClick={this.changeClassNamePlaylist} className={this.state.classNamePlaylist}>Playlist</button>
                </div>

                {(this.state.userInSession.Role === ROLES.admin) && this.state.userPressed && <SignUpPage email="" firstname="" lastname="" password="" role={ROLES.user} username="" />}
                {(this.state.userInSession.Role !== ROLES.user) && this.state.musicPressed && <AddMusicComponent musicName="" musicURL="" />}
                {this.state.playlistPressed && <AddPlaylistComponent playlistName="" />}
            </div>
        );
    }
}

export default AddPage;
import "../css/add_page.css";
import { Component } from "react";
import { goHomeKiddos } from "../common";
import { createPlaylist } from "../controller/PlaylistController";
import { UserButInSessionStorage } from "../model/User";


interface AddPlaylistComponentState{
    playlistName: string;
}
type AddPlaylistComponentStateInit = AddPlaylistComponentState;
class AddPlaylistComponent extends Component<AddPlaylistComponentStateInit, AddPlaylistComponentState>{

    constructor(props:AddPlaylistComponentStateInit) {
        super(props);
        this.state = props;
        this.onPlaylistNameChange = this.onPlaylistNameChange.bind(this);
        this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
    }

    onPlaylistNameChange(e:any){
        this.setState({playlistName: e.target.value});
    }

    onCreatePlaylist(_:any){
        const userJSON = sessionStorage.getItem("user");
        if(userJSON){
            const user = JSON.parse(userJSON) as UserButInSessionStorage;
            createPlaylist(user.UserID, this.state.playlistName, "/logo512.png").then(res => {
                if(!res.error){
                    alert("add a new playlist complete");
                    window.location.reload();
                }
                else{
                    console.log(res.message);
                    alert("lmao it crashed");
                }
            });
        }
        else{
            goHomeKiddos();
        }
    }
    render(){
        return(
            <div className="container mx-auto mt-4">
                <h1 className="header-add">Add Playlist</h1>
                <div className = "profile-img-block">
                    <img className="profile-pic" src="/ProfilePic/DefaultProfilePic.png" alt="Default Profile Pic" width="150" height="150"/>
                </div>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Playlist name</label>
                        <input className="form-control" id="playlistName" name="playlistName" onChange={this.onPlaylistNameChange} value={this.state.playlistName}/>
                    </div>
                    <div className="button-block d-flex justify-content-center">
                        <button className="button-add btn btn-primary" onClick={this.onCreatePlaylist}>Done</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPlaylistComponent;
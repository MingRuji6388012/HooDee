import "../css/add_page.css";
import { Component } from "react";
import { goHomeKiddos } from "../common";
import { createPlaylist, editPlaylist } from "../controller/PlaylistController";
import { UserButInSessionStorage } from "../model/User";


interface AddPlaylistComponentState{
    playlistName: string;
}
interface AddPlaylistComponentStateInit{
    playlistName: string;
    playlistIMG: string;
    inPlace: boolean
    playlistID?: number;
}
class AddPlaylistComponent extends Component<AddPlaylistComponentStateInit, AddPlaylistComponentState>{

    constructor(props:AddPlaylistComponentStateInit) {
        super(props);
        this.state = {
            playlistName : props.playlistName
        };
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
            if(!this.props.inPlace){ // for create new playlist
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
            else if (this.props.inPlace && this.props.playlistID !== undefined){ // for edit old playlist
                // this.props.playlistIMG can't be change for now
                editPlaylist(this.props.playlistID, this.state.playlistName, this.props.playlistIMG).then(res => {
                    if(!res.error){
                        alert("edit playlist complete");
                        window.location.reload();
                    }
                    else{
                        console.log(res.message);
                        alert("lmao it crashed");
                    }
                });
            }
            else{
                alert("invalid use");
            }
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
                    <img className="profile-pic" src={this.props.playlistIMG || "/ProfilePic/DefaultProfilePic.png"} alt="Default Profile Pic" width="150" height="150"/>
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
        );
    }
}

export default AddPlaylistComponent;
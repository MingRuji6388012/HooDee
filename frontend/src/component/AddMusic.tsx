import "../css/add_page.css";
import { Component } from "react";
import { createMusic } from "../controller/MusicController";
import { UserButInSessionStorage } from "../model/User";
import { goHomeKiddos } from "../common";


interface AddMusicComponentState {
    musicName: string;
    musicURL: string;
}
type AddMusicComponentStateInit = AddMusicComponentState;
class AddMusicComponent extends Component<AddMusicComponentStateInit, AddMusicComponentState> {

    constructor(props:AddMusicComponentStateInit){
        super(props);
        this.state = props;
        this.onCreateMusic = this.onCreateMusic.bind(this);
        this.onMusicName = this.onMusicName.bind(this);
        this.onMusicURL = this.onMusicURL.bind(this);
    }

    onMusicName(e:any){
        this.setState({musicName: e.target.value});
    }

    onMusicURL(e:any){
        this.setState({musicURL: e.target.value});
    }

    onCreateMusic(e:any){
        const userJSON = sessionStorage.getItem("user");
        if(userJSON){
            const user = JSON.parse(userJSON) as UserButInSessionStorage;
            createMusic(user.UserID, this.state.musicName, this.state.musicURL, "/logo512.png").then(res => {
                if(!res.error){
                    alert("add a new music complete");
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
        return (
            <div className="container mx-auto mt-4">
                <h1 className="header-add">Add Music</h1>
                <div className = "profile-img-block">
                    <img className="profile-pic" src="/ProfilePic/DefaultProfilePic.png" alt="Default Profile Pic" width="150" height="150"/>
                </div>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Music name</label>
                        <input className="form-control" id="musicName" name="musicName" onChange={this.onMusicName} value={this.state.musicName}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Music URL</label>
                        <input className="form-control" id="musicURL" name="musicURL" onChange={this.onMusicURL} value={this.state.musicURL}/>
                    </div>
                    <div className="button-block d-flex justify-content-center">
                        <button className="button-add btn btn-primary" onClick={this.onCreateMusic}>Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMusicComponent;
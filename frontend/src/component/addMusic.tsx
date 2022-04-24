import "./css/add_page";
import { Component } from "react";

class AddMusicPage extends Component{
    render(){
        return(
            <div className="container mx-auto mt-4">
            <h1 className="header-add">Add Music</h1>
            <div className = "profile-img-block">
                <img className="profile-pic" src="../public/ProfilePic/DefaultProfilePic.png" alt="Default Profile Pic" width="150" height="150"/>
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Music name</label>
``                    <input className="form-control" id="musicName" name="musicName" onChange={undefined}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Music URL</label>
                    <input className="form-control" id="musicURL" name="musicURL" onChange={undefined}/>
                </div>

                <div className="button-block">
                    <input type="button" className="button-add btn btn-primary" onClick={undefined}>Done</input>
                    <input type="button" className="button-cancel btn btn-primary" onClick={undefined}>Cancel</input>]
                </div>
            </form>
          </div>
        )
    }
}

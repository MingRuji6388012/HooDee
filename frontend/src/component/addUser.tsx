import "./css/add_page";
import { Component } from "react";

interface AddUserPageState{
    email:string;
    firstname:string;
    lastname:string;
    username:string;
    password:string;
    role: number;
}

class AddUserPage extends Component<{},AddUserPageState> {
    constructor(props:any){
        super(props)
    }

    onEmailChange(e:any){
        
    }
    onFirstnameChange(e:any){

    }
    onLastnameChange(e:any){

    }

    onUsernameChange(e:any){

    }

    onPasswordChange(e:any){

    }

    onRoleChange(e:any){

    }

    render(){
        return(
            <div className="container mx-auto mt-4">
                <h1 className="header-add">Add User/Artist/Admin </h1>
                <div className = "profile-img-block">
                    <img className="profile-pic" src="../public/ProfilePic/DefaultProfilePic.png" alt="Default Profile Pic" width="150" height="150"/>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={this.onEmailChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First name</label>
                        <input className="form-control" id="FirstName" name="FirstName" onChange={this.onFirstnameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <input className="form-control" id="LastName" name="LastName" onChange={this.onLastnameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" id="UserName" name="UserName" onChange={this.onUsernameChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password" onChange={this.onPasswordChange}/>
                    </div>
                    <div className="role-selection d-flex justify-content-center" onChange={this.onRoleChange}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="user-radio-button" value="" defaultChecked/>
                            <label className="form-check-label">User</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="artist-radio-button" value="" />
                            <label className="form-check-label">Artist</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="roleQuantifier" id="admin-radio-button" value="" />
                            <label className="form-check-label">Admin</label>
                        </div>
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



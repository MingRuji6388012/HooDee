import { Component } from "react";
import { userFollowUser, userUnfollowUser } from "../controller/UserController";
import { Playlist } from "../model/Playlist";
import { User, UserWithFollowerFollowee } from "../model/User";

interface DrowdownProps{
    type:string;
    dropdownOn: any; // can be any of User | Playlist | Music
}
interface DrowdownState{
    selected: string;
    sessionedOptions: JSX.Element[];
}
class Dropdown extends Component<DrowdownProps, DrowdownState> {
    private static ACTION_IN_SELECT = ["addToPlaylist", "followPlaylist", "redirectToUser", "share", "followUser", "removeUser", "removeMusic", "removePlaylist", "unfollowPlaylist", "unfollowUser"];
    cardOwnerID:string; // user id, for easy accessing
    constructor(props:DrowdownProps){
        super(props);
        this.state = {
            selected : "",
            sessionedOptions: []
        };
        if(props.type === "playlist"){
            this.cardOwnerID = props.dropdownOn.PlaylistCreator;
        }
        else {
            this.cardOwnerID = props.dropdownOn.UserID;
        }
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    onDropdownChange(e:any){
        const selectedAction = e.target.value as string;
        console.log(selectedAction);
        const [command, params] = selectedAction.split(":");
        let music_id, playlist_id, user_id, followee_id;
        switch (command) {
            case Dropdown.ACTION_IN_SELECT[0]: // addToPlaylist:MusicID,PlaylistID
                [music_id, playlist_id] = params.split(",");
                break;
            case Dropdown.ACTION_IN_SELECT[1]: // followPlaylist:UserID,PlaylistID
                break;
            case Dropdown.ACTION_IN_SELECT[2]: // redirectToUser:UserID
                user_id = params;
                window.location.href = `/user?userid=${user_id}`; //redirect to ...
                break;
            case Dropdown.ACTION_IN_SELECT[3]: // share:
                console.log(`${command}: `); // noop
                alert("TBD");
                break;
            case Dropdown.ACTION_IN_SELECT[4]: // followUser:FollowerID,FolloweeID
                [user_id, followee_id] = params.split(",");
                userFollowUser(user_id, followee_id).then((res) => {
                    if(res.error){
                        alert("Follow error");
                        console.log(res.message)
                    }
                    else {
                        alert("Follow complete!");
                    }
                });
                break;
            case Dropdown.ACTION_IN_SELECT[5]: // removeUser:UserID
            case Dropdown.ACTION_IN_SELECT[6]: // removeMusic:MusicID
            case Dropdown.ACTION_IN_SELECT[7]: // removePlaylist:PlaylistID
            case Dropdown.ACTION_IN_SELECT[8]: // unfollowPlaylist:UserID,PlaylistID
            case Dropdown.ACTION_IN_SELECT[9]: // unfollowUser:FollowerID,FolloweeID
                [user_id, followee_id] = params.split(",");
                userUnfollowUser(user_id, followee_id).then((res) => {
                    if(res.error){
                        alert("Unfollow error");
                        console.log(res.message)
                    }
                    else {
                        alert("Unfollow complete!");
                    }
                });
                break;
            default:
                // console.log(`Command ${selectedAction} invalid: misuse of ondropdown_change function`);
                console.log("unimplemented i guess")
        }
        this.resetSelected();
        
    }

    resetSelected(){
        this.setState({selected : ""});
    }

    create_dropdown_session_related_options(){
        const userJSON = sessionStorage.getItem("user");
        if(!userJSON){ // if not in session, GTFO
            return [];
        }
        const user = JSON.parse(userJSON);
        let dropdown_sessioned_options = [], followed, text, selected_value;
        if(this.props.type === "music" && this.props.dropdownOn){ // assume dropdownOn is Music
            if(user.Role === 1){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`removeMusic:${this.props.dropdownOn.MusicID}`}>Delete this music</option>
                );
            }
            dropdown_sessioned_options.push(<optgroup className="opt" label="Add to playlist : " />);
    
            const playlists = user.Playlists;
            for(let idx = 0; idx < playlists.length; idx++){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`addToPlaylist:${this.props.dropdownOn.MusicID},${playlists[idx].PlaylistID}`} >{playlists[idx].PlaylistName}</option>
                );
            }
        }
        else if(this.props.type === "user" && this.props.dropdownOn) { // assume dropdownOn is User (usually other than the one in the session)
            followed = this.is_user_followed(this.props.dropdownOn.UserID, user.Followees)
            if(!followed){
                text = "Follow this user";
                selected_value = `followUser:${user.UserID},${this.props.dropdownOn.UserID}`;
            }
            else{
                text = "Unfollow this user";
                selected_value = `unfollowUser:${user.UserID},${this.props.dropdownOn.UserID}`;
            }
            dropdown_sessioned_options.push(
                <option className="opt" value={selected_value}>{text}</option>
            );
    
            if(user.Role === 1){                
                dropdown_sessioned_options.push(
                    <option value={`removeUser:${this.props.dropdownOn.UserID}`}>Delele this user</option>
                );
            }
        }
        else if(this.props.type === "playlist" && this.props.dropdownOn) { // assume dropdownOn is Playlist
            followed = this.is_playlist_followed(this.props.dropdownOn.PlaylistID, user.PlaylistsFollow);
            if(!followed){
                text = "Follow this playlist";
                selected_value = `followPlaylist:${user.UserID},${this.props.dropdownOn.PlaylistID}`;
            }
            else{
                text = "Unfollow this playlist";
                selected_value = `unfollowPlaylist:${user.UserID},${this.props.dropdownOn.PlaylistID}`;
            }
            dropdown_sessioned_options.push(
                <option className="opt" value={selected_value}>{text}</option>
            );
    
            if(user.Role === 1){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`removePlaylist:${this.props.dropdownOn.PlaylistID}`}>Delete this playlist</option>
                );
            }
        }
        else{
            console.log("misuse of vertical card function");
        }
        // return dropdown_sessioned_options; // maybe change this to setstate
        this.setState({sessionedOptions: dropdown_sessioned_options})
    }

    is_user_followed(user_id:number, users_followee:{FolloweeID: number}[]){
        let followed = false;
        for(let idx = 0; idx < users_followee.length; idx++){
            if(users_followee[idx].FolloweeID === user_id){
                followed = true;
                break;
            }
        }
        // users_followee.map(v => v.FolloweeID === user_id).reduce((a, b) => a || b, false);
        return followed;
    }

    is_playlist_followed(playlist_id:number, playlists_followed:{PlaylistID: number}[]){
        let followed = false;
        for(let idx = 0; idx < playlists_followed.length; idx++){
            if(playlists_followed[idx].PlaylistID === playlist_id){
                followed = true;
                break;
            }
        }
        // playlists_followed.map(v => v.PlaylistID === playlist_id).reduce((a, b) => a || b, false);
        return followed;
    }
    

    render() {
        return (
            <div className="dropdown">
                <select className="dropimg" name="selectoption" onChange={this.onDropdownChange}>
                    <option value="" hidden={true} disabled={true} selected={this.state.selected === ""}>
                        <img className="dropimg" width="1" src="/button/dropdown.png"/>
                    </option>
                    <option className="opt" value={`${Dropdown.ACTION_IN_SELECT[2]}:${((this.props.dropdownOn) as User).UserID ? ((this.props.dropdownOn) as User).UserID : ((this.props.dropdownOn) as Playlist).PlaylistCreator}`}>Go to artist</option>
                    <option className="opt" value="share:">Share</option>
                    {this.state.sessionedOptions}
                </select>
            </div>
        );
    }

}

export default Dropdown;
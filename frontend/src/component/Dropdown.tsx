import { Component } from "react";
import { ROLES, is_playlist_followed, is_user_followed, refetchUserInfo } from "../common";
import { removeMusic } from "../controller/MusicController";
import { addNewMusicToPlaylist, playlistUnfollow, removePlaylist, playlistFollow } from "../controller/PlaylistController";
import { removeUser, userFollowUser, userUnfollowUser } from "../controller/UserController";
import { Playlist } from "../model/Playlist";
import { User, UserButInSessionStorage } from "../model/User";

interface DrowdownProps{
    type:string;
    dropdownOn: any; // can be any of User | Playlist | Music
}
interface DrowdownState{
    selected: string;
    sessionedOptions: JSX.Element[];
}
class Dropdown extends Component<DrowdownProps, DrowdownState> {
    private static ACTION_IN_SELECT = ["addToPlaylist", "followPlaylist", "redirectToUser", "share", "followUser", "removeUser", "removeMusic", "removePlaylist", "unfollowPlaylist", "unfollowUser", "edit"];
    cardOwnerID:string; // user id, for easy accessing
    constructor(props:DrowdownProps){
        super(props);
        this.state = {
            selected : "",
            sessionedOptions: this.create_dropdown_session_related_options()
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
        let music_id, playlist_id, user_id, followee_id, ty, id, reload = true;
        switch (command) {
            case Dropdown.ACTION_IN_SELECT[0]: // addToPlaylist:MusicID,PlaylistID
                [music_id, playlist_id] = params.split(",").map(v => Number(v));
                addNewMusicToPlaylist(music_id, playlist_id)
                .then(res => {
                    if(res.error){
                        console.log(res.message);
                        alert("Error! ")
                        return;
                    }
                    alert("add music into playlist success!");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[1]: // followPlaylist:UserID,PlaylistID
                [user_id, playlist_id] = params.split(",").map(v => Number(v));
                playlistFollow(user_id, playlist_id)
                .then(res => {
                    if(res.error && res.message.includes("Duplicate entry")){
                        console.log(res.message);
                        alert("You already follow this playlist");
                        return;
                    }
                    else if(res.error){
                        console.log(res.message);
                        alert("internal error");
                        return;
                    }
                    alert("Follow Playlist complete!");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[2]: // redirectToUser:UserID
                user_id = params;
                window.location.href = `/user?userid=${user_id}`; //redirect to ...
                reload = false;
                break;
            case Dropdown.ACTION_IN_SELECT[3]: // share:
                console.log(`${command}: `); // noop
                alert("TBD");
                reload = false;
                break;
            case Dropdown.ACTION_IN_SELECT[4]: // followUser:FollowerID,FolloweeID
                [user_id, followee_id] = params.split(",").map(Number);
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
                user_id = Number(params);
                removeUser(user_id)
                .then(res => {
                    if(res.error){
                        console.log(res.message);
                        alert("can't remove user");
                        return;
                    }
                    alert("remove user complete");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[6]: // removeMusic:MusicID
                music_id = Number(params);
                removeMusic(music_id)
                .then(res => {
                    if(res.error){
                        console.log(res.message);
                        alert("can't remove this song");
                        return;
                    }
                    alert("Remove song complete!");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[7]: // removePlaylist:PlaylistID
                playlist_id = Number(params);
                removePlaylist(playlist_id)
                .then(res => {
                    if(res.error){
                        console.log(res.message);
                        alert("can't remove this playlist");
                        return;
                    }
                    alert("Remove playlist complete!");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[8]: // unfollowPlaylist:UserID,PlaylistID
                [user_id, playlist_id] = params.split(",").map(v => Number(v));
                playlistUnfollow(user_id, playlist_id)
                .then(res => {
                    if(res.error){
                        console.log(res.message);
                        alert("can't Unfollow playlist");
                        return;
                    }
                    alert("Unfollow playlist complete!");
                });
                break;
            case Dropdown.ACTION_IN_SELECT[9]: // unfollowUser:FollowerID,FolloweeID
                [user_id, followee_id] = params.split(",").map(Number);
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
            case Dropdown.ACTION_IN_SELECT[10]: // edit:type,id
                [ty, id] = params.split(",");
                window.location.href = `/edit?type=${ty}&id=${id}`
                reload = false;
                break;
            default:
                console.log(`Command ${selectedAction} invalid: misuse of ondropdown_change function`);
        }
        if(reload)
            this.updateUserInStorage();
    }

    updateUserInStorage(){
        // im still seeking for better way to do this.
        window.location.reload();
    }

    create_dropdown_session_related_options(): JSX.Element[]{
        const userJSON = sessionStorage.getItem("user");
        if(!userJSON){ // if not in session, GTFO
            return [];
        }
        const user = JSON.parse(userJSON) as UserButInSessionStorage;
        let dropdown_sessioned_options = [], followed, text, selected_value;
        if(this.props.type === "music" && this.props.dropdownOn){ // assume dropdownOn is Music
            if(user.Role === ROLES.admin){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`removeMusic:${this.props.dropdownOn.MusicID}`}>Delete this music</option>,
                    <option className="opt" value={`edit:music,${this.props.dropdownOn.UserID}`}>Edit this user</option>
                );
            }
            else{
                if(this.props.dropdownOn.UserID === user.UserID)
                dropdown_sessioned_options.push(
                    <option className="opt" value={`edit:music,${this.props.dropdownOn.UserID}`}>Edit this music</option>
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
            followed = is_user_followed(this.props.dropdownOn.UserID, user.Followees)
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
            if(user.Role === ROLES.admin){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`removeUser:${this.props.dropdownOn.UserID}`}>Delele this user</option>,
                    <option className="opt" value={`edit:user,${this.props.dropdownOn.UserID}`}>Edit this user</option>
                );
            }
            else{
                if(this.props.dropdownOn.UserID === user.UserID)
                dropdown_sessioned_options.push(
                    <option className="opt" value={`edit:user,${this.props.dropdownOn.UserID}`}>Edit this user</option>
                );
            }
        }
        else if(this.props.type === "playlist" && this.props.dropdownOn) { // assume dropdownOn is Playlist
            followed = is_playlist_followed(this.props.dropdownOn.PlaylistID, user.PlaylistsFollow);
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
    
            if(user.Role === ROLES.admin){
                dropdown_sessioned_options.push(
                    <option className="opt" value={`removePlaylist:${this.props.dropdownOn.PlaylistID}`}>Delete this playlist</option>,
                    <option className="opt" value={`edit:playlist,${this.props.dropdownOn.PlaylistID}`}>Edit this playlist</option>
                );
            }
        }
        else{
            console.log("misuse of vertical card function");
        }
        return dropdown_sessioned_options;
    }

    render() {
        return (
            <div className="dropdown">
                <select className="dropimg" name="selectoption" onChange={this.onDropdownChange}>
                    <option value="" hidden={true} disabled={false} defaultChecked={true}>
                        <img className="dropimg" width="1" src="/button/dropdown.png" alt="dropdown"/>
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
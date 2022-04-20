import { Component } from "react";
import { Playlist } from "../model/Playlist";
import { User } from "../model/User";

interface DrowdownProps{
    type:string;
    dropdownOn: any; // can be any of User | Playlist | Music
}
interface DrowdownState{
    selected: string
}
class Dropdown extends Component<DrowdownProps, DrowdownState> {
    private static ACTION_IN_SELECT = ["addToPlaylist", "followPlaylist", "redirectToUser", "share", "followUser", "removeUser", "removeMusic", "removePlaylist", "unfollowPlaylist", "unfollowUser"];
    cardOwnerID:string; // user id
    constructor(props:DrowdownProps){
        super(props);
        this.state = {
            selected : ""
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
                break;
            case Dropdown.ACTION_IN_SELECT[1]: // followPlaylist:UserID,PlaylistID
                break;
            case Dropdown.ACTION_IN_SELECT[2]: // redirectToUser:UserID
                user_id = params;
                window.location.replace(`/user?userid=${user_id}`); //redirect to ...
                break;
            case Dropdown.ACTION_IN_SELECT[3]: // share:
                console.log(`${command}: `); // noop
                alert("TBD");
                break;
            case Dropdown.ACTION_IN_SELECT[4]: // followUser:FollowerID,FolloweeID
            case Dropdown.ACTION_IN_SELECT[5]: // removeUser:UserID
            case Dropdown.ACTION_IN_SELECT[6]: // removeMusic:MusicID
            case Dropdown.ACTION_IN_SELECT[7]: // removePlaylist:PlaylistID
            case Dropdown.ACTION_IN_SELECT[8]: // unfollowPlaylist:UserID,PlaylistID
            case Dropdown.ACTION_IN_SELECT[9]: // unfollowUser:FollowerID,FolloweeID
            default:
                // console.log(`Command ${selectedAction} invalid: misuse of ondropdown_change function`);
                console.log("unimplemented i guess")
        }
        this.resetSelected();
        
    }

    resetSelected(){
        this.setState({selected : ""});
    }

    render() {
        return (
            <div className="dropdown">
                <select className="dropimg" name="selectoption" onChange={this.onDropdownChange}>
                    <option value="" hidden={true} disabled={true}>
                        <img className="dropimg" width="1" src="/button/dropdown.png"/>
                    </option>
                    <option className="opt" value={`${Dropdown.ACTION_IN_SELECT[2]}:${((this.props.dropdownOn) as User).UserID ? ((this.props.dropdownOn) as User).UserID : ((this.props.dropdownOn) as Playlist).PlaylistCreator}`}>Go to artist</option>
                    <option className="opt" value="share:">Share</option>

                </select>
            </div>
        );
    }

}

export default Dropdown;
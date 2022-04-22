import { Component } from "react";
import { get_parameter, goHomeKiddos, ROLES } from "../common";
import { PlaylistWithUserName } from "../model/Playlist";
import { User, UserButInSessionStorage } from "../model/User";
import { MusicWithUserName } from "../model/Music";
import { searchUserByUserID } from "../controller/UserController";
import { searchMusicsByMusicID } from "../controller/MusicController";
import { searchMusicInPlaylistByPlaylistID } from "../controller/PlaylistController";
import HorizontalCard from "../component/HorizontalCard";
import BundleOfHorizonalCard from "../component/BundleOfHorizontalCard";


interface EditPageParameter{
    // /edit?type=music&id=11
    type: string;
    id: number;
}
interface EditPageState{
    type: string;
    id: number;
    tobeEdit: {
        user: User | null,
        music: MusicWithUserName | null,
        playlist: PlaylistWithUserName | null
    },
    musicsFromPlaylistComponent: JSX.Element[];
}
class EditPage extends Component<{}, EditPageState> {
    constructor(props:any){
        super(props);
        let $_GET = get_parameter() as EditPageParameter;
        console.log($_GET);
        if(Object.values($_GET).length !== 2 || Object.values($_GET).map(v => !v).reduce((a, b) => a || b, false)){goHomeKiddos(); return;}
        this.state = {
            type: $_GET["type"],
            id: $_GET["id"],
            tobeEdit: {
                user: null,
                music: null,
                playlist: null
            },
            musicsFromPlaylistComponent: []
        };
        const userJSON = sessionStorage.getItem("user");
        if(!userJSON) {goHomeKiddos(); return;} // not in session, can't use this page
        const user = JSON.parse(userJSON) as UserButInSessionStorage;
        if(user.Role !== ROLES.admin){
            if(this.state.type === "user" && user.UserID  !== this.state.id){
                goHomeKiddos(); return;
            }
            else if(this.state.type === "user" && user.UserID  === this.state.id){
                searchUserByUserID(this.state.id).then(res =>{
                    if (!res.error && res.user){
                        let tobeEdit = this.state.tobeEdit;
                        tobeEdit.user = res.user;
                        this.setState({tobeEdit: tobeEdit}, ()=>this.forceUpdate());
                    }
                    else if(!res.error && res.user === null){
                        console.log("I believe user doesn't exist");
                        alert("User does't exist");
                    }
                    else{
                        console.log(res.message);
                        alert("It just error lmao");
                    }
                });
            }
            else if(this.state.type === "music"){
                searchMusicsByMusicID(this.state.id).then(res => {
                    if (!res.error && res.music === null){
                        console.log("I believe user doesn't exist");
                        alert("music does't exist");
                    }
                    else if (!res.error && res.music){
                        if(res.music.UserID) {goHomeKiddos(); return;}
                        let tobeEdit = this.state.tobeEdit;
                        tobeEdit.music = res.music;
                        this.setState({tobeEdit: tobeEdit}, ()=>this.forceUpdate());
                    }
                    else{
                        console.log(res.message);
                        alert("It just error lmao");
                    }
                });
            }
            else if(this.state.type === "playlist"){
                searchMusicInPlaylistByPlaylistID(this.state.id).then(res => {
                    if (!res.error && res.playlist === null){
                        console.log("I believe user doesn't exist");
                        alert("music does't exist");                        
                    }
                    else if(!res.error && res.playlist){
                        if(res.playlist.PlaylistCreator) {goHomeKiddos(); return;}
                        const tobeEdit = this.state.tobeEdit;
                        tobeEdit.playlist = res.playlist;
                        const musicList = HorizontalCard.createListOfHorizonaltalCardFromMusicWithUserName(res.musics);
                        this.setState({
                            tobeEdit: tobeEdit,
                            musicsFromPlaylistComponent: musicList
                        }, ()=>this.forceUpdate());
                    }
                    else{
                        console.log(res.message);
                        alert("It just error lmao");
                    }
                });
            }
        }
    }

    componentDidMount(){
        // for unfetched
        if(this.state.type === "user" && !this.state.tobeEdit.user){
            searchUserByUserID(this.state.id).then(res =>{
                if(!res.error){
                    let tobeEdit = this.state.tobeEdit;
                    tobeEdit.user = res.user;
                    this.setState({tobeEdit: tobeEdit}, ()=>this.forceUpdate());
                }
                else if (!res.error && res.user === null){
                    console.log("I believe user doesn't exist");
                    alert("User does't exist");
                }
                else{
                    console.log(res.message);
                    alert("It just error lmao");
                }
            });
        }
        if(this.state.type === "music" && !this.state.tobeEdit.music){
            searchMusicsByMusicID(this.state.id).then(res => {
                if(!res.error){
                    let tobeEdit = this.state.tobeEdit;
                    tobeEdit.music = res.music;
                    this.setState({tobeEdit: tobeEdit}, ()=>this.forceUpdate());
                }
                else if (!res.error && res.music === null){
                    console.log("I believe user doesn't exist");
                    alert("music does't exist");
                }
                else{
                    console.log(res.message);
                    alert("It just error lmao");
                }
            });
        }
        if(this.state.type === "playlist" && !this.state.tobeEdit.playlist){
            searchMusicInPlaylistByPlaylistID(this.state.id).then(res => {
                if(!res.error){
                    const tobeEdit = this.state.tobeEdit;
                    tobeEdit.playlist = res.playlist;
                    const musicList = HorizontalCard.createListOfHorizonaltalCardFromMusicWithUserName(res.musics);
                    this.setState({
                        tobeEdit: tobeEdit,
                        musicsFromPlaylistComponent: musicList
                    }, ()=>this.forceUpdate());
                }
                else if (!res.error && res.playlist === null){
                    console.log("I believe user doesn't exist");
                    alert("music does't exist");
                }
                else{
                    console.log(res.message);
                    alert("It just error lmao");
                }
            });
        }
    }

    render(){
        return (
            <div>
                <form></form>
                {this.state.type === "playlist" && <BundleOfHorizonalCard topText="Music" horiCards={this.state.musicsFromPlaylistComponent}/>}
            </div>
        );
    }
}

export default EditPage;
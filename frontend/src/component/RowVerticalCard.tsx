import { Component } from "react";
import VerticalCard from "./VerticalCard";
import { MusicWithUserName } from "../model/Music";
import { PlaylistWithUserName } from "../model/Playlist";
import { User } from "../model/User";
import { EACH_ROW } from "../setting"
interface RowProps{
    musics?: MusicWithUserName[] | null;
    playlists?: PlaylistWithUserName[] | [] | null;
    users?: User[] | [] | null;
    type: string;
    hidden: boolean;
}
class RowVerticalCard extends Component<RowProps>{

    userType(){
        if(!this.props.users) {return [];}
        let top_text, bottom_text, img, href, user, cards_tobe_append = [];
        for(let i = 0; i < EACH_ROW; i++){
            if(i < this.props.users.length){
                user = this.props.users[i];
                top_text = user.UserName;
                bottom_text = "User";
                img = user.UserProfileIMG ? user.UserProfileIMG : "/what is love.jpg"; // default value
                href = `/user?userid=${user.UserID}`; // TODO: tbd
                cards_tobe_append.push(
                    <div className="col-lg-2" hidden={this.props.hidden}>
                        <VerticalCard top_text={top_text} bottom_text={bottom_text} img_url={img} href={href} type={this.props.type} extra_info={user}/>
                    </div>
                );
            }
        }
        return cards_tobe_append;
    }
    playlistType(){
        if(this.props.playlists === null) {return [];}
        let top_text, bottom_text, img, href, playlist, cards_tobe_append = [];
        for(let i = 0; i < EACH_ROW; i++){
            if(this.props.playlists && i < this.props.playlists.length){
                playlist = this.props.playlists[i];
                top_text = playlist.PlaylistName;
                bottom_text = playlist.UserName;
                img = playlist.PlaylistIMG ? playlist.PlaylistIMG : "/what is love.jpg"; // default value
                href = `/playlist?playlistid=${playlist.PlaylistID}`; // TODO: tbd
                cards_tobe_append.push(
                    <div className="col-lg-2" hidden={this.props.hidden}>
                        <VerticalCard top_text={top_text} bottom_text={bottom_text} img_url={img} href={href} type={this.props.type} extra_info={playlist}/>
                    </div>
                );
            }
        }
        return cards_tobe_append;
    }

    musicType(){
        if(this.props.musics === null) {return [];}
        let top_text, bottom_text, img, href, music, cards_tobe_append = [];
        for(let i = 0; i < EACH_ROW; i++){
            if(this.props.musics && i < this.props.musics.length){
                music = this.props.musics[i];
                top_text = music.MusicName;
                bottom_text = music.UserName;
                img = music.MusicIMG ? music.MusicIMG : "/what is love.jpg"; // default value
                href = music.MusicFile; // TODO: tbd
                cards_tobe_append.push(
                    <div className="col-lg-2" hidden={this.props.hidden}>
                        <VerticalCard top_text={top_text} bottom_text={bottom_text} img_url={img} href={href} type={this.props.type} extra_info={music}/>
                    </div>
                );
            }
        }
        return cards_tobe_append;
    }

    render(){
        let cards_tobe_append: any[] = [];
        if(this.props.type === "music"){
            cards_tobe_append = this.musicType();
        }
        else if (this.props.type === "user"){
            cards_tobe_append = this.userType();
        }
        else if (this.props.type === "playlist"){
            cards_tobe_append = this.playlistType();
        }
        return (
            <div className="row history-row" id="search-history-append">
                <div className="col-lg-1"></div>
                {cards_tobe_append}
                <div className="col-lg-1"></div>
            </div>
        );
    }

}

export default RowVerticalCard;
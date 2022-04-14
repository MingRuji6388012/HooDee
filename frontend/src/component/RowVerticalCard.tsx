import { Component } from "react";
import VerticalCard from "./VerticalCard";
import { MusicWithUserName } from "../model/Music";

interface RowProp{
    musics: [MusicWithUserName] | undefined;
    type:string;
    hidden:boolean;
}

const EACH_ROW = 5;
class RowVerticalCard extends Component<RowProp>{

    render(){
        if(this.props.musics === undefined) {return;}
        let top_text, bottom_text, img, href, music, cards_tobe_append = [];
        for(let i = 0; i < EACH_ROW; i++){
            if(i < this.props.musics.length){
                music = this.props.musics[i];
                top_text = music.MusicName;
                bottom_text = music.UserName;
                img = music.MusicIMG ? music.MusicIMG : "/what is love.jpg"; // default value
                href = music.MusicFile; // TODO: tbd
                cards_tobe_append.push(
                    <div className="col-lg-2">
                        <VerticalCard top_text={top_text} bottom_text={bottom_text} img_url={img} href={href} type={this.props.type} extra_info={music}/>
                    </div>
                );
            }
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
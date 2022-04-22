import { Component } from "react";
import { MusicWithUserName } from "../model/Music";
import Dropdown from "./Dropdown";

interface HorizontalCardProps {
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    card_info:object;
}

class HorizontalCard extends Component<HorizontalCardProps> {
    static createListOfHorizonaltalCardFromMusicWithUserName(musics: MusicWithUserName[]|null){
        if (!musics) return [];
        let musicsComponent:JSX.Element[] = [];
        musics.forEach((v) => {
            musicsComponent.push(<HorizontalCard top_text={v.MusicName} bottom_text={v.UserName} img_url={v.MusicIMG} href={v.MusicFile} type="music" card_info={v} />)
        });
        return musicsComponent;
    }

    render(){
        return (
            <div>
                <div className="card music-card p-1 my-2">
                    <div className="row no-gutters">
                        <div className="col-lg-1"><img className="img-fluid rounded-start card-img-top" src={this.props.img_url} /></div>
                        <a className="col-lg-10 card-description" href={this.props.href}>
                            <figcaption className="card-body py-0">
                                <div className="card-title my-0">{this.props.top_text}</div>
                                <div className="card-text my-0">{this.props.bottom_text}</div>
                            </figcaption>
                        </a>
                        <div className="col-lg-1 vertical-dropdown">
                            <Dropdown type={this.props.type} dropdownOn={this.props.card_info}/> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HorizontalCard;
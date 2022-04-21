import { Component, ReactNode } from "react";
import Dropdown from "./Dropdown";


interface HalfTopCardProps{
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    card_info:object;
}

class HalfTopCard extends Component<HalfTopCardProps> {
    render(): ReactNode {
        return (
            <div>
                <div className="card music-card top-card">
                    <div className="row no-gutters fluid">
                        <div className="col-md-6">
                            <img src={this.props.img_url} className="img-fluid rounded-start card-img-top"/>
                        </div>
                        <a className="col-md-5" href={this.props.href}>
                            <div className="card-body">
                                <figcaption className="card-title h6">{this.props.top_text}</figcaption>
                                <figcaption className="card-text">{this.props.bottom_text}</figcaption>
                            </div>
                        </a>
                        <div className="col-md-1">
                            <Dropdown type={this.props.type} dropdownOn={this.props.card_info}/> 
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default HalfTopCard;
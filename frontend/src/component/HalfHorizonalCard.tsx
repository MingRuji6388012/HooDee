import { Component } from "react";
import Dropdown from "./Dropdown";

interface HalfHorizontalCardProps{
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    card_info:object;
}

class HalfHorizontalCard extends Component<HalfHorizontalCardProps> {
    render(){ 
        return (
            <div className="card music-card p-1 m-1">
                <div className="row no-gutters">
                    <div className="col-lg-1">
                        <img src={this.props.img_url} className="img-fluid rounded-start card-img-top" alt="..."/>
                    </div>
                    <a className="col-lg-10" href={this.props.href}>
                        <div className="card-body p-0">
                            <figcaption className="card-title non-top-result-name m-0">{this.props.top_text}</figcaption>
                            <figcaption className="card-text non-top-result-type">{this.props.bottom_text}</figcaption>
                        </div>
                    </a>
                    <div className="col-lg-1 dropdown">
                        <Dropdown type={this.props.type} dropdownOn={this.props.card_info}/> 
                    </div> 
                </div>
            </div>
        ); 
    };
}

export default HalfHorizontalCard;
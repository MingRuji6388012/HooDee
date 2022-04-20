import { Component, ReactNode } from "react";
import "../css/common.css"
import Dropdown from "./Dropdown";

interface VerticalCardProp {
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    card_info:object;
}

class VerticalCard extends Component<VerticalCardProp>{
    render(): ReactNode {
        // this is last thing that i want to do, god fuking damn it
        return (
            <div className="card music-card">
                <img className="card-img-top" src={this.props.img_url} alt="2021" />
                <Dropdown type={this.props.type} dropdownOn={this.props.card_info}/> 
                <a className="card-body" href={this.props.href}>
                    <figcaption className="card-title">{this.props.top_text}</figcaption>
                    <figcaption className="card-text"><div>{this.props.bottom_text}</div></figcaption>
                </a>
            </div>  
        );
    }
}

export default VerticalCard;
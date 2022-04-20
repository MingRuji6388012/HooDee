import { Component, ReactNode } from "react";
import "../css/common.css"

interface VerticalCardProp {
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    extra_info:object|null;
}

class VerticalCard extends Component<VerticalCardProp>{
    render(): ReactNode {
        return (
            <div className="card music-card">
                <img className="card-img-top" src={this.props.img_url} alt="2021" />
                {/* <dropdonwn type={this.type} owner={this.extra_info}/> // this is last thing that i want to do, god fuking damn it*/}
                <div className="card-body">
                    <figcaption className="card-title">{this.props.top_text}</figcaption>
                    <figcaption className="card-text"><a href={this.props.href}>{this.props.bottom_text}</a></figcaption>
                </div>
            </div>  
        );
    }
}

export default VerticalCard;
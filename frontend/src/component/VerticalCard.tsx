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
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    extra_info:object|null;
    
    constructor(props:VerticalCardProp){
        super(props);
        console.log(props);
        this.top_text = props["top_text"];
        this.bottom_text = props["bottom_text"];
        this.img_url = props["img_url"];
        this.href = props["href"];
        this.type = props["type"];
        this.extra_info = props["extra_info"];

    }

    render(): ReactNode {
        return (
            <div className="card music-card">
                <img className="card-img-top" src={this.img_url} alt="2021" />
                {/* <dropdonwn type={this.type} owner={this.extra_info}/> */}
                <div className="card-body">
                    <figcaption className="card-title">{this.top_text}</figcaption>
                    <figcaption className="card-text"><a href={this.href}>{this.bottom_text}</a></figcaption>
                </div>
            </div>  
        );
    }
}

export default VerticalCard;
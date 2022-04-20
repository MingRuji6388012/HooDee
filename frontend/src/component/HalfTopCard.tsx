import { Component, ReactNode } from "react";


interface HalfTopCardProps{
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    extra_info:object|null;
}

class HalfTopCard extends Component<HalfTopCardProps> {
    render(): ReactNode {
        return (
            <a href={this.props.href}>
                <div className="card music-card top-card">
                    <div className="row no-gutters fluid">
                        <div className="col-md-6">
                            <img src={this.props.img_url} className="img-fluid rounded-start card-img-top"/>
                        </div>
                        <div className="col-md-5">
                            <div className="card-body">
                                <figcaption className="card-title h6">{this.props.top_text}</figcaption>
                                <figcaption className="card-text">{this.props.bottom_text}</figcaption>
                            </div>
                        </div>
                        <div className="col-md-1">
                            {/* <dropdrown extra_info={this.props.extra_info}/> */}
                        </div>
                    </div>
                </div>
            </a> 
        );
    }
}

export default HalfTopCard;
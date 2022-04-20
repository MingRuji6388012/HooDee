import { Component } from "react";

interface HorizontalCardProps {
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    extra_info:object|null;
}

class HorizontalCard extends Component<HorizontalCardProps> {
    render(){
        return (
            <a href={this.props.href}>
                <div className="card music-card p-1 my-2">
                    <div className="row no-gutters">
                        <div className="col-lg-1"><img className="img-fluid rounded-start card-img-top" src={this.props.img_url} /></div>
                        <div className="col-lg-10 card-description">
                            <figcaption className="card-body py-0">
                                <div className="card-title my-0">{this.props.top_text}</div>
                                <div className="card-text my-0">{this.props.bottom_text}</div>
                            </figcaption>
                        </div>
                        <div className="col-lg-1 vertical-dropdown">
                            {/* dropdown */}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}

export default HorizontalCard;
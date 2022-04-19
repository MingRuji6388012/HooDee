import { Component } from "react";

interface HalfHorizonalCardProps{
    top_text:string;
    bottom_text:string;
    img_url:string;
    href:string;
    type:string;
    extra_info:object|null;
}

class HalfHorizonalCard extends Component<HalfHorizonalCardProps> {
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
                        {/* 
                        <select name="selectoption" className="dropimg" >
                            <option value="" selected disabled hidden><img className="dropimg" src="public/button/dropdown.png" alt="choices" width="1"/></option>
                            <option className="opt" value="redirectToUser:${UserID}">Go to artist</option>
                            <option className="opt" value="share:">Share</option>
                            <option className="opt" value="followUser:${FolloweeID},${FollowerID}">Follow this user</option>
                            <option className="opt" value="followPlaylist:${MusicID},${PlaylistID}">Follow this playlist</option>
                            <optgroup className="opt" label="Add to playlist : "/>
                            <option className="opt" value="addToPlaylist:${MusicID},${PlaylistID}">Playlist Name 1</option>
                            ...
                        </select> */}
                    </div> 
                </div>
            </div>

        ); 
    };

}

export default HalfHorizonalCard;
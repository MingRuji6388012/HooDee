import { Component } from "react";
import { get_parameter } from "../common";

interface QuantifierRadioButtonState {
    quantifier: string;
    subQuantifier: string;
}
class QuantifierRadioButtonForSearch extends Component<{}, QuantifierRadioButtonState> {

    constructor(props:any){
        super(props);
        let $_GET = get_parameter() as QuantifierRadioButtonState;
        this.state = {
            quantifier: $_GET["quantifier"] !== undefined ? $_GET["quantifier"] : "all",
            subQuantifier: $_GET["subQuantifier"] !== undefined ? $_GET["subQuantifier"] : "itsName"
        };
        this.handlePrimaryQuantifierChange = this.handlePrimaryQuantifierChange.bind(this);
        this.handleSecondaryQuantifierChange = this.handleSecondaryQuantifierChange.bind(this);
    }
    defaultSubQuantifier(q:string){
        let q2 = "";
        switch (q) {
            case "all":
                q2 = "itsName";
                break;
            case "user":
                q2 = "userName";
                break;
            case "music":
                q2 = "musicName";
                break;
            case "playlist":
                q2 = "playlistName";
                break;
        }
        return q2; 
    }
    handlePrimaryQuantifierChange(e:any){
        const q = e.target.value;
        const q2 = this.defaultSubQuantifier(q);
        this.setState({quantifier: q, subQuantifier: q2});
    }
    handleSecondaryQuantifierChange(e:any){
        this.setState({subQuantifier: e.target.value});
    }

    render () {
        return (
            <div>
                <div className="row my-3 search-mode-radio-button" onChange={this.handlePrimaryQuantifierChange}>
                    <div className="col-lg-1">Quantifier</div>
                    <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                        <input className="form-check-input" type="radio" name="quantifier" id="all-radio-button" value="all" defaultChecked/>
                        <label className="form-check-label">All</label>
                    </div>
                    <div className="col-lg-1 form-check form-check-inlines mx-0 px-4">
                        <input className="form-check-input" type="radio" name="quantifier" id="user-radio-button" value="user"/>
                        <label className="form-check-label">User</label>
                    </div>
                    <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                        <input className="form-check-input" type="radio" name="quantifier" id="music-radio-button" value="music"/>
                        <label className="form-check-label">Music</label>
                    </div>
                    <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                        <input className="form-check-input" type="radio" name="quantifier" id="playlist-radio-button" value="playlist"/>
                        <label className="form-check-label">Playlist</label>
                    </div>
                    <div className="col-lg-6 done-button mx-0 px-4">
                        <input className="btn justify-content-end" type="submit" value="Done"/>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
                <div className="row my-3 search-mode-radio-button" onChange={this.handleSecondaryQuantifierChange}>
                    <div className="col-lg-1">Sub Quantifier</div>
                    {
                        this.state.quantifier === "all" && [
                            <div className="col-lg-2 form-check form-check-inlines mx-0 px-4" key={"subQuantifier itsName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="itsName" defaultChecked={this.state.quantifier === "all"}/>
                                <label className="form-check-label">By It's name</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inline mx-0 px-4" key={"subQuantifier creatorName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="creatorName"/>
                                <label className="form-check-label">By Creator name</label>
                            </div>
                        ]
                    }
                    {
                        this.state.quantifier === "user" && [
                            <div className="col-lg-2 form-check form-check-inlines mx-0 px-4" key={"subQuantifier userName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="userName" defaultChecked={this.state.quantifier === "user"}/>
                                <label className="form-check-label">By Username</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inline mx-0 px-4" key={"subQuantifier firstName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="firstName"/>
                                <label className="form-check-label">By First Name</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inline mx-0 px-4" key={"subQuantifier userOnly"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="userOnly"/>
                                <label className="form-check-label">Only User</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inline mx-0 px-4" key={"subQuantifier artistOnly"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="artistOnly"/>
                                <label className="form-check-label">Only Artist</label>
                            </div>
                        ]
                    }
                    {
                        this.state.quantifier === "music" && [   
                            <div className="col-lg-2 form-check form-check-inlines mx-0 px-4" key={"subQuantifier musicName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="musicName" checked={this.state.subQuantifier === "musicName"}/>
                                <label className="form-check-label">By Music name</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inline mx-0 px-4" key={"subQuantifier aritistName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="aritistName" checked={this.state.subQuantifier === "aritistName"}/>
                                <label className="form-check-label">By Artist name</label>
                            </div>
                        ]
                    }
                    {
                        this.state.quantifier === "playlist" && [
                            <div className="col-lg-2 form-check form-check-inlines mx-0 px-4" key={"subQuantifier playlistName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="playlistName" defaultChecked={this.state.quantifier === "playlist"}/>
                                <label className="form-check-label">By Playlist name</label>
                            </div>,
                            <div className="col-lg-2 form-check form-check-inlines mx-0 px-4" key={"subQuantifier playlistCreatorName"}>
                                <input className="form-check-input" type="radio" name="subQuantifier" value="playlistCreatorName"/>
                                <label className="form-check-label">By Creator names</label>
                            </div>,
                        ]
                    }
                </div>
            </div>
        );
    }
}

export default QuantifierRadioButtonForSearch;
import { Component } from "react";
import { get_parameter } from "../common";

interface QuantifierRadioButtonState {
    quantifier: string;
}
class QuantifierRadioButtonForSearch extends Component<{}, QuantifierRadioButtonState> {

    constructor(props:any){
        super(props);
        let $_GET = get_parameter() as QuantifierRadioButtonState;
        this.state = {
            quantifier: $_GET["quantifier"] !== undefined ? $_GET["quantifier"] : "all"
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleRadioChange(e:any){
        this.setState({quantifier: e.target.value});
    }

    render () {
        return (
            <div className="row my-3 search-mode-radio-button" onChange={this.handleRadioChange}>
                <div className="col-lg-1"></div>
                <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                    <input className="form-check-input" type="radio" name="quantifier" id="all-radio-button" value="all" checked={this.state.quantifier === "all"}/>
                    <label className="form-check-label">All</label>
                </div>
                <div className="col-lg-1 form-check form-check-inlines mx-0 px-4">
                    <input className="form-check-input" type="radio" name="quantifier" id="user-radio-button" value="user" checked={this.state.quantifier === "user"}/>
                    <label className="form-check-label">User</label>
                </div>
                <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                    <input className="form-check-input" type="radio" name="quantifier" id="music-radio-button" value="music" checked={this.state.quantifier === "music"}/>
                    <label className="form-check-label">Music</label>
                </div>
                <div className="col-lg-1 form-check form-check-inline mx-0 px-4">
                    <input className="form-check-input" type="radio" name="quantifier" id="playlist-radio-button" value="playlist" checked={this.state.quantifier === "playlist"}/>
                    <label className="form-check-label">Playlist</label>
                </div>
                <div className="col-lg-6 done-button mx-0 px-4">
                    <input className="btn justify-content-end" type="submit" value="Done"/>
                </div>
                <div className="col-lg-1"></div>
            </div>
        );
    }
}

export default QuantifierRadioButtonForSearch;
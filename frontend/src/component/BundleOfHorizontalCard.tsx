import { Component } from "react";

interface BundleOfHorizonalCardProps {
    topText: string;
    horiCards: JSX.Element[];
}
class BundleOfHorizonalCard extends Component<BundleOfHorizonalCardProps>{
    constructor(props:BundleOfHorizonalCardProps){
        super(props);
    }
    render() {
        return (
            <section className="music-section my-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-11 music-title">{this.props.topText}</div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            {this.props.horiCards}
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
            </section>
        );
    }
}

export default BundleOfHorizonalCard;
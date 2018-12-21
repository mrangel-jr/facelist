import React, { Component, Fragment } from "react";
import "./components.css";

class CardAd extends Component {
    constructor() {
        super()
    }

    render() {
        const {item} = this.props;
        return (
            <div>
                <Fragment key={item.key}>
                <hr />
                <div id="cardad-container">
                    <img
                        id="ad-img"
                        alt="Ads"
                        src={item.ad}
                    />
                </div>              
                </Fragment>
            </div>
        )
    }
}

export default CardAd;
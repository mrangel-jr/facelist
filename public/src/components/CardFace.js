import React, { Component, Fragment } from "react";
import "./components.css";

class CardFace extends Component {
    // constructor() {
    //     super()
    // }

    formatMoney(cents) {
        return "$"+String(cents/100);
    }

    formatDate(date) {
        const today = new Date();
        const newDay = new Date(date);
        const one_day=1000*60*60*24;
        let diff = Math.floor((today-newDay)/one_day);
        if(diff === 0) {
            return "Today !!!";
        }
        if(diff <=7 ) {
            if(diff===1) return `a ${diff} day ago`;
            return `a ${diff} days ago`;
        }
        return newDay.toLocaleDateString();
    }
 
    render() {
        const {item} = this.props;
        return (
            <Fragment key={item.id}>
                <hr />
                <div id="cardface-container">
                    <div id="face-container">
                        <p>{item.face}</p>
                    </div>
                    <div id="content-container">
                        <p>ID: {item.id}</p>
                        <p>Size: {item.size}px</p>
                        <p>Price: {this.formatMoney(item.price)}</p>
                        <p>Date: {this.formatDate(item.date)}</p>
                    </div>
                </div>
          </Fragment>
        )
    }
}

export default CardFace;
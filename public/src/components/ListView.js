import React, {Component} from 'react';
import InfiniteScroll from './InfiniteScroll';


class ListView extends Component {
    constructor() {
        super();
        this.state = {
            currentOrder: 'price'
        };
        this.maxPerPage = 20;
        this.changeOrder = this.changeOrder.bind(this);
    }

    changeOrder(e) {
        this.setState({currentOrder:e.target.value});
    }

    renderFilter(currentOrder) {
        return (
            <div id="filter-container">
                Order:
                <select onChange={this.changeOrder} value={currentOrder}> 
                    <option value="price" defaultValue>Price</option>
                    <option value="size">Size</option>
                    <option value="id">Id</option>
                </select>
            </div>
        )
    }


    render() {
        const {currentOrder} = this.state;
        return (
            <div id="listview-container">
                {this.renderFilter(currentOrder)}
                <InfiniteScroll order={currentOrder} moreUsers={this.maxPerPage}/>
            </div>
        );
    }
}

export default ListView;
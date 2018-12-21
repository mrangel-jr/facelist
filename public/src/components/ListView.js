import React, {Component} from 'react';
import InfiniteScroll from './InfiniteScroll';


class ListView extends Component {
    constructor() {
        super();
        this.state = {
            currentOrder: 'price'
        };
        this.maxPerPage = 20;
        this.changeOrder = this.changeOrder.bind();
    }

    changeOrder(e) {
        // console.log(e.target.value)
        this.setState({currentOrder:`'${e.target.value}'`});
    }


    render() {
        const {currentOrder} = this.state;
        return (
            <div>
                <div>Order:
                    <select onChange={this.changeOrder} value={currentOrder}> 
                        <option value="price" defaultValue>Price</option>
                        <option value="size">Size</option>
                        <option value="id">Id</option>
                    </select>
                </div>
                <InfiniteScroll order={currentOrder} moreUsers={this.maxPerPage}/>
            </div>
        );
    }
}

export default ListView;
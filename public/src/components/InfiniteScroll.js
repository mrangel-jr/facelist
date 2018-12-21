import React, { Component, Fragment } from "react";
import axios from 'axios';
import CardAd from "./CardAd";
import CardFace from "./CardFace";

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      page: 1,
      lastAd: undefined,
      items: []
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.loadContents();
      }
    };
  }

  componentWillMount() {
    // Loads some items on initial load
    this.loadContents();
  }

  loadContents() {
    const {moreUsers,order} = this.props;
    const {items,page} = this.state;
    const {lastAd} = this.state;
    const number = (function randNumber(lastAd) {
      const random = Math.floor(Math.random()*1000);
      if (lastAd !== undefined && lastAd === random) {
        randNumber(lastAd);
      }
      return random;
    })(lastAd);

    this.setState({ isLoading: true }, () => {
      axios.all([
        axios.get(`http://localhost:3000/api/products/?_page=${page}&_limit=${moreUsers}&_sort=${order}`),
        axios.get(`http://localhost:3000/ads/?r=${number}`)
        ])
        .then(axios.spread((cards,ads) => {
          // do something with both responses
          const newCards = cards.data
          .map(card => ({
            size: card.size,
            price: card.price,
            face: card.face,
            date: card.date,
            id: card.id,
          }));
          const ad = ({
            key: number,
            ad: ads.request.responseURL,
          });
          console.log(ad);
          this.setState({
            // Note: Depending on the API you're using, this value may be
            // returned as part of the payload to indicate that there is no
            // additional data to be loaded
            hasMore: (this.state.items.length < 500),
            isLoading: false,
            page: page + 1,
            lastAd: number,
            items: [
              ...items,
              ...newCards,
              ad
            ],
          });
        }));
    });
    
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      items,
    } = this.state;

    return (
      <div>
        {items.map(item => (
          item.ad ?
          <CardAd item={item}/> : <CardFace item={item}/>
        ))}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>~ End of Catalogue ~</div>
        }
      </div>
    );
  }
}

export default InfiniteScroll;
import React, { Component } from 'react';
import ListView from './components/ListView';
import {Header} from "./components/Header";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="App">
        <Header/>
        <ListView/>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;

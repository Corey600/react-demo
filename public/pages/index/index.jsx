import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import utils from '../../common/js/utils';
import logo from '../../common/resources/logo.svg';
import '../../common/styles/style.scss';
import './index.scss';

class App extends Component {
  constructor() {
    super();
    this.msg = ' Index!';
  }
  getMsg() {
    return utils.output() + this.msg;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.getMsg()} Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

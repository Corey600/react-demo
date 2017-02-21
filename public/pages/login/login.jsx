import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import utils from '../../common/js/utils';
import '../../common/styles/style.scss';
import './login.scss';

class Index extends Component {
  constructor() {
    super();
    this.msg = ' Login!';
  }
  getMsg() {
    return utils.output() + this.msg;
  }
  render() {
    return (
      <div>
        <span>{this.getMsg()}</span>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import utils from '../../common/js/utils.js';
import '../../common/styles/style.scss';
import './login.scss';

class Index extends Component {
  render() {
    return (
      <div>
        <span>{utils.output()}</span>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import ReactIntlProvider from '../../modules/ReactIntlProvider';
import ReactDocumentTitle from '../../modules/ReactDocumentTitle';
import utils from '../../common/js/utils';
import '../../common/styles/style.scss';
import './login.scss';

class App extends Component {
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
        <FormattedMessage
          id="body.superHello"
          description="say hello to Howard."
          defaultMessage="Hello, Howard"
          values={{
            someone: <b>Eric</b>,
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <ReactIntlProvider>
    <ReactDocumentTitle title="login.title">
      <App />
    </ReactDocumentTitle>
  </ReactIntlProvider>,
  document.getElementById('root'),
);

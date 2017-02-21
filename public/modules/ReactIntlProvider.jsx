import React, { PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/zh';
import zhCN from '../locales/zh-CN';
import enUS from '../locales/en-US';

addLocaleData([...en, ...zh]);

const local = 'zh';
const localLang = local === 'en' ? enUS : zhCN;

const ReactIntlProvider = ({ children }) => (
  <IntlProvider locale={local} messages={localLang}>
    {children}
  </IntlProvider>
);

ReactIntlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReactIntlProvider;

import React, { PropTypes } from 'react';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import DocumentTitle from 'react-document-title';

const ReactDocumentTitle = ({ title, children, intl }) => {
  const messages = defineMessages({
    title: {
      id: title,
      defaultMessage: 'Title',
      description: 'Page Title',
    },
  });
  return (
    <DocumentTitle title={intl.formatMessage(messages.title)}>
      {children}
    </DocumentTitle>
  );
};

ReactDocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ReactDocumentTitle);

import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import Documents from '../../../features/Documents/view/PivotContainer';

const Page = ({ history }) => <Documents navigateTo={history.push} />;

Page.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Page);

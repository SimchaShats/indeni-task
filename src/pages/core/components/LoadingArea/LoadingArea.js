import React, { Fragment } from 'react';
import './LoadingArea.css';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingArea = ({ loading, children }) => <Fragment>
  { loading
    ? <div className='LoadingContainer'><CircularProgress/></div>
    : children
  }
</Fragment>;


LoadingArea.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
};

export default LoadingArea;
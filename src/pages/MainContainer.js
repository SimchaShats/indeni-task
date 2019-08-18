import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { gridViewNavThunk } from './gridView/thunks/dataThunks';
import GridViewPage from './gridView/components/GridViewPage';
import DetailsViewPage from './detailsView/components/DetailsViewPage';

/* It's a good to use css-modules (https://github.com/css-modules/css-modules),
just for quick implementation of task we use simple css class names */
const MainContainer = ({ page, dispatch }) => {

  useEffect(() => {
    // Catch default route
    if (!page) {
      dispatch(gridViewNavThunk({ page: 'gridView' }));
    }
  }, [dispatch, page]);

  return <Fragment>
    { page === 'gridView' && <GridViewPage/> }
    { page === 'detailsView' && <DetailsViewPage/> }
  </Fragment>
};

MainContainer.propTypes = {
  page: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  page: state.getIn(['core', 'nav', 'page']),
});

export default connect(
  mapStateToProps,
)(MainContainer)


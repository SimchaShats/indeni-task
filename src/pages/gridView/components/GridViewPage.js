import React, { memo } from 'react';
import { connect } from 'react-redux'
import './GridViewPage.css';
import GridViewHeader from './GridViewHeader/GridViewHeader';
import GridViewBody from './GridViewBody/GridViewBody';
import UserCardFull from './UserCard/UserCardFull';
import Dialog from '@material-ui/core/Dialog';
import ImmutablePropTypes from 'immutable-prop-types';
import { Map } from 'immutable';

/* It's a good to use css-modules (https://github.com/css-modules/css-modules),
just for quick implementation of task we use simple css class names */
const GridViewPage = memo(({ modal }) => (
  <div className='GVPContainer'>
    <GridViewHeader/>
    <GridViewBody/>
    <Dialog open={ !!modal.get('open') }>
      <UserCardFull id={ modal.getIn(['data', 'id']) }/>
    </Dialog>
  </div>
));

GridViewPage.propTypes = {
  modal: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => ({
  modal: state.getIn(['core', 'ui', 'modal', 'gridView'], Map()),
});

export default connect(
  mapStateToProps,
)(GridViewPage)


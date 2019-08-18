import React, { Fragment, useMemo, memo } from 'react';
import { useSelector } from 'react-redux'
import './GridViewBody.css';
import UserCard from '../UserCard/UserCard';
import LoadingArea from '../../../core/components/LoadingArea/LoadingArea';
import { makeComplexUsersList } from '../../gridViewSelectors';

const GridViewBody = memo(() => {

  const selectComplexUsersList = useMemo(
    makeComplexUsersList,
    [],
  );

  const users = useSelector(state =>
    selectComplexUsersList(state),
  );

  return <Fragment>
    <LoadingArea loading={ !users }>
      <div className='GVBContainer'>
        { users && users.map(user => <UserCard key={ user.get('id') } user={ user }/>) }
      </div>
    </LoadingArea>
  </Fragment>
});

export default GridViewBody;


import React, { useCallback, memo } from 'react';
import './GridViewHeader.css';
import Button from '@material-ui/core/Button';
import { goToPage } from '../../../../utils/navUtils';
import { gridViewAddRandomThunk } from '../../thunks/dataThunks';
import { useDispatch } from 'react-redux'

const GridViewHeader = memo(() => {
  const dispatch = useDispatch();

  const addUser = useCallback(() =>
      goToPage({ page: 'detailsView', subPage: 'newUser' }), // id='newUser' instead of id='-1' for pretty url and clean understanding in the code
    []);

  const addRandom = useCallback(() =>
      dispatch(gridViewAddRandomThunk()), // id='newUser' instead of id='-1' for pretty url and clean understanding in the code
    [dispatch]);

  return <div className='GVHContainer'>
    <Button variant='contained' className='GVHButton' color='primary' onClick={ addUser }>
      New
    </Button>
    <Button variant='contained' className='GVHButton' color='secondary' onClick={ addRandom }>
      Random
    </Button>
  </div>
});

export default GridViewHeader;


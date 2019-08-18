import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux'
import './DetailsViewFooter.css';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'immutable-prop-types';
import Button from '@material-ui/core/Button';
import { detailsViewDeleteThunk, detailsViewUpdateThunk } from '../thunks/dataThunks';
import { Map } from 'immutable';

const DetailsViewFooter = memo(({ user, id, form }) => {
  const dispatch = useDispatch();

  const update = useCallback(() => {
    dispatch(detailsViewUpdateThunk({ form, id: user.get('id') }))
  }
,    [dispatch, user, form]);

  const deleteUser = useCallback(() =>
      dispatch(detailsViewDeleteThunk({ id: user.get('id') })),
    [dispatch, user]);

  if (id === 'newUser') {
    user = Map();
  }

  return <div className='DVPFooter'>
    <Button onClick={ update } className='DVPFooterButton' variant='contained' color='primary'>
      { id === 'newUser' ? 'Create' : 'Update' }
    </Button>
    { id !== 'newUser' && <Button onClick={ deleteUser } className='DVPFooterButton' variant='contained'>
      Delete
    </Button> }
  </div>
});

DetailsViewFooter.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  id: PropTypes.string,
  form: PropTypes.object.isRequired,
};

export default DetailsViewFooter


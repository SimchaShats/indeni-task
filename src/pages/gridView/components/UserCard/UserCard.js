import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux'
import './UserCard.css';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'immutable-prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Fullscreen from '@material-ui/icons/Fullscreen';
import IconButton from '@material-ui/core/IconButton';
import { gridViewUserOpenThunk } from '../../thunks/dataThunks';
import { goToPage } from '../../../../utils/navUtils';
import LoadingArea from '../../../core/components/LoadingArea/LoadingArea';

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    maxHeight: 300,
    position: 'relative',
  },
});

const USER_DETAILS = ['fullName', 'email'];

// It can be good in real project to add l10n for strings
const UserCard = memo(({ user, dispatch }) => {
  const classes = useStyles();

  const openModal = useCallback(() => dispatch(
    gridViewUserOpenThunk({ id: user.get('id') }),
  ), [dispatch, user]);

  const editUser = useCallback(() =>
      goToPage({ page: 'detailsView', subPage: user.get('id') }),
    [user]);

  return <LoadingArea loading={ !user }>
    { user && <Card className={ classes.card }>
      <div className='UCTools'>
        <IconButton size='small' onClick={ editUser }><EditIcon/></IconButton>
        <IconButton size='small' onClick={ openModal }><Fullscreen/></IconButton>
      </div>
      <CardMedia
        component='img'
        image={ user.get('imageUrl') }/>
      <CardContent className='UCContent'>
        { USER_DETAILS.map((detail) =>
          <Typography
            key={ `${ user.get('id') }_${ user.get(detail) }` }
            variant='body2' color='textPrimary'
            component='p'>
            { user.get(detail) }
          </Typography>) }
      </CardContent>
    </Card> }
  </LoadingArea>
});

UserCard.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(UserCard); // Empty connect use for import dispatch


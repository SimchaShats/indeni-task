import React, { Fragment, useCallback, memo } from 'react';
import { connect, useDispatch } from 'react-redux'
import './UserCard.css';
import { makeStyles } from '@material-ui/core/styles';
import ImmutablePropTypes from 'immutable-prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { coreUIModalClose } from '../../../core/actions';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    maxHeight: '100%',
    position: 'relative',
  },
});

const USER_DETAILS = ['fullName', 'birthday', 'email', 'address'];
const USER_TITLES = {
  fullName: 'Full Name',
  birthday: 'Birthday',
  email: 'Email',
  address: 'Address',
};

const UserCardFull = memo(({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeModal = useCallback(() => dispatch(
    coreUIModalClose({ name: 'gridView' }),
  ), [dispatch]);

  return <Card className={ classes.card }>
    { user
      ? <Fragment>
        <div className='UCTools'>
          <IconButton size='small' onClick={ closeModal }><CloseIcon/></IconButton>
        </div>
        <CardMedia
          component='img'
          image={ user.get('imageUrl') }/>
        <CardContent className='UCContent'>
          { USER_DETAILS.map((detail) => <Typography key={ USER_TITLES[detail] } variant='body2' color='textPrimary' component='p'>
            { `${ USER_TITLES[detail] }: ${ user.get(detail) || '' }` }
          </Typography>) }
        </CardContent>
      </Fragment>
      : <div className='GVBLoading'><CircularProgress/></div> }
  </Card>
});

UserCardFull.propTypes = {
  user: ImmutablePropTypes.map,
};

const mapStateToProps = (state, { id }) => ({
  user: state.getIn(['detailsView', 'data', 'user', id]),
});

export default connect(
  mapStateToProps,
)(UserCardFull)


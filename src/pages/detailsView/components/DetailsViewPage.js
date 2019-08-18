import React, { useCallback, useState, memo } from 'react';
import { connect, useDispatch } from 'react-redux'
import './DetailsViewPage.css';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'immutable-prop-types';
import Button from '@material-ui/core/Button';
import { goToPage } from '../../../utils/navUtils';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LoadingArea from '../../core/components/LoadingArea/LoadingArea';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Map } from 'immutable';
import IconButton from '@material-ui/core/IconButton';
import DetailsViewFooter from './DetailsViewFooter';
import Dialog from '@material-ui/core/Dialog';
import { coreUIModalClose, coreUIModalOpen } from '../../core/actions';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5hVKP3zB2XTgLGtLvDbczF3ZDWbjD5ki9uxZGkUD7AIhRr-n';
const getDateString = date => `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;

const DetailsViewPage = memo(({ user, id, modal }) => {
  const dispatch = useDispatch();

  // In real app we would use some form library to handle work with forms like redux-form or react-final-form
  const [form, setForm] = useState({
    imageUrl: (user && user.get('imageUrl')) || DEFAULT_IMAGE,
    birthday: (user && user.get('birthday')) || getDateString(new Date()),
  });

  const handleChange = fieldName => event => {
    let value;
    if (event instanceof Date) {
      value = getDateString(event);
    } else {
      value = event.target.value;
    }
    form[fieldName] = value;
    setForm({ ...form });
  };

  const back = useCallback(() =>
      goToPage({ page: 'gridView' }),
    []);

  const editImage = useCallback(() =>
      dispatch(coreUIModalOpen({ name: 'detailsView' })),
    [dispatch]);

  const closeImageModal = useCallback(() =>
      dispatch(coreUIModalClose({ name: 'detailsView' })),
    [dispatch]);

  if (id === 'newUser') {
    user = Map();
  }

  return <LoadingArea loading={ !user && id !== 'newUser' }>
    { user && <div className='DVPContainer'>
      <Button onClick={ back } variant='contained' className='DVPButton' color='primary'>
        Back
      </Button>
      <div className='DVPDetails'>
        <div className='DVPImage'>
          <img alt='avatar' src={ form.imageUrl || user.get('imageUrl') || DEFAULT_IMAGE }/>
          <IconButton className='DVPImageEdit' size='small' onClick={ editImage }><EditIcon/></IconButton>
        </div>
        <div className='DVPDetail'>
          <Typography variant='body1' color='textPrimary' component='p'>
            Full Name:
          </Typography>
          <TextField
            id='fullName'
            defaultValue={ user.get('fullName') }
            onBlur={ handleChange('fullName') }
          />
        </div>
        <div className='DVPDetail'>
          <Typography variant='body1' color='textPrimary' component='p'>
            Birthday:
          </Typography>
          { /* In real work we will use "moment" library to work with dates*/ }
          <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='M/d/yyyy'
              id='birthday'
              value={ form.birthday || user.get('birthday') }
              onChange={ handleChange('birthday') }
              KeyboardButtonProps={ {
                'aria-label': 'Birthday',
              } }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className='DVPDetail'>
          <Typography variant='body1' color='textPrimary' component='p'>
            Address:
          </Typography>
          <TextField
            id='address'
            defaultValue={ user.get('address') }
            onBlur={ handleChange('address') }
          />
        </div>
        <div className='DVPDetail'>
          <Typography variant='body1' color='textPrimary' component='p'>
            Email:
          </Typography>
          <TextField
            type="email"
            autoComplete="email"
            id='email'
            defaultValue={ user.get('email') }
            onBlur={ handleChange('email') }
          />
        </div>
        <DetailsViewFooter id={ id } form={ form } user={ user }/>
      </div>
      <Dialog open={ !!modal.get('open') }>
        <div className='DVPModal'>
          <div className='DVPImageClose'><IconButton size='small' onClick={ closeImageModal }><CloseIcon/></IconButton>
          </div>
          <Typography variant='body1' color='textPrimary' component='p'>
            Image Url:
          </Typography>
          <TextField
            type="imageUrl"
            id='imageUrl'
            defaultValue={ user.get('imageUrl') }
            onBlur={ handleChange('imageUrl') }
          />
        </div>
      </Dialog>
    </div> }
  </LoadingArea>
});

DetailsViewPage.propTypes = {
  user: ImmutablePropTypes.map,
  modal: ImmutablePropTypes.map.isRequired,
  id: PropTypes.string,
};

const mapStateToProps = state => {
  const id = state.getIn(['core', 'nav', 'data', 'id']);
  return {
    modal: state.getIn(['core', 'ui', 'modal', 'detailsView'], Map()),
    user: state.getIn(['detailsView', 'data', 'user', id]),
    id,
  }
};

export default connect(
  mapStateToProps,
)(DetailsViewPage)


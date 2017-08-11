import { connect } from 'react-redux';
import { login, signUp, logout } from '../../../actions/session_actions';
import Login from './login';
import ASYNC from '../../../util/async_util.js';

const mapStateToProps = ( { currentUser, errors }) => ({
    errors: errors,
    currentUser: currentUser
  });

const mapDispatchToProps = (dispatch) => ({
    login: user => dispatch(login(user))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Login);

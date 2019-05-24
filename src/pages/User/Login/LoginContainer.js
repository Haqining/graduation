import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';

import { login } from '../../../store/User/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

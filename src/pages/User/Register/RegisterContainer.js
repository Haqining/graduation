import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from './Register';

import { register } from '../../../store/User/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ register }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

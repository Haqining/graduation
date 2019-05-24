import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Play from './Play';

import { getVideoById } from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVideoById }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);

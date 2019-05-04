import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Article from './Article';

import {} from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);

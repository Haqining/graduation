import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageComment from './ManageComment';

import {} from '../../../store/Admin/actions';
import {} from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageComment);

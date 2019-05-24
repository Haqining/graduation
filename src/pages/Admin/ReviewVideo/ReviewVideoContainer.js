import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewVideo from './ReviewVideo';

import { getPendingVideo } from '../../../store/Admin/actions';
import { deleteVideo } from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPendingVideo, deleteVideo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewVideo);

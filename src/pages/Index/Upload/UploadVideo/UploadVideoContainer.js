import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadVideo from './UploadVideo';

import { uploadImage, saveVideo } from '../../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ uploadImage, saveVideo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadVideo);

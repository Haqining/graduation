import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadArticle from './UploadArticle';

import { uploadImage, saveArticle } from '../../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ uploadImage, saveArticle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadArticle);

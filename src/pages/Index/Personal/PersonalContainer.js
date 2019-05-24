import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Personal from './Personal';

import {
  getVideoByUserId,
  getArticleByUserId,
  getPendingArticleByUserId,
  getPendingVideoByUserId,
  deleteVideo,
  deleteArticle
} from '../../../store/Index/actions';

const mapStateToProps = ({ UserReducer }) => ({
  userInfo: UserReducer.userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getVideoByUserId,
      getArticleByUserId,
      getPendingArticleByUserId,
      getPendingVideoByUserId,
      deleteVideo,
      deleteArticle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal);

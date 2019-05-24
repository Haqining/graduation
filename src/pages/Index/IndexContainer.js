import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from './Index';

import { getVideo, getArticle } from '../../store/Index/actions';
import { getUserInfo } from '../../store/User/actions';

const mapStateToProps = ({ UserReducer }) => ({
  userInfo: UserReducer.userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVideo, getArticle, getUserInfo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonalSetting from './PersonalSetting';

import {
  uploadImage,
  saveOrUpdateUserInfo
} from '../../../store/Index/actions';
import { getUserInfo } from '../../../store/User/actions';

const mapStateToProps = ({ UserReducer }) => ({
  userInfo: UserReducer.userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { uploadImage, saveOrUpdateUserInfo, getUserInfo },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalSetting);

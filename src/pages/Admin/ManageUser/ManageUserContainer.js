import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageUser from './ManageUser';

import {
  getUser,
  lockAccount,
  unlockAccount
} from '../../../store/Admin/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUser, lockAccount, unlockAccount }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUser);

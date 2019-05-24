import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewArticle from './ReviewArticle';

import { getPendingArticle } from '../../../store/Admin/actions';
import { deleteArticle } from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPendingArticle, deleteArticle }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewArticle);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentList from './CommentList';

import { getCommentById, saveComment } from '../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCommentById, saveComment }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);

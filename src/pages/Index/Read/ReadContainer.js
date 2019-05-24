import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Read from './Read';

import { getArticleById } from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getArticleById }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Read);

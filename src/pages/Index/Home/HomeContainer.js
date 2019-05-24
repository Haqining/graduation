import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';

import {} from '../../../store/Index/actions';

const mapStateToProps = ({ IndexReducer }) => ({
  videoList: IndexReducer.videoList,
  articleList: IndexReducer.articleList
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

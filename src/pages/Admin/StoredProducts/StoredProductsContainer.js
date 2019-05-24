import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StoredProducts from './StoredProducts';

import { getProductsByUserId } from '../../../store/Admin/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getProductsByUserId }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoredProducts);

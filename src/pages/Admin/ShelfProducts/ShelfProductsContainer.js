import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShelfProducts from './ShelfProducts';

import { shelfProducts } from '../../../store/Admin/actions';
import { uploadImage } from '../../../store/Index/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ shelfProducts, uploadImage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShelfProducts);

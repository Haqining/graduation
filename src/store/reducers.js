import { combineReducers } from 'redux';

import IndexReducer from './Index/reducer';
import UserReducer from './User/reducer';
import AdminReducer from './Admin/reducer';

export default combineReducers({
  IndexReducer,
  UserReducer,
  AdminReducer
});

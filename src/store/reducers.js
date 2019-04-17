import { combineReducers } from 'redux';

import IndexReducer from './Index/reducer';
import UserReducer from './User/reducer';

export default combineReducers({
  IndexReducer,
  UserReducer
});

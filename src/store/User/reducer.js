import { SET_USER_INFO } from './actionTypes';

const initialState = {
  userInfo: {
    id: 0,
    avatar: '',
    username: 'no username',
    introduction: '',
    sex: '男',
    hometown: '11,1101,110101',
    birthday: '1970-01-01'
  }
};

const userHandler = new Map([
  [
    SET_USER_INFO,
    (state, userInfo) => ({
      ...state,
      userInfo
    })
  ]
]);

export default function(state = initialState, action) {
  return userHandler.get(action.type)
    ? userHandler.get(action.type)(state, action.payload)
    : state;
}

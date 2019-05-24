import Axios from 'axios';
import { SET_USER_INFO } from './actionTypes';

export const login = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/user/subLogin',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const register = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/user/addUser',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getUserInfo = () => dispatch =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/userInfo/getUserInfo',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => {
        const {
          data: { data }
        } = res;
        if (data) {
          dispatch({
            type: SET_USER_INFO,
            payload: {
              avatar: !!data.headPicture ? `http://${data.headPicture}` : '',
              username: !!data.nickName ? data.nickName : '',
              introduction: !!data.sign ? data.sign : '',
              sex: !!data.gender ? data.gender : '',
              hometown: !!data.location ? data.location : '',
              birthday: !!data.birthday ? data.birthday : ''
            }
          });
        }
        return resolve(res);
      })
      .catch(err => reject(err));
  });

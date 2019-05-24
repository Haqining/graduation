import Axios from 'axios';
import {} from './actionTypes';

export const createAuction = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/auction/createAuction',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const saveProducts = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/goods/saveGoods',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getProductsHasStatus = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/goods/queryGoodsStatus'
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getProductsByUserId = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/goods/queryGoodsByUser',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteProduct = id => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/goods/delGoods',
      data: { id }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const lockAccount = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/user/lockAccount',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const unlockAccount = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/user/unlockAccount',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getUser = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/user/queryAllUser',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getPendingArticle = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/article/getWithoutPermitArticle',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getPendingVideo = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/getWithoutPermitVideo',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const shelfProducts = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-MICRO-PROGRAM/auction/auctionNow',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

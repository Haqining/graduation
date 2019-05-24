import Axios from 'axios';
import { SET_ARTICLE, SET_VIDEO } from './actionTypes';

export const saveArticle = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/article/saveArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteArticle = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/article/delArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const updateArticle = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/article/updateArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getArticle = () => dispatch =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/article/getAllArticle'
    })
      .then(res => {
        const {
          data: { data }
        } = res;
        if (data) {
          dispatch({
            type: SET_ARTICLE,
            payload: data.map((value, index) => ({
              articleId: value.id,
              userId: value.userId,
              time: value.createTime,
              articleCover: `http://${value.headPictureUrl}`,
              articleTitle: value.title,
              contentType: value.articleType.id,
              articleIntroduction: value.introduction,
              articleContent: value.content,
              status: value.status
            }))
          });
        }
        return resolve(res);
      })
      .catch(err => reject(err));
  });

export const getArticleById = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/article/queryArticleById',
      params: data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getArticleByUserId = id => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/article/getArticleByUserId',
      params: {
        userId: id
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getPendingArticleByUserId = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/article/getArticleUnPermitByUserId',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const saveVideo = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/saveVideoArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteVideo = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/delVideoArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const updateVideo = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/updateVideoArticle',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getVideo = () => dispatch =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/queryAllVideoArticle'
    })
      .then(res => {
        const {
          data: { data }
        } = res;
        if (data) {
          dispatch({
            type: SET_VIDEO,
            payload: data.map((value, index) => ({
              userId: value.userId,
              time: value.createTime,
              videoId: value.id,
              videoTitle: value.title,
              contentType: value.type.id,
              videoUrl: value.videoUrl,
              videoCover: `http://${value.headPictureUrl}`,
              videoIntroduction: value.introduction,
              status: value.status
            }))
          });
        }
        return resolve(res);
      })
      .catch(err => reject(err));
  });

export const getVideoById = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/queryVideoArticleById',
      params: data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getVideoByUserId = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/videoArticle/queryVideoArticleByUserId',
      params: data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getPendingVideoByUserId = () => () =>
  new Promise((resolve, reject) => {
    Axios({
      url:
        '/SERVICE-MODULE-ARTICLE/videoArticle/queryUnPermitVideoArticleByUser',
      params: {
        userId: localStorage.getItem('userId')
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const saveComment = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/comment/saveComment',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteComment = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/comment/delComment',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const getCommentById = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/comment/getArticleComments',
      params: data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const saveLike = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/like/saveLike',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteLike = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/SERVICE-MODULE-ARTICLE/like/delLike',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const countLike = commentId => () =>
  new Promise((resolve, reject) => {
    Axios({
      url: '/SERVICE-MODULE-ARTICLE/like/countLike',
      data: { commentId }
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const saveOrUpdateUserInfo = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url: '/userInfo/saveOrUpdateUserInfo',
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const uploadImage = data => () =>
  new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      baseURL: 'http://ngrok.hergua.cn:15000/',
      url: '/ImageFile/upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

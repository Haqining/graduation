import { SET_ARTICLE, SET_VIDEO } from './actionTypes';

const initialState = {
  videoList: [],
  articleList: []
};

const indexHandler = new Map([
  [
    SET_VIDEO,
    (state, videoList) => ({
      ...state,
      videoList
    })
  ],
  [
    SET_ARTICLE,
    (state, articleList) => ({
      ...state,
      articleList
    })
  ]
]);

export default function(state = initialState, action) {
  return indexHandler.get(action.type)
    ? indexHandler.get(action.type)(state, action.payload)
    : state;
}

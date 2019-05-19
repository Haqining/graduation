import {} from './actionTypes';

const initialState = {};

const adminHandler = new Map([]);

export default function(state = initialState, action) {
  return adminHandler.get(action.type)
    ? adminHandler.get(action.type)(state, action.payload)
    : state;
}

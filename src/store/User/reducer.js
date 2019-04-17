import {} from './actionType';

const initialState = {};

const userHandler = new Map([]);

export default function(state = initialState, action) {
  return userHandler.get(action.type)
    ? userHandler.get(action.type)(state, action.payload)
    : state;
}

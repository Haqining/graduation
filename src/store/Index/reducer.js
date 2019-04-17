import {} from './actionType';

const initialState = {};

const indexHandler = new Map([]);

export default function(state = initialState, action) {
  return indexHandler.get(action.type)
    ? indexHandler.get(action.type)(state, action.payload)
    : state;
}

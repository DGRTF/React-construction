import {
  setQuantityMoreConstructions,
  setSkipMoreConstructions,
} from '../../actions/MoreConstructions/MoreConstructions';

export type ActionTypes =
  ReturnType<typeof setQuantityMoreConstructions>
  | ReturnType<typeof setSkipMoreConstructions>
  ;

export const roomReducer = function (state = {
  quantity: 10,
  skip: 0,
  // path: '',
}, action: ActionTypes) {
  switch (action.type) {
    case "MORE_CONSTRUCTIONS_SET_QUANTITY":
      return { ...state, quantity: action.payload }
    case "MORE_CONSTRUCTIONS_SET_SKIP":
      return { ...state, skip: action.payload }
    // case "MORE_CONSTRUCTIONS_SET_PATH":
    //   return { ...state, path: action.payload }
    default:
      return state
  }
}



export default roomReducer;
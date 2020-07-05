import {
  setSkipQuantityMoreRooms,
  addSkipQuantityMoreRooms
} from '../../actions/MoreRooms/MoreRooms';

export type ActionTypes =
  ReturnType<typeof setSkipQuantityMoreRooms>
  | ReturnType<typeof addSkipQuantityMoreRooms>
  ;

export const moreRooms = function (state: {
  skipQuantityConstriction: {
    skip: number,
    quantity: number,
    constructionId: number,
  }[],
} = {
    skipQuantityConstriction: [],
  }, action: ActionTypes) {
  switch (action.type) {
    case "MORE_ROOMS_SET_SKIP_QUANTITY":
      return { ...state, skipQuantityConstriction: action.payload }
    case "MORE_ROOMS_ADD_SKIP_QUANTITY":
      return { ...state, skipQuantityConstriction: action.payload.concat(state.skipQuantityConstriction) }
    default:
      return state
  }
}



export default moreRooms;
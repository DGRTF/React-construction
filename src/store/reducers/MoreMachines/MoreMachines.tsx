import {
  setQuantityMoreMachines,
  setSkipMoreMachines,
  setGetMachineInConstructionPathMoreMachines,
  setGetMachineInRoomPathMoreMachines,
} from '../../actions/MoreMachines/MoreMachines';

export type ActionTypes =
  ReturnType<typeof setQuantityMoreMachines>
  | ReturnType<typeof setSkipMoreMachines>
  | ReturnType<typeof setGetMachineInConstructionPathMoreMachines>
  | ReturnType<typeof setGetMachineInRoomPathMoreMachines>
  ;

export const roomReducer = function (state = {
  quantity: 10,
  skip: 0,
  path: '',
}, action: ActionTypes) {
  switch (action.type) {
    case "MORE_MACHINE_SET_QUANTITY":
      return { ...state, quantity: action.payload }
    case "MORE_MACHINE_SET_SKIP":
      return { ...state, skip: action.payload }
    case "MORE_MACHINE_SET_PATH":
      return { ...state, path: action.payload }
    default:
      return state
  }
}



export default roomReducer;
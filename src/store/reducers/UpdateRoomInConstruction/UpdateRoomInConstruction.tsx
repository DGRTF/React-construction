import { setUpdate, setState } from '../../actions/UpdateRoomInConstruction/UpdateRoomInConstruction';

type ActionTypes = ReturnType<typeof setUpdate> | ReturnType<typeof setState>;

export const reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'SET_UPDATE':
      return { ...state, updateFunction: action.payload }
  }
}
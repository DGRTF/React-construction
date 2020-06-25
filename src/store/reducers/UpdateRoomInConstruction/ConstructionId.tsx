import { setState, setConstructionId } from '../../actions/UpdateRoomInConstruction/ConstructionId';

type ActionTypes = ReturnType<typeof setState> | ReturnType<typeof setConstructionId>;;

export const reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'SET_CONSTRUCTION_ID':
      return { ...state, constructionId: action.payload }
  }
}
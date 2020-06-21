import { setConstructionId, setState } from '../../actions/AddEditRoom/ConstructionId';

type ActionTypes = ReturnType<typeof setConstructionId> | ReturnType<typeof setState>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_CONSTRUCTIONID":
      return state = action.constructionId;
  }
}
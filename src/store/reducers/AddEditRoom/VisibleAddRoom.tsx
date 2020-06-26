import { setVisible, setState } from '../../actions/AddEditRoom/VisibleAddRoom';

type ActionTypes = ReturnType<typeof setVisible> | ReturnType<typeof setState>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return state = action.state;
    case "SET_VISIBLE":
        return state = action.visible;
  }
}
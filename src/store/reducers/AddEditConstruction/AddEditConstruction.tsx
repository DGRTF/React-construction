import { setConstructionJSON, setState, 
  // setCallback, 
  setVisible, setHeaderName, setSubmitName, setPath, setEditPath } from '../../actions/AddEditConstruction/AddEditConstruction';

type ActionTypes = ReturnType<typeof setConstructionJSON>
  | ReturnType<typeof setState>
  | ReturnType<typeof setVisible>
  // | ReturnType<typeof setCallback>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setSubmitName>
  | ReturnType<typeof setEditPath>;

export let reducer = function (state: any, action: ActionTypes) {
  switch (action.type) {
    case "SET_STATE":
      return action.payload
    case "SET_VISIBLE":
      return { ...state, visible: action.payload }
    case "SET_CONSTRUCTION_JSON":
      return { ...state, constructionJSON: action.payload }
    case 'SET_HEADER_NAME':
      return { ...state, headerName: action.payload }
    case 'SET_SUBMIT_NAME':
      return { ...state, submitName: action.payload }
    case 'SET_PATH':
      return { ...state, path: action.payload }
    case 'SET_EDIT_PATH':
      return { ...state, editPath: action.payload }
  }
}
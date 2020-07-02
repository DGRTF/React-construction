import {
  setConstructionJSON,
  setVisible,
  setHeaderName,
  setSubmitName,
  setPath
} from '../../actions/AddEditConstruction/AddEditConstruction';

type ActionTypes =
  ReturnType<typeof setConstructionJSON>
  | ReturnType<typeof setVisible>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setSubmitName>;

export const reducer = function (state = {
  constructionJSON: {
    id: 0,
    name: '',
    address: '',
    haveMachine: false,
  },
  visible: false,
  headerName: '',
  submitName: '',
  path: '',
  editPath: ''
}, action: ActionTypes) {
  switch (action.type) {
    case "ADD_EDIT_CONSTRUCTION_SET_VISIBLE":
      return { ...state, visible: action.payload }
    case "ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_JSON":
      return { ...state, constructionJSON: action.payload }
    case 'ADD_EDIT_CONSTRUCTION_SET_HEADER_NAME':
      return { ...state, headerName: action.payload }
    case 'ADD_EDIT_CONSTRUCTION_SET_SUBMIT_NAME':
      return { ...state, submitName: action.payload }
    case 'ADD_EDIT_CONSTRUCTION_SET_PATH':
      return { ...state, path: action.payload }
    default:
      return state
  }
}

export default reducer;
import {
  setConstructionJSON,
  setVisibleAddEditConstructionForm,
  setHeaderName,
  setSubmitName,
  setPath,
  setConstructionTemplate,
} from '../../actions/AddEditConstruction/AddEditConstruction';

type ActionTypes =
  ReturnType<typeof setConstructionJSON>
  | ReturnType<typeof setVisibleAddEditConstructionForm>
  | ReturnType<typeof setHeaderName>
  | ReturnType<typeof setPath>
  | ReturnType<typeof setSubmitName>
  | ReturnType<typeof setConstructionTemplate>
  ;

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
    case 'ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_TEMPLATE':
      return {
        ...state,
        constructionJSON: action.payload.constructionJSON,
        visible: action.payload.visible,
        headerName: action.payload.headerName,
        submitName: action.payload.submitName,
      }
    default:
      return state
  }
}

export default reducer;
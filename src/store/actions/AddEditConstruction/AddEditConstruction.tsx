export const setConstructionJSON = function (constructionJSON: {
  id: number;
  name: string;
  address: string;
  haveMachine: boolean;
}) {
  return {
    type: GetLiteralInString("ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_JSON"),
    payload: constructionJSON
  }
};


export const setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("ADD_EDIT_CONSTRUCTION_SET_VISIBLE"),
    payload: visible
  }
};

export const setHeaderName = (headerName: string) => {
  return {
    type: GetLiteralInString("ADD_EDIT_CONSTRUCTION_SET_HEADER_NAME"),
    payload: headerName
  }
}

export const setSubmitName = (submitName: string) => {
  return {
    type: GetLiteralInString("ADD_EDIT_CONSTRUCTION_SET_SUBMIT_NAME"),
    payload: submitName
  }
}

export const setPath = (path: string) => {
  return {
    type: GetLiteralInString('ADD_EDIT_CONSTRUCTION_SET_PATH'),
    payload: path
  }
}

export const setEditPathInPath = () => {
  return {
    type: GetLiteralInString('ADD_EDIT_CONSTRUCTION_SET_PATH'),
    payload: `Constructions/EditConstruction`
  }
}

export const setAddPathInPath = () => {
  return {
    type: GetLiteralInString('ADD_EDIT_CONSTRUCTION_SET_PATH'),
    payload: 'Constructions/AddConstruction'
  }
}


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
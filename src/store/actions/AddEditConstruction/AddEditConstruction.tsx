export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export let setConstructionJSON = function (constructionJSON: {
  id: number;
  name: string;
  address: string;
}) {
  return {
    type: GetLiteralInString("SET_CONSTRUCTION_JSON"),
    payload: constructionJSON
  }
};

// export let setCallback = function (UpdateCallback: (constructionJSONArr: {
//   id: number;
//   name: string;
//   address: string;
//   constructionId: number;
//   haveMachine: boolean;
// }[]) => void) {
//   return {
//     type: GetLiteralInString("SET_CALL_BACK"),
//     payload: UpdateCallback
//   }
// };


export let setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("SET_VISIBLE"),
    payload: visible
  }
};

export const setHeaderName = (headerName: string) => {
  return {
    type: GetLiteralInString("SET_HEADER_NAME"),
    payload: headerName
  }
}

export const setSubmitName = (submitName: string) => {
  return {
    type: GetLiteralInString("SET_SUBMIT_NAME"),
    payload: submitName
  }
}

export const setPath = (path: string) => {
  return {
    type: GetLiteralInString('SET_PATH'),
    payload: path
  }
}

export const setEditPath = (editPath: string) => {
  return {
    type: GetLiteralInString('SET_EDIT_PATH'),
    payload: editPath
  }
}


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
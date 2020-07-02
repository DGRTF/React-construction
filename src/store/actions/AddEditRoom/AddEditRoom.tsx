export const setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_VISIBLE"),
    payload: visible
  }
};

export const setCallback = function (UpdateCallback: (roomJSONArr: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean;
}[]) => void) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_CALLBACK"),
    payload: UpdateCallback
  }
};

export const setRoomJSON = function (roomJSON: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean;
}) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_ROOM_JSON"),
    payload: roomJSON
  }
};

export const setPath = function (path: string) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_PATH"),
    payload: path
  }
};

export const setHeaderName = function (headerName: string) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_HEADER_NAME"),
    payload: headerName
  }
};

export const setSubmitName = function (submitName: string) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_SUBMIT_NAME"),
    payload: submitName
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
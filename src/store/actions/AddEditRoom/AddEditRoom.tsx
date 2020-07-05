export const setVisible = function (visible: boolean) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_VISIBLE"),
    payload: visible
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

export const setAddPath = function () {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_PATH"),
    payload: 'Rooms/AddRoomInConstruction'
  }
};

export const setEditPath = function () {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_PATH"),
    payload: 'Rooms/EditRoomInConstruction'
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

export const setAddEditRoomTemplate = function (roomTemplate: {
  visible: boolean;
  roomJSON: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  };
  headerName: string;
  submitName: string;
}) {
  return {
    type: GetLiteralInString("ADD_EDIT_ROOM_SET_ROOM_TEMPLATE"),
    payload: roomTemplate
  }
};



function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
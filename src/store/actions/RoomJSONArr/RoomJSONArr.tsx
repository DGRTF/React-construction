export const setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export const setRoomJSONArr = function (roomJSONArr: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean;
}[]) {
  return {
    type: GetLiteralInString("SET_ROOM_JSON"),
    payload: roomJSONArr
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
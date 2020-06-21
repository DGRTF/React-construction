export let setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    state
  }
};

export let setRoomJSON = function (roomJSON: {
  id: number;
  name: string;
  floor: number;
}) {
  return {
    type: GetLiteralInString("SET_ROOMJSON"),
    roomJSON
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
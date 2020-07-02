export const setUpdate = function (update: boolean) {
  return {
    type: GetLiteralInString("UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE"),
    payload: update
  }
};

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
export const setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export const setUpdate = function (update: boolean) {
  return {
    type: GetLiteralInString("SET_UPDATE"),
    payload: update
  }
};

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
export const setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export const setDeletePath = function (deletePath: string) {
  return {
    type: GetLiteralInString("SET_DELETE_PATH"),
    payload: deletePath
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
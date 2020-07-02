export const setDeletePath = function (deletePath: string) {
  return {
    type: GetLiteralInString("DELETE_MACHINE_PATH_SET_DELETE_PATH"),
    payload: deletePath
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
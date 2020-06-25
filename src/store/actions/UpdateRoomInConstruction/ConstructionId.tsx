export const setState = function (state: any) {
  return {
    type: GetLiteralInString("SET_STATE"),
    payload: state
  }
};

export const setConstructionId = function (constructionId: number) {
  return {
    type: GetLiteralInString("SET_CONSTRUCTION_ID"),
    payload: constructionId
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
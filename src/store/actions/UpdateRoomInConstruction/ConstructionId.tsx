export const setConstructionId = function (constructionId: number) {
  return {
    type: GetLiteralInString("UPDATE_ROOM_IN_CONSTRUCTION_SET_CONSTRUCTION_ID"),
    payload: constructionId
  }
};


function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
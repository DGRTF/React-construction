export function setQuantityMoreConstructions(quantity: number) {
  return {
    type: GetLiteralInString('MORE_CONSTRUCTIONS_SET_QUANTITY'),
    payload: quantity
  }
}

export function setSkipMoreConstructions(skip: number) {
  return {
    type: GetLiteralInString('MORE_CONSTRUCTIONS_SET_SKIP'),
    payload: skip
  }
}

// export function setGetConstructionsPathMoreConstructions(constructionId: number) {
//   return {
//     type: GetLiteralInString('MORE_CONSTRUCTIONS_SET_PATH'),
//     payload: `Machines/GetMachinesInConstruction?constructionId=${constructionId}`
//   }
// }



function GetLiteralInString<T extends string>(str: T): T {
  return str;
}

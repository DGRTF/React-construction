export function setQuantityMoreMachines(quantity: number) {
  return {
    type: GetLiteralInString('MORE_MACHINE_SET_QUANTITY'),
    payload: quantity
  }
}

export function setSkipMoreMachines(skip: number) {
  return {
    type: GetLiteralInString('MORE_MACHINE_SET_SKIP'),
    payload: skip
  }
}

export function setGetMachineInRoomPathMoreMachines(roomId: number) {
  return {
    type: GetLiteralInString('MORE_MACHINE_SET_PATH'),
    payload: `Machines/GetMachinesInRoom?roomId=${roomId}`
  }
}

export function setGetMachineInConstructionPathMoreMachines(constructionId: number) {
  return {
    type: GetLiteralInString('MORE_MACHINE_SET_PATH'),
    payload: `Machines/GetMachinesInConstruction?constructionId=${constructionId}`
  }
}



function GetLiteralInString<T extends string>(str: T): T {
  return str;
}


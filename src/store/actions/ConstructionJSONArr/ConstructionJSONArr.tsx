import { stateType } from '../../store';

export const setConstructionJSONArr = function (constructionJSONArr: {
  id: number
  name: string
  address: string
  haveMachine: boolean
}[]) {
  return {
    type: GetLiteralInString("CONSTRUCTION_JSON_ARR_SET_CONSTRUCTION_JSON"),
    payload: constructionJSONArr
  }
}

export const setRoomsInConstruction = function (
  rooms: {
    id: number
    name: string
    floor: number
    constructionId: number
    haveMachine: boolean
  }[]
) {
  return {
    type: GetLiteralInString("CONSTRUCTION_JSON_ARR_SET_ROOMS_IN_CONSTRUCTION"),
    payload: rooms
  }
}

export function getConstructionJSONArr() {
  return function (dispatch: any) {
    return fetch('Constructions/GetConstructions', {
      method: 'POST',
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

export function addEditConstruction(formData: FormData) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(getState().addEditConstruction.path, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

export function deleteConstruction(formData: FormData) {
  return function (dispatch: any) {
    return fetch('Constructions/DeleteConstruction', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => dispatch(setConstructionJSONArr(json)))
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}

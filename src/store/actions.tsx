import { stateType } from './store';
import { getRoomsInConstructionWithCurrentMachine } from './actions/Rooms/Rooms';
import { getConstructionJSONArr } from "./actions/ConstructionJSONArr/ConstructionJSONArr";

export let setMachineArr = function (machineJSONArr: {
  id: number;
  name: string;
  createYear: number;
  roomId: number;
}[]) {
  return {
    type: GetLiteralInString("SET_MACHINE_ARR"),
    payload: machineJSONArr
  }
};

export function addEditMachine(formData: FormData) {
  const roomId: number = Number(formData.get('roomId'))
  formData.delete('roomId');
  return function (dispatch: any, getState: () => stateType) {
    return fetch(getState().addEditMachine.path, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => {
        dispatch(setMachineArr(json));
        getConstructionJSONArr()(dispatch);
        getRoomsInConstructionWithCurrentMachine(roomId)(dispatch, getState);
      })
  }
}

export function deleteMachine(id: number) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(`${getState().addEditMachine.deletePath}&machineId=${id}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        let roomId: number;
        getState().machineJSONArr.machineJSONArr.forEach(el => {
          if (el.id === id)
            roomId = el.roomId;
        })
        dispatch(setMachineArr(json));
        getConstructionJSONArr()(dispatch);
        getRoomsInConstructionWithCurrentMachine(roomId)(dispatch, getState);
      })
  }
}

export function getMachineInConstruction(constructionId: number) {
  return function (dispatch: any) {
    return fetch(`Machines/GetMachinesInConstruction?constructionId=${constructionId}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => dispatch(setMachineArr(json)))
  }
}

export function getMachineInRoom(roomId: number) {
  return function (dispatch: any) {
    return fetch(`Machines/GetMachinesInRoom?roomId=${roomId}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => dispatch(setMachineArr(json)))
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
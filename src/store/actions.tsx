import { stateType } from './store';
import { getRoomsInConstructionWithCurrentMachine } from './actions/Rooms/Rooms';
import { getConstructionJSONArr } from "./actions/ConstructionJSONArr/ConstructionJSONArr";
import { setQuantityMoreMachines, setGetMachineInConstructionPathMoreMachines, setGetMachineInRoomPathMoreMachines } from './actions/MoreMachines/MoreMachines';


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
    return fetch(`${getState().addEditMachine.path}&skip=${getState().moreMachines.skip}&take=${getState().moreMachines.quantity}`, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(json => {
        dispatch(setMachineArr(json));
        getConstructionJSONArr()(dispatch, getState);
        getRoomsInConstructionWithCurrentMachine(roomId)(dispatch, getState);
      })
  }
}

export function deleteMachine(id: number) {
  return function (dispatch: any, getState: () => stateType) {
    return fetch(`${getState().addEditMachine.deletePath}&machineId=${id}&skip=${getState().moreMachines.skip}&take=${getState().moreMachines.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        let roomId: number;
        getState().machineJSONArr.machineJSONArr.forEach(el => {
          if (el.id === id)
            roomId = el.roomId;
        })
        dispatch(setMachineArr(json));
        getConstructionJSONArr()(dispatch,getState);
        getRoomsInConstructionWithCurrentMachine(roomId)(dispatch, getState);
      })
  }
}

const takeMachine = 10;
const takeMachineStep = 10;

export function getMachineInConstruction(constructionId: number) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setQuantityMoreMachines(takeMachine));
    dispatch(setGetMachineInConstructionPathMoreMachines(constructionId));
    return fetch(`Machines/GetMachinesInConstruction?constructionId=${constructionId}&skip=${getState().moreMachines.skip}&take=${getState().moreMachines.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        dispatch(setMachineArr(json));
      })
  }
}

export function getMachineInRoom(roomId: number) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setQuantityMoreMachines(takeMachine));
    dispatch(setGetMachineInRoomPathMoreMachines(roomId));
    return fetch(`Machines/GetMachinesInRoom?roomId=${roomId}&skip=${getState().moreMachines.skip}&take=${getState().moreMachines.quantity}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        dispatch(setMachineArr(json));
      })
  }
}

export function getMoreMachines() {
  return function (dispatch: any, getState: () => stateType) {
    const moreMachines = getState().moreMachines;
    return fetch(`${moreMachines.path}&skip=${moreMachines.skip}&take=${moreMachines.quantity + takeMachineStep}`, {
      method: 'POST',
    }).then(response => response.json())
      .then(json => {
        dispatch(setMachineArr(json));
        const changeQuantity = moreMachines.quantity + takeMachineStep;
        if (json.length >= moreMachines.quantity)
          dispatch(setQuantityMoreMachines(changeQuantity));
      })
  }
}

function GetLiteralInString<T extends string>(str: T): T {
  return str;
}
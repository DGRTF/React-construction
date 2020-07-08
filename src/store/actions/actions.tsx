import { stateType } from '../store';
import {
  setAddEditDeletePathsInRoom,
  setPathEqualAddPath,
  setMachineTemplate,
  setPathEqualEditPath,
  setMachineJSON,
  setVisibleAddEditMachineForm
} from './AddEditMachine/AddEditMachine';
import { setGetMachineInRoomPathMoreMachines } from './MoreMachines/MoreMachines';
import {
  setAddEditRoomTemplate,
  setAddPath,
  setEditPathAddEditRoom,
  setRoomJSON,
  setVisibleAddEditRoomForm
} from './AddEditRoom/AddEditRoom';
import {
  setAddPathInPath,
  setConstructionTemplate,
  setEditPathInPath,
  setConstructionJSON,
  setVisibleAddEditConstructionForm
} from './AddEditConstruction/AddEditConstruction';

export function openAddMachineForm(room: {
  name: string,
  id: number,
}) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setMachineTemplate({
      visible: true,
      machineJSON: {
        id: null,
        name: null,
        createYear: null,
        roomId: room.id,
      },
      headerName: `Добавить оборудование в комнату "${room.name}"`,
      submitName: 'Добавить оборудование',
    }));
    dispatch(setAddEditDeletePathsInRoom(room.id));
    setPathEqualAddPath()(dispatch, getState);
    dispatch(setGetMachineInRoomPathMoreMachines(room.id));
  }
}

export function openEditMachineForm(machine: {
  id: number;
  name: string;
  createYear: number;
  roomId: number;
}) {
  return function (dispatch: any, getState: () => stateType) {
    console.warn(machine);
    dispatch(setMachineTemplate({
      visible: true,
      machineJSON: machine,
      headerName: 'Редактировать оборудование',
      submitName: 'Готово',
    }));
    setPathEqualEditPath()(dispatch, getState);
  }
}

export function closeAddEditMachineForm() {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setVisibleAddEditMachineForm(false));
    dispatch(setMachineJSON(null));
  }
}

export function openAddRoomForm(construction: {
  id: number;
  name: string;
}) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setAddEditRoomTemplate({
      visible: true,
      headerName: `Добавить комнату в здание "${construction.name}"`,
      submitName: 'Добавить комнату',
      roomJSON: {
        id: 0,
        name: null,
        floor: null,
        haveMachine: false,
        constructionId: construction.id,
      },
    }));
    dispatch(setAddPath());
  }
}

export function openEditRoomForm(room: {
  id: number;
  name: string;
  floor: number;
  constructionId: number;
  haveMachine: boolean;
}) {
  return function (dispatch: any, getState: () => stateType) {
    let constructionName: string;
    const constructions = getState().constructionJSONArr.constructionJSONArr;
    for (let i = 0; i < constructions.length; i++) {
      if(constructions[i].id=room.constructionId){
        constructionName=constructions[i].name;
        break;
      }
    }
    dispatch(setAddEditRoomTemplate({
      visible: true,
      headerName: `Редактировать комнату в здании "${constructionName}"`,
      submitName: 'Изменить',
      roomJSON: room,
    }));
    dispatch(setEditPathAddEditRoom());
  }
}

export function closeAddEditRoomForm() {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setVisibleAddEditRoomForm(false));
    dispatch(setRoomJSON(null));
  }
}

export function openAddConstructionForm() {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setAddPathInPath());
    dispatch(setConstructionTemplate({
      constructionJSON: null,
      visible: true,
      headerName: 'Добавить здание',
      submitName: 'Добавить',
    }));
  }
}

export function openEditConstructionForm(construction: {
  id: number;
  name: string;
  address: string;
  haveMachine: boolean;
}) {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setConstructionTemplate({
      constructionJSON: construction,
      visible: true,
      headerName: `Редактировать здание "${construction.name}"`,
      submitName: 'Изменить',
    }));
    dispatch(setEditPathInPath());
  }
}

export function closeAddEditConstructionForm() {
  return function (dispatch: any, getState: () => stateType) {
    dispatch(setVisibleAddEditConstructionForm(false));
    dispatch(setConstructionJSON(null));
  }
}

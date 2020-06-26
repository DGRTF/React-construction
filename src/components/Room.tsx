import React, { Component } from 'react';
import './Room.scss';
import FormOneSubmit from './FormOneSubmit';
import store from '../store/store';
import Button from './Button/Button';
import storeAddEditMachine from '../store/store/AddEditMachine/AddEditMachine';
import storeDeleteMachinePath from './../store/store/DeleteMachinePath/DeleteMachinePath';
import storeConstructionIdUpdate from '../store/store/UpdateRoomInConstruction/ConstructionId';


interface IRoomProps {
  roomJSON: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  };
}

export default class Room extends Component<IRoomProps> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visibleButton: true
    }
  }
  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];

  private machineInRoomPath = 'Machines/GetMachinesInRoom';

  private machineInRoomPathEdit = 'Machines/EditMachineInRoom';

  private machineInRoomPathAdd = 'Machines/AddMachineInRoom';

  render() {
    return (
      <div className='room'>
        <div className='room__label'></div>
        <div className='room__add-machine'>
          <Button name='+' ClickHandler={this.AddMachineInRoom.bind(this)} />
        </div>
        <FormOneSubmit name={this.props.roomJSON.name} EventGetData={this.GetMachineInRoom.bind(this)}></FormOneSubmit>
      </div >
    );
  }

  private async GetMachineInRoom(formData: FormData): Promise<void> {
    storeAddEditMachine.dispatch({
      type: 'SET_EDIT_PATH',
      payload: this.machineInRoomPathEdit
    });

    formData.append('roomId', `${this.props.roomJSON.id}`);
    const response = await fetch(this.machineInRoomPath, {
      method: 'POST',
      body: formData
    });

    this.machineJSONArr = await response.json();
    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: this.machineJSONArr
      }
    });

    storeDeleteMachinePath.dispatch({
      type: 'SET_DELETE_PATH',
      payload: `Machines/DeleteMachineInRoom?roomId=${this.props.roomJSON.id}`
    });

    storeConstructionIdUpdate.dispatch({
      type: 'SET_CONSTRUCTION_ID',
      payload: this.props.roomJSON.constructionId
    });
  }

  private AddMachineInRoom() {
    storeAddEditMachine.dispatch({
      type: 'SET_VISIBLE',
      payload: true
    });

    storeAddEditMachine.dispatch({
      type: 'SET_MACHINE_JSON',
      payload: {
        id: null,
        name: '',
        createYear: null,
        roomId: this.props.roomJSON.id
      }
    });

    storeAddEditMachine.dispatch({
      type: 'SET_HEADER_NAME',
      payload: `Добавить оборудование в комнату "${this.props.roomJSON.name}"`
    });

    storeAddEditMachine.dispatch({
      type: 'SET_SUBMIT_NAME',
      payload: `Добавить оборудование`
    });

    storeAddEditMachine.dispatch({
      type: 'SET_PATH',
      payload: this.machineInRoomPathAdd
    });

    storeAddEditMachine.dispatch({
      type: 'SET_EDIT_PATH',
      payload: this.machineInRoomPathEdit
    });

    storeDeleteMachinePath.dispatch({
      type: 'SET_DELETE_PATH',
      payload: `Machines/DeleteMachineInRoom?constructionId=${this.props.roomJSON.id}`
    });

    console.warn(this.props.roomJSON.constructionId);

    storeConstructionIdUpdate.dispatch({
      type: 'SET_CONSTRUCTION_ID',
      payload: this.props.roomJSON.constructionId
    });
  }

}
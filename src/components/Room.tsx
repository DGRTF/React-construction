import React, { Component } from 'react';
import './Room.scss';
import FormHeader from './FormHeader';
import store from '../store/store';


interface IRoomProps {
  roomJSON: {
    id: number;
    name: string;
    floor: number;
  };
}

export default class Room extends Component<IRoomProps> {
  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
  }[];

  private machineInRoomPath = 'Warehouse/GetMachineInRoom?';

  render() {
    return (
      <div className='room'>
        <div className='room__label'>
        </div>
        <FormHeader name={this.props.roomJSON.name} EventGetData={this.GetMachineInRoom.bind(this)}></FormHeader>
      </div >
    );
  }

  private async GetMachineInRoom(formData: FormData): Promise<void> {
    // const response = await fetch(this.machineInRoomPath + '/' + this.props.roomJSON.id, {
    //   method: 'POST',
    //   body: formData
    // });

    // this.machineJSONArr = await response.json();

    // заглушка
    this.machineJSONArr = [
      {
        id: 1,
        name: 'Кладовая',
        createYear: 2,
      },
      {
        id: 2,
        name: 'Офис',
        createYear: 2,
      },
      {
        id: 3,
        name: 'Помещение склада',
        createYear: 2,
      },
    ];
    
    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: this.machineJSONArr
      }
    });

    this.UpdateContent();
    this.UpdateContent();
  }

  private UpdateContent() {
  }

}
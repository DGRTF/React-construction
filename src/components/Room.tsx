import React, { Component } from 'react';
import './Room.scss';
import FormOneSubmit from './FormOneSubmit';
import store from '../store/store';
import Button from './Button/Button';
import AddEditMachine from './AddEditMachine/AddEditMachine';


interface IRoomProps {
  roomJSON: {
    id: number;
    name: string;
    floor: number;
  };
}

interface IRoomState {
  visibleButton: boolean;
}


export default class Room extends Component<IRoomProps, IRoomState> {
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
  }[];

  private machineInRoomPath = 'Warehouse/GetMachinesInRoom?';

  private visibleButtonForm: JSX.Element;

  render() {
    this.visibleButtonForm =
      this.state.visibleButton ? <Button name='+' ClickHandler={this.VisibleButtonForm.bind(this)} /> :
        <AddEditMachine submitText='Добавить оборудование' EventGetData={this.AddMachinesInRoom.bind(this)} />
    return (
      <div className='room'>
        <div className='room__label'></div>
        <FormOneSubmit name={this.props.roomJSON.name} EventGetData={this.GetMachineInRoom.bind(this)}></FormOneSubmit>
        {this.visibleButtonForm}
      </div >
    );
  }

  private async GetMachineInRoom(formData: FormData): Promise<void> {
    formData.append('roomId', `${this.props.roomJSON.id}`);
    const response = await fetch(this.machineInRoomPath, {
      method: 'POST',
      body: formData
    });

    this.machineJSONArr = await response.json();

    // заглушка
    // this.machineJSONArr = [
    //   {
    //     id: 1,
    //     name: 'Кладовая',
    //     createYear: 2,
    //   },
    //   {
    //     id: 2,
    //     name: 'Офис',
    //     createYear: 2,
    //   },
    //   {
    //     id: 3,
    //     name: 'Помещение склада',
    //     createYear: 2,
    //   },
    // ];

    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: this.machineJSONArr
      }
    });
  }

  private async  AddMachinesInRoom(formData: FormData) {
    formData.append('roomId', `${this.props.roomJSON.id}`);
    const response = await fetch('Warehouse/AddMachinesInRoom', {
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
    this.VisibleButtonForm();
  }

  private VisibleButtonForm() {
    this.setState({ visibleButton: !this.state.visibleButton });
  }

}
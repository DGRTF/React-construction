import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';
import storeAddEditMachine from '../../store/store/AddEditMachine/AddEditMachine';
import Button from '../Button/Button';
import store from '../../store/store';
import storeConstructionJSONArr from '../../store/store/ConstructionJSONArr/ConstructionJSONArr';
import storeUpdate from '../../store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';

interface IAddEditMachineState {
  visible: boolean;
  machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  };
}

export default class AddEditMachine extends React.Component<{}, IAddEditMachineState>  {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false,
      machineJSON: storeAddEditMachine.getState().machineJSON
    };
    storeAddEditMachine.subscribe(this.SetMachineJSON.bind(this));
  }

  private constructionPath = 'Warehouse/GetConstructions?';

  private SetMachineJSON() {
    this.setState({
      machineJSON: storeAddEditMachine.getState().machineJSON,
      visible: storeAddEditMachine.getState().visible
    });
    this.path = storeAddEditMachine.getState().path;
    this.headerName = storeAddEditMachine.getState().headerName;
    this.submitName = storeAddEditMachine.getState().submitName;
  }

  private visibleElement: JSX.Element;

  private path: string;

  private headerName: string;

  private submitName: string;

  render() {
    this.visibleElement = this.state.visible ?
      <div className='add-edit-machine'>
        <div className='add-edit-machine__container'>
          <div className='add-edit-machine__header'>
            <span>{this.headerName}</span>
            <div className='add-edit-machine__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-machine__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type="hidden" name='id' value={this.state.machineJSON ? this.state.machineJSON.id : 0} />
            <input type="hidden" name='roomId' value={this.state.machineJSON ? this.state.machineJSON.roomId : 0} />
            <Input text='Введите название' name='name' value={this.state.machineJSON ? this.state.machineJSON.name : ''} />
            <Input text='Введите год изготовления' name='createYear' value={this.state.machineJSON ? `${this.state.machineJSON.createYear}` : ''} />
            <div>
              <div className='add-edit-machine__submit-container'>
                <Submit name={this.submitName} />
              </div>
            </div>
          </form>
        </div>
      </div>
      : null
    return (
      this.visibleElement
    );
  }

  private Close() {
    storeAddEditMachine.dispatch({
      type: 'SET_VISIBLE',
      payload: false
    });

    storeAddEditMachine.dispatch({
      type: 'SET_MACHINE_JSON',
      payload: {
        id: 0,
        name: '',
        createYear: 0,
        roomId: 0
      },
    });
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    console.warn(this.path);
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch(this.path, {
      method: 'POST',
      body: formData
    });
    let JSONArr = await response.json();

    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: JSONArr
      }
    });

    storeAddEditMachine.dispatch({
      type: 'SET_VISIBLE',
      payload: false
    });

    const responseConstruction = await fetch(this.constructionPath, {
      method: 'POST',
    });
    const ConstructionJSONArr = await responseConstruction.json();
    
    storeConstructionJSONArr.dispatch({
      type: 'SET_CONSTRUCTION_JSON',
      payload: ConstructionJSONArr
    });

    storeUpdate.dispatch({
      type: 'SET_UPDATE',
      payload: true
    });
  }

}
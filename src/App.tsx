import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import * as actions from "./store/actions";
import Table from './components/table/Table';
import store from './store/store';
import './App.scss';
import Button from './components/Button/Button';
import storeAddEditMachine from './store/store/AddEditMachine/AddEditMachine';
import storeConstructionJSONArr from './store/store/ConstructionJSONArr/ConstructionJSONArr';
import storeDeleteMachinePath from './store/store/DeleteMachinePath/DeleteMachinePath';
import storeUpdate from './store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';

interface IAppProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];
}

export default class App extends React.Component<IAppProps> {

  constructor(prop: any) {
    super(prop);
  }

  private machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }

  private constructionPath = 'Warehouse/GetConstructions?';

  render() {
    return (
      <div className='app'>
        <Hierarchy />
        <div className='app__table-container'>
          <div className='app__table-edit-delete'>
            <div className='app__edit'>
              <Button name='Редактировать' ClickHandler={this.EditMachine.bind(this)} />
            </div>
            <div className='app__delete'>
              <Button name='Удалить' ClickHandler={this.DeleteMachine.bind(this)} />
            </div>
          </div>
          <Table machineJSONArr={this.props.machineJSONArr} GetMachineJSON={this.SetMachineJSON.bind(this)} />
        </div>
      </div>
    );
  }

  private EditMachine() {
    if (this.machineJSON) {
      storeAddEditMachine.dispatch({
        type: 'SET_VISIBLE',
        payload: true
      });

      storeAddEditMachine.dispatch({
        type: 'SET_MACHINE_JSON',
        payload: this.machineJSON
      });

      storeAddEditMachine.dispatch({
        type: 'SET_PATH',
        payload: storeAddEditMachine.getState().editPath
      });

      storeAddEditMachine.dispatch({
        type: 'SET_HEADER_NAME',
        payload: `Редактировать оборудование`
      });

      storeAddEditMachine.dispatch({
        type: 'SET_SUBMIT_NAME',
        payload: `Готово`
      });
    }
  }

  private async DeleteMachine() {
    if (this.machineJSON) {
      console.warn(storeDeleteMachinePath.getState().deletePath);
      let response = await fetch(storeDeleteMachinePath.getState().deletePath +
        `&id=${this.machineJSON.id}`, {
        method: 'POST',
      });
      let JSONArr = await response.json();
      store.dispatch({
        type: "SET_STATE",
        state: {
          machineJSONArr: JSONArr
        }
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

  private SetMachineJSON(machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) {
    this.machineJSON = machineJSON;
  }

};

store.dispatch({
  type: "SET_STATE",
  state: {
    machineJSONArr: [{ id: 1, name: 'name', createYear: 1980 }]
  }
});

function mapStateToProps(state: any) {
  return {
    machineJSONArr: state.get("machineJSONArr")
  };
}

connect(mapStateToProps, actions)(Hierarchy);
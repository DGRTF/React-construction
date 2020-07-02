import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import store from './store/store';
import './App.scss';
import Button from './components/Button/Button';
import storeAddEditMachine from './store/store/AddEditMachine/AddEditMachine';
import storeUpdate from './store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';
import { getConstructionJSONArr } from "./store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';

interface IAppProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];
  getConstructionJSONArr?: () => (dispatch: any) => Promise<any>;
}

interface ImapDispatchToProps {
  getConstructionJSONArr: () => (dispatch: any) => Promise<any>;
}

class App extends React.Component<IAppProps> {

  constructor(prop: any) {
    super(prop);
  }

  private machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }

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
        type: 'ADD_EDIT_MACHINE_SET_VISIBLE',
        payload: true
      });

      storeAddEditMachine.dispatch({
        type: 'ADD_EDIT_MACHINE_SET_MACHINE_JSON',
        payload: this.machineJSON
      });

      storeAddEditMachine.dispatch({
        type: 'ADD_EDIT_MACHINE_SET_PATH',
        payload: storeAddEditMachine.getState().editPath
      });

      storeAddEditMachine.dispatch({
        type: 'ADD_EDIT_MACHINE_SET_HEADER_NAME',
        payload: `Редактировать оборудование`
      });

      storeAddEditMachine.dispatch({
        type: 'ADD_EDIT_MACHINE_SET_SUBMIT_NAME',
        payload: `Готово`
      });
    }
  }

  private async DeleteMachine() {
    if (this.machineJSON) {
      let response = await fetch(store.getState().deleteMachinePath.deletePath +
        `&machineId=${this.machineJSON.id}`, {
        method: 'POST',
      });

      let JSONArr = await response.json();

      store.dispatch({
        type: "SET_MACHINE_ARR",
        payload: JSONArr
      });

      this.props.getConstructionJSONArr();

      storeUpdate.dispatch({
        type: 'UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE',
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

}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ getConstructionJSONArr: getConstructionJSONArr }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IAppProps, {}>(
  null,
  mapDispatchToProps
)(App);
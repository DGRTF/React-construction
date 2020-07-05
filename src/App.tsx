import React from 'react';
import Hierarchy from './components/Hierarchy';
import { connect } from 'react-redux';
import Table from './components/table/Table';
import { stateType } from './store/store';
import './App.scss';
import Button from './components/Button/Button';
import { bindActionCreators } from 'redux';
import { openEditMachineForm } from './store/actions/actions';
import {
  deleteMachine,
  getMoreMachines
} from './store/actions/Machines/Machines';

interface IAppProps extends ImapDispatchToProps {
  machineJSONArr?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];
}

interface ImapDispatchToProps {
  deleteMachine?: (id: number) => (dispatch: any, getState: () => stateType) => Promise<any>;
  getMoreMachines?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  openEditMachineForm?: (machine: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) => (dispatch: any, getState: () => stateType) => void;
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
          <Button name='Ещё' ClickHandler={this.MoreMachines.bind(this)} />
        </div>
      </div>
    );
  }

  private EditMachine() {
    this.props.openEditMachineForm(this.machineJSON);
  }

  private async DeleteMachine() {
    if (this.machineJSON) {
      this.props.deleteMachine(this.machineJSON.id);
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

  private MoreMachines() {
    this.props.getMoreMachines();
  }

}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    deleteMachine,
    getMoreMachines,
    openEditMachineForm,
  }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IAppProps, {}>(
  null,
  mapDispatchToProps
)(App);
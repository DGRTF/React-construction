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

  private machine: {
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
          <Table GetMachine={this.SetMachine.bind(this)} />
          <Button name='Ещё' ClickHandler={this.MoreMachines.bind(this)} />
        </div>
      </div>
    );
  }

  private EditMachine() {
    if (this.machine)
      this.props.openEditMachineForm(this.machine);
  }

  private DeleteMachine() {
    if (this.machine) {
      const isDeleteMachine = window.confirm(`Вы действительно хотите удалить комнату "${this.machine.name}" ?`);
      if (isDeleteMachine)
        this.props.deleteMachine(this.machine.id);
    }
  }

  private SetMachine(machine: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) {
    this.machine = machine;
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
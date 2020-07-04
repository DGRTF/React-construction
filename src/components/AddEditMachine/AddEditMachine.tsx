import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';
import Button from '../Button/Button';
import {  setVisible,  setMachineJSON } from "../../store/actions/AddEditMachine/AddEditMachine";
import { addEditMachine } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../../store/store';



interface ImapStateToProps {
  visible?: boolean;
  machineJSON?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  };
  headerName?: string;
  submitName?: string;
}

interface ImapDispatchToProps {
  setVisible?: (visible: boolean) => {
    type: "ADD_EDIT_MACHINE_SET_VISIBLE";
    payload: boolean;
  }
  addEditMachine?: (formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
  setMachineJSON?: (machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) => {
    type: "ADD_EDIT_MACHINE_SET_MACHINE_JSON";
    payload: {
      id: number;
      name: string;
      createYear: number;
      roomId: number;
    };
  }
}

interface IAddEditMachineProps extends ImapStateToProps, ImapDispatchToProps {

}

class AddEditMachine extends React.Component<IAddEditMachineProps>  {
  constructor(prop: any) {
    super(prop);
  }

  private visibleElement: JSX.Element;

  render() {
    this.visibleElement = this.props.visible ?
      <div className='add-edit-machine'>
        <div className='add-edit-machine__container'>
          <div className='add-edit-machine__header'>
            <span>{this.props.headerName}</span>
            <div className='add-edit-machine__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-machine__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type="hidden" name='machineId' value={this.props.machineJSON ? this.props.machineJSON.id : 0} />
            <input type="hidden" name='roomId' value={this.props.machineJSON ? this.props.machineJSON.roomId : 0} />
            <Input text='Введите название' name='name' value={this.props.machineJSON ? this.props.machineJSON.name : ''} />
            <Input text='Введите год изготовления' name='createYear' value={this.props.machineJSON ? `${this.props.machineJSON.createYear}` : ''} />
            <div>
              <div className='add-edit-machine__submit-container'>
                <Submit name={this.props.submitName} />
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
    this.props.setVisible(false);
    this.props.setMachineJSON(null);
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.addEditMachine(formData);
    this.props.setVisible(false);
  }

}

function mapStateToProps(state: stateType) {
  return {
    visible: state.addEditMachine.visible,
    machineJSON: state.addEditMachine.machineJSON,
    headerName: state.addEditMachine.headerName,
    submitName: state.addEditMachine.submitName,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setVisible,
    addEditMachine,
    setMachineJSON,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddEditMachineProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddEditMachine);
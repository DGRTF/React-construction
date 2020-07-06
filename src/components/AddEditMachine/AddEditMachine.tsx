import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';
import Button from '../Button/Button';
import { closeAddEditMachineForm } from '../../store/actions/actions';
import { addEditMachine } from '../../store/actions/Machines/Machines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../../store/store';



interface ImapStateToProps {
  visible?: boolean;
  machine?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  };
  headerName?: string;
  submitName?: string;
}

interface ImapDispatchToProps {
  addEditMachine?: (formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
  closeAddEditMachineForm?: () => (dispatch: any, getState: () => stateType) => void;
}

interface IAddEditMachineProps extends ImapStateToProps, ImapDispatchToProps { }

class AddEditMachine extends React.Component<IAddEditMachineProps>  {
  constructor(prop: any) {
    super(prop);
  }

  render() {
    return (
      <div className='add-edit-machine' style={this.props.visible ? { display: 'flex' } : { display: 'none' }}>
        <div className='add-edit-machine__container'>
          <div className='add-edit-machine__header'>
            <span>{this.props.headerName}</span>
            <div className='add-edit-machine__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-machine__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type="hidden" name='machineId' value={this.props.machine ? this.props.machine.id : 0} />
            <input type="hidden" name='roomId' value={this.props.machine ? this.props.machine.roomId : 0} />
            <Input text='Введите название' name='name' value={this.props.machine ? this.props.machine.name : ''} />
            <Input text='Введите год изготовления' type='number' name='createYear' value={this.props.machine ? `${this.props.machine.createYear}` : ''} />
            <div>
              <div className='add-edit-machine__submit-container'>
                <Submit name={this.props.submitName} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }


  private Close() {
    this.props.closeAddEditMachineForm();
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.addEditMachine(formData);
  }

}

function mapStateToProps(state: stateType) {
  return {
    visible: state.addEditMachine.visible,
    machine: state.addEditMachine.machineJSON,
    headerName: state.addEditMachine.headerName,
    submitName: state.addEditMachine.submitName,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addEditMachine,
    closeAddEditMachineForm,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddEditMachineProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddEditMachine);
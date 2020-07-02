import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';
import storeAddEditMachine from '../../store/store/AddEditMachine/AddEditMachine';
import Button from '../Button/Button';
import store from '../../store/store';
import storeUpdate from '../../store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';
import { getConstructionJSONArr } from "../../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface IAddEditMachineState {
  visible: boolean;
  machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  };
}

interface IAddEditMachineProps {
  getConstructionJSONArr?: () => (dispatch: any) => Promise<any>;
}

class AddEditMachine extends React.Component<IAddEditMachineProps, IAddEditMachineState>  {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false,
      machineJSON: storeAddEditMachine.getState().machineJSON
    };
    storeAddEditMachine.subscribe(this.SetMachineJSON.bind(this));
  }

  private constructionPath = 'Constructions/GetConstructions?';

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
            <input type="hidden" name='machineId' value={this.state.machineJSON ? this.state.machineJSON.id : 0} />
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
      type: 'ADD_EDIT_MACHINE_SET_VISIBLE',
      payload: false
    });

    storeAddEditMachine.dispatch({
      type: 'ADD_EDIT_MACHINE_SET_MACHINE_JSON',
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

    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch(this.path, {
      method: 'POST',
      body: formData
    });
    let JSONArr = await response.json();

    store.dispatch({
      type: "SET_MACHINE_ARR",
      payload: JSONArr
    });

    storeAddEditMachine.dispatch({
      type: 'ADD_EDIT_MACHINE_SET_VISIBLE',
      payload: false
    });

    this.props.getConstructionJSONArr();

    storeUpdate.dispatch({
      type: 'UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE',
      payload: true
    });
  }

}

interface ImapDispatchToProps {
  getConstructionJSONArr: () => (dispatch: any) => Promise<any>;
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ getConstructionJSONArr: getConstructionJSONArr }, dispatch)
}

export default connect<{}, ImapDispatchToProps, IAddEditMachineProps, {}>(
  null,
  mapDispatchToProps
)(AddEditMachine);
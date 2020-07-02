import React from 'react';
import './AddEditMachine.scss';
import Input from '../Input/Input';
import Submit from '../Submit';
import storeAddEditMachine from '../../store/store/AddEditMachine/AddEditMachine';
import Button from '../Button/Button';
import store from '../../store/store';
import storeUpdate from '../../store/store/UpdateRoomInConstruction/UpdateRoomInConstruction';
import { getConstructionJSONArr } from "../../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { setHeaderName, setSubmitName, setVisible, setAddPathInRoom, setMachineJSON } from "../../store/actions/AddEditMachine/AddEditMachine";
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
  getConstructionJSONArr?: () => (dispatch: any) => Promise<any>;
  // setHeaderName: (headerName: string) => {
  //   type: "ADD_EDIT_MACHINE_SET_HEADER_NAME";
  //   payload: string;
  // }
  // setSubmitName: (submitName: string) => {
  //   type: "ADD_EDIT_MACHINE_SET_SUBMIT_NAME";
  //   payload: string;
  // }
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
    // this.state = {
    //   visible: false,
    //   machineJSON: storeAddEditMachine.getState().machineJSON
    // };
    // storeAddEditMachine.subscribe(this.SetMachineJSON.bind(this));
  }

  // private SetMachineJSON() {
  //   this.setState({
  //     machineJSON: storeAddEditMachine.getState().machineJSON,
  //     visible: storeAddEditMachine.getState().visible
  //   });
  //   this.path = storeAddEditMachine.getState().path;
  //   this.headerName = storeAddEditMachine.getState().headerName;
  //   this.submitName = storeAddEditMachine.getState().submitName;
  // }

  private visibleElement: JSX.Element;

  // private path: string;

  // private headerName: string;

  // private submitName: string;

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
    // storeAddEditMachine.dispatch({
    //   type: 'ADD_EDIT_MACHINE_SET_VISIBLE',
    //   payload: false
    // });
    this.props.setVisible(false);

    // storeAddEditMachine.dispatch({
    //   type: 'ADD_EDIT_MACHINE_SET_MACHINE_JSON',
    //   payload: {
    //     id: 0,
    //     name: '',
    //     createYear: 0,
    //     roomId: 0
    //   },
    // });
    this.props.setMachineJSON(null);
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget as HTMLFormElement);

    this.props.addEditMachine(formData);
    this.props.setVisible(false);

    this.props.getConstructionJSONArr();

    storeUpdate.dispatch({
      type: 'UPDATE_ROOM_IN_CONSTRUCTION_SET_UPDATE',
      payload: true
    });
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
    getConstructionJSONArr: getConstructionJSONArr,
    setVisible: setVisible,
    addEditMachine: addEditMachine,
    setMachineJSON: setMachineJSON,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddEditMachineProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddEditMachine);
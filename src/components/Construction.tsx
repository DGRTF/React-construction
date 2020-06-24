import React, { Component } from 'react';
import './Construction.scss';
import FormOneSubmit from './FormOneSubmit';
import Room from './Room';
import Submit from './Submit';
import store from '../store/store';
import Button from './Button/Button';
import storeVisibleAddRoom from '../store/store/AddEditRoom/AddRoomVisible';
import storeCallbackAddRoom from '../store/store/AddEditRoom/CallbackAddRoom';
import storeConstructionId from '../store/store/AddEditRoom/ConstructionId';
import storeRoomJSON from '../store/store/AddEditRoom/RoomJSON';
import storeAddEditMachine from '../store/store/AddEditMachine/MachineJSON';
import storeRoomJSONArr from '../store/store/RoomJSONArr/RoomJSONArr';
import storeDeleteMachinePath from '../store/store/DeleteMachinePath/DeleteMachinePath';
import Indicate from './Indicate/Indicate';


interface IConstructionProps {
  constructionJSON: {
    id: number;
    name: string;
    address: string;
  };
}

interface IConstructionState {
  showContent: boolean;
  visibleButton: boolean;
  roomJSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }[];
}

export default class Construction extends Component<IConstructionProps, IConstructionState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visibleButton: true,
      roomJSONArr: [],
      showContent: false,
    }

    storeRoomJSONArr.subscribe(() => {
      this.setState({
        roomJSONArr: storeRoomJSONArr.getState().roomJSONArr
      })
    })
  }

  private roomInConstructorPath = 'Warehouse/GetRoomsInConstruction?';

  private editMachineInConstructionPath = `Warehouse/EditMachinesInConstruction?constructionId=${this.props.constructionJSON.id}`;

  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[];

  render() {
    return (
      <div className='construction'>
        <div className='construction__head'>
          <div className='construction__label'>
            <form onSubmit={this.GetRoomsInConstruction.bind(this)}>
              <Submit name='V' />
            </form>
          </div>
          <div className='construction__header'>
            <div className='construction__add-room'>
              <Button name='+' ClickHandler={this.VisibleButtonForm.bind(this)} />
            </div>
            <FormOneSubmit name={this.props.constructionJSON.name}
              EventGetData={this.GetMachineInConstruction.bind(this)}></FormOneSubmit>
          </div>
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          <div className='construction__list'>
            {this.state.roomJSONArr.map((roomJSON, item) =>
              <div className='construction__content-item'>
                <div className='construction__edit-room'>
                  <Button dataSetRoom={`${item}`} name='/' ClickHandler={this.EditRoom.bind(this)}></Button>
                </div>
                <div className='construction__delete-room'>
                  <form onSubmit={this.DeleteRoomInConstruction.bind(this)}>
                    <input type="hidden" value={`${roomJSON.id}`} name='roomId' />
                    <input type="hidden" value={`${this.props.constructionJSON.id}`} name='constructionId' />
                    <Submit name='X' />
                  </form>
                </div>
                <Indicate indicate={roomJSON.haveMachine} />
                <Room roomJSON={roomJSON}></Room>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  private EditRoom(ev: React.MouseEvent) {
    const item = (ev.currentTarget as HTMLElement).dataset.roomItem;
    console.warn(item);
    storeRoomJSON.dispatch({
      type: 'SET_ROOMJSON',
      roomJSON: this.state.roomJSONArr[Number(item)]
    });

    storeConstructionId.dispatch({
      type: 'SET_CONSTRUCTIONID',
      constructionId: this.props.constructionJSON.id
    });

    storeCallbackAddRoom.dispatch({
      type: 'SET_CALLBACK',
      UpdateCallback: this.SetRoomJSONArr.bind(this)
    });

    storeVisibleAddRoom.dispatch({
      type: 'SET_VISIBLE',
      visible: true
    });
  }

  private async GetRoomsInConstruction(ev: React.FormEvent): Promise<void> {
    ev.preventDefault();
    if (!this.state.showContent) {
      let formData = new FormData(ev.currentTarget as HTMLFormElement);
      const response = await fetch(this.roomInConstructorPath + `constructionId=${this.props.constructionJSON.id}`, {
        method: 'POST',
        body: formData
      });

      let JSONArr = await response.json();
      this.setState({ roomJSONArr: JSONArr });
    }
    this.setState({ showContent: !this.state.showContent });
  }

  private async GetMachineInConstruction(formData: FormData): Promise<void> {
    const response = await fetch('Warehouse/GetMachinesInConstruction?constructionId=' + this.props.constructionJSON.id, {
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

    storeAddEditMachine.dispatch({
      type: 'SET_EDIT_PATH',
      payload: this.editMachineInConstructionPath
    });

    storeDeleteMachinePath.dispatch({
      type: 'SET_DELETE_PATH',
      payload: `Warehouse/DeleteMachineInConstruction?constructionId=${this.props.constructionJSON.id}`
    });
  }

  private VisibleButtonForm() {
    storeConstructionId.dispatch({
      type: 'SET_CONSTRUCTIONID',
      constructionId: this.props.constructionJSON.id
    });

    storeCallbackAddRoom.dispatch({
      type: 'SET_CALLBACK',
      UpdateCallback: this.SetRoomJSONArr.bind(this)
    });

    storeVisibleAddRoom.dispatch({
      type: 'SET_VISIBLE',
      visible: true
    });
  }

  private SetRoomJSONArr(JSONArr: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean;
  }[]) {
    this.setState({ roomJSONArr: JSONArr });
  }

  private async DeleteRoomInConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch('Warehouse/DeleteRoomInConstruction', {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.setState({ roomJSONArr: JSONArr });
  }

}
import React from 'react';
import './AddEditRoom.scss';
import storeVisibleAddRoom from '../../store/store/AddEditRoom/AddRoomVisible';
import storeCallbackAddRoom from '../../store/store/AddEditRoom/CallbackAddRoom';
import Submit from '../Submit';
import Input from '../Input/Input';
import storeConstructionId from '../../store/store/AddEditRoom/ConstructionId';
import storeRoomJSON from '../../store/store/AddEditRoom/RoomJSON';
import Button from '../Button/Button';

interface IAddEditRoomState {
  visible: boolean;
  id: number;
  roomJSON: {
    id: number;
    name: string;
    floor: number;
  };
}

export default class AddEditRoom extends React.Component<{}, IAddEditRoomState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false,
      id: storeConstructionId.getState(),
      roomJSON: storeRoomJSON.getState()
    };

    storeVisibleAddRoom.subscribe(this.SetVisible.bind(this));
    storeCallbackAddRoom.subscribe(this.SetUpdateCallback);
    storeRoomJSON.subscribe(this.SetRoomJSON.bind(this));
    storeConstructionId.subscribe(this.SetStateIdJSON.bind(this));
  }

  private SetRoomJSON() {
    this.setState({
      roomJSON: storeRoomJSON.getState()
    });
  }

  private SetStateIdJSON() {
    this.setState({
      id: storeConstructionId.getState()
    });
  }

  private UpdateCallback: (constructionJSONArr: {
    id: number;
    name: string;
    address: string;
  }[]) => void;

  private visibleElement: JSX.Element;

  render() {
    this.visibleElement = this.state.visible ?
      <div className='add-edit-room'>
        <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
        <form onSubmit={this.AddEditConstruction.bind(this)}>
          <input type="hidden" name='roomId' value={this.state.roomJSON ? this.state.roomJSON.id : 0} />
          <input type="hidden" name='constructionId' value={this.state.id} />
          <Input text='Введите название' name='name' value={this.state.roomJSON ? this.state.roomJSON.name : ''}></Input>
          <Input text='Введите этаж' name='floor' value={this.state.roomJSON ? `${this.state.roomJSON.floor}` : ''}></Input>
          <Submit name='Добавить комнату' />
        </form>
      </div>
      : null
    return (
      this.visibleElement
    );
  }

  private SetUpdateCallback = () => {
    this.UpdateCallback = storeCallbackAddRoom.getState();
  }

  private SetVisible() {
    this.setState({
      visible: storeVisibleAddRoom.getState()
    });
  }

  private Close() {
    storeVisibleAddRoom.dispatch({
      type: 'SET_VISIBLE',
      visible: false
    });

    storeRoomJSON.dispatch({
      type: 'SET_ROOMJSON',
      roomJSON: null
    });
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData: FormData;
    let response;
    if (!this.state.roomJSON) {
      formData = new FormData(ev.currentTarget as HTMLFormElement);
      response = await fetch('Warehouse/AddRoomInConstruction', {
        method: 'POST',
        body: formData
      });
    } else {
      formData = new FormData(ev.currentTarget as HTMLFormElement);
      response = await fetch('Warehouse/EditRoomInConstruction', {
        method: 'POST',
        body: formData
      });
    }

    storeRoomJSON.dispatch({
      type: 'SET_ROOMJSON',
      roomJSON: null
    });

    let JSONArr = await response.json();
    console.warn(JSONArr);
    this.UpdateCallback(JSONArr);
    storeVisibleAddRoom.dispatch({
      type: 'SET_VISIBLE',
      visible: false
    });
  }

}
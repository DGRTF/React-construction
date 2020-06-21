import React, { Component } from 'react';
import './Construction.scss';
import FormOneSubmit from './FormOneSubmit';
import Room from './Room';
import Submit from './Submit';
import store from '../store/store';
import Button from './Button/Button';
import storeVisibleAddRoom from '../store/store/AddRoomVisible';
import storeCallbackAddRoom from './../store/store/CallbackAddRoom';
import storeConstructionId from '../store/store/ConstructionId';
import storeRoomJSON from '../store/store/RoomJSON';


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
  }

  private roomInConstructorPath = 'Warehouse/GetRoomsInConstruction?';

  private machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
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
            <FormOneSubmit name={this.props.constructionJSON.name}
              EventGetData={this.GetMachineInConstruction.bind(this)}></FormOneSubmit>
          </div>
        </div>
        <div className={'construction__content ' + (this.state.showContent ? '' : 'construction__content-hide')}>
          <Button name='Добавить комнату' ClickHandler={this.VisibleButtonForm.bind(this)} />
          <div className='construction__list'>
            {this.state.roomJSONArr.map((roomJSON, item) =>
              <div className='construction__content-item'>
                <Room roomJSON={roomJSON}></Room>
                <button data-room-item={`${item}`} onClick={this.EditRoom.bind(this)}>/</button>
                <form onSubmit={this.DeleteRoomInConstruction.bind(this)}>
                  <input type="hidden" value={`${roomJSON.id}`} name='roomId' />
                  <input type="hidden" value={`${this.props.constructionJSON.id}`} name='constructionId' />
                  <Submit name='X' />
                </form>
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
    // const response = await fetch(this.machineInConstructorPath + '/' + this.props.constructorJSON.id, {
    //   method: 'POST',
    //   body: formData
    // });

    // this.machineJSONArr = await response.json();

    // заглушка
    this.machineJSONArr = [
      {
        id: 1,
        name: 'Кладовая',
        createYear: 2,
      },
      {
        id: 2,
        name: 'Офис',
        createYear: 2,
      },
      {
        id: 3,
        name: 'Помещение склада',
        createYear: 2,
      },
    ];

    store.dispatch({
      type: "SET_STATE",
      state: {
        machineJSONArr: this.machineJSONArr
      }
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
  }[]) {
    console.warn('callback');
    console.warn(JSONArr);
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
import React from 'react';
import './AddEditConstruction.scss';
import store from '../../store/store/AddEditConstruction/AddConstructionCallBack';
import storeVisible from '../../store/store/AddEditConstruction/AddConstructionVisible';
import storeConstructionJSON from '../../store/store/AddEditConstruction/ConstructionJSON';
import Button from '../Button/Button';
import Submit from '../Submit';
import Input from '../Input/Input';
import storeConstructionJSONArr from '../../store/store/ConstructionJSONArr/ConstructionJSONArr';

interface IAddConstructionState {
  visible: boolean;
  // UpdateCallback: (constructionJSONArr: {
  //   id: number;
  //   name: string;
  //   address: string;
  // }[]) => void;
  constructionJSON: {
    id: number;
    name: string;
    address: string;
  };
}

export default class AddConstruction extends React.Component<{}, IAddConstructionState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false,
      // UpdateCallback: store.getState(),
      constructionJSON: storeConstructionJSON.getState()
    };

    storeConstructionJSON.subscribe(this.SetConstructionJSON.bind(this));
    storeVisible.subscribe(this.SetVisible.bind(this));
    // store.subscribe(this.SetUpdateCallback);
  }

  private visibleElement: JSX.Element;

  render() {
    this.visibleElement = this.state.visible ?
      <div className='add-edit-construction'>
        <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
        <form onSubmit={this.AddEditConstruction.bind(this)}>
          <input type='hidden' name='constructionId' value={this.state.constructionJSON ? `${this.state.constructionJSON.id}` : ''}></input>
          <Input text='Введите название' name='name' value={this.state.constructionJSON ? this.state.constructionJSON.name : ''}></Input>
          <Input text='Введите адрес' name='address' value={this.state.constructionJSON ? this.state.constructionJSON.address : ''}></Input>
          <Submit name='Добавить здание' />
        </form>
      </div>
      : null
    return (
      this.visibleElement
    );
  }

  private Close() {
    storeVisible.dispatch({
      type: 'SET_VISIBLE',
      visible: false
    });

    storeConstructionJSON.dispatch({
      type: 'SET_CONSTRUCTIONJSON',
      constructionJSON: null
    });
  }

  // private SetUpdateCallback = () => {
  //   this.setState({
  //     UpdateCallback: store.getState()
  //   });
  // }

  private SetVisible() {
    this.setState({
      visible: storeVisible.getState()
    });
  }

  private SetConstructionJSON(){
    this.setState({
      constructionJSON: storeConstructionJSON.getState()
    });
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData: FormData;
    let response;
    if (!this.state.constructionJSON) {
      formData = new FormData(ev.currentTarget as HTMLFormElement);
      response = await fetch('Warehouse/AddConstruction', {
        method: 'POST',
        body: formData
      });
    } else {
      formData = new FormData(ev.currentTarget as HTMLFormElement);
      response = await fetch('Warehouse/EditConstruction', {
        method: 'POST',
        body: formData
      });
    }

    storeConstructionJSON.dispatch({
      type:'SET_CONSTRUCTIONJSON',
      constructionJSON: null
    })

    let JSONArr = await response.json();

    storeConstructionJSONArr.dispatch({
      type:'SET_CONSTRUCTION_JSON',
      payload: JSONArr
    });

    // this.state.UpdateCallback(JSONArr);
    storeVisible.dispatch({
      type: 'SET_VISIBLE',
      visible: false
    });
  }

}
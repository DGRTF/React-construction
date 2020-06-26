import React from 'react';
import './AddEditConstruction.scss';
import storeAddEditConstruction from '../../store/store/AddEditConstruction/AddEditConstruction';
import storeConstructionJSONArr from '../../store/store/ConstructionJSONArr/ConstructionJSONArr';
import Button from '../Button/Button';
import Submit from '../Submit';
import Input from '../Input/Input';

interface IAddConstructionState {
  visible: boolean;
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
      constructionJSON: storeAddEditConstruction.getState().constructionJSON
    };

    storeAddEditConstruction.subscribe(this.SetConstructionJSON.bind(this));
    // storeAddEditConstruction.subscribe(this.SetVisible.bind(this));
  }

  private visibleElement: JSX.Element;

  private path: string;

  private headerName: string;

  private submitName: string;

  render() {
    this.visibleElement = this.state.visible ?
      <div className='add-edit-construction'>
        <div className='add-edit-construction__container'>
          <div className='add-edit-construction__header'>
            <span>{this.headerName}</span>
            <div className='add-edit-construction__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-construction__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type='hidden' name='constructionId' value={this.state.constructionJSON ? `${this.state.constructionJSON.id}` : ''}></input>
            <Input text='Введите название' name='name' value={this.state.constructionJSON ? this.state.constructionJSON.name : ''}></Input>
            <Input text='Введите адрес' name='address' value={this.state.constructionJSON ? this.state.constructionJSON.address : ''}></Input>
            <div>
              <div className='add-edit-construction__submit-container'>
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
    storeAddEditConstruction.dispatch({
      type: 'SET_VISIBLE',
      payload: false
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_CONSTRUCTION_JSON',
      payload: null
    });
  }

  // private SetVisible() {
  // }

  private SetConstructionJSON() {
    this.setState({
      constructionJSON: storeAddEditConstruction.getState().constructionJSON
    });
    this.setState({
      visible: storeAddEditConstruction.getState().visible
    });
    this.path = storeAddEditConstruction.getState().path;
    this.headerName = storeAddEditConstruction.getState().headerName;
    this.submitName = storeAddEditConstruction.getState().submitName;
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch(this.path, {
      method: 'POST',
      body: formData
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_CONSTRUCTION_JSON',
      payload: null
    })

    let JSONArr = await response.json();

    storeConstructionJSONArr.dispatch({
      type: 'SET_CONSTRUCTION_JSON',
      payload: JSONArr
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_VISIBLE',
      payload: false
    });
  }

}
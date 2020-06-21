import React from 'react';
import './AddConstruction.scss';
import AddEditConstruction from '../AddEditConstruction/AddEditConstruction';
import store from './../../store/store/AddConstructionCallBack';
import storeVisible from './../../store/store/AddConstructionVisible';

interface IAddConstructionState {
  visible: boolean;
}

export default class AddConstruction extends React.Component<{}, IAddConstructionState> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      visible: false
    };

    storeVisible.subscribe(this.SetVisible.bind(this));
    store.subscribe(this.SetUpdateCallback);
  }

  private UpdateCallback: (constructionJSONArr: {
    id: number;
    name: string;
    address: string;
  }[]) => void;

  private visibleElement: JSX.Element;

  render() {
    this.visibleElement = this.state.visible ?
      <AddEditConstruction EventGetData={this.AddConstruction.bind(this)}></AddEditConstruction> : null
    return (
      this.visibleElement
    );
  }

  private SetUpdateCallback = () => {
    this.UpdateCallback = store.getState();
  }

  private SetVisible() {
    this.setState({
      visible: storeVisible.getState()
    });
  }

  private async AddConstruction(formData: FormData) {
    const response = await fetch('Warehouse/AddConstruction', {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.UpdateCallback(JSONArr);
    storeVisible.dispatch({
      type:'SET_VISIBLE',
      visible: false
    });
  }

}
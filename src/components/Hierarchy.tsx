import React from 'react';
import './Hierarchy.scss';
import Construction from './Construction';
import Button from './Button/Button';
import Submit from './Submit';
import storeAddEditConstruction from '../store/store/AddEditConstruction/AddEditConstruction';
import storeConstructionJSONArr from '../store/store/ConstructionJSONArr/ConstructionJSONArr';
import Indicate from './Indicate/Indicate';

interface IHierarchyState {
  visibleButton: boolean;
  constructionJSONArr: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  }[];
}

export default class Hierarchy extends React.Component<{}, IHierarchyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visibleButton: true,
      constructionJSONArr: []
    }
    this.Init();
    storeConstructionJSONArr.subscribe(() => {
      this.setState({
        constructionJSONArr: storeConstructionJSONArr.getState().constructionJSONArr
      });
    });
  }

  private constructionPath = 'Warehouse/GetConstructions?';

  render() {
    return (
      <div className="hierarchy" style={{ width: '150px', minWidth: '150px' }}>
        <div className="hierarchy__content">
          <Button name='Добавить здание' ClickHandler={this.AddConstruction.bind(this)} />
          {this.state.constructionJSONArr && this.state.constructionJSONArr.map((constructionJSON, item) =>
            <div className='hierarchy__content-item'>
              <div className='hierarchy__edit-construction'>
                <Button dataSetConstruction={`${item}`} name='/' ClickHandler={this.EditConstruction.bind(this)}>/</Button>
              </div>
              <div className='hierarchy__delete-construction'>
                <form onSubmit={this.DeleteConstruction.bind(this)}>
                  <input type="hidden" value={`${constructionJSON.id}`} name='id' />
                  <Submit name='X' />
                </form>
              </div>
              <Indicate indicate={constructionJSON.haveMachine} />
              <Construction constructionJSON={constructionJSON} />
            </div>
          )
          }
        </div>
        <div className="hierarchy__border-move" style={{ left: '148px' }}
          onMouseDown={this.AddEventMouseMove.bind(this)}
          onTouchStart={this.AddEventTouchMove.bind(this)}>
          <div className="hierarchy__border-move-handle"></div>
        </div>
      </div >
    );
  }

  private EditConstruction(ev: React.MouseEvent) {
    const item = (ev.currentTarget as HTMLElement).dataset.constructionItem;
    
    storeAddEditConstruction.dispatch({
      type: 'SET_CONSTRUCTION_JSON',
      payload: this.state.constructionJSONArr[Number(item)]
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_CALL_BACK',
      payload: this.SetConstructionJSONArr.bind(this)
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_VISIBLE',
      payload: true
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_PATH',
      payload: 'Warehouse/EditConstruction'
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_HEADER_NAME',
      payload: 'Редактировать здание'
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_SUBMIT_NAME',
      payload: 'Изменить'
    });
  }

  private Init() {
    this.GetConstructions();
  }

  private AddConstruction() {
    storeAddEditConstruction.dispatch({
      type: 'SET_CALL_BACK',
      payload: this.SetConstructionJSONArr.bind(this)
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_VISIBLE',
      payload: true
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_PATH',
      payload: 'Warehouse/AddConstruction'
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_HEADER_NAME',
      payload: 'Добавить здание'
    });

    storeAddEditConstruction.dispatch({
      type: 'SET_SUBMIT_NAME',
      payload: 'Добавить'
    });
  }

  private SetConstructionJSONArr(JSONArr: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  }[]) {
    this.setState({ constructionJSONArr: JSONArr });

  }

  private async GetConstructions() {
    const response = await fetch(this.constructionPath, {
      method: 'POST',
    });
    let JSONArr = await response.json();
    this.setState({ constructionJSONArr: JSONArr });
  }

  private async DeleteConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    let formData = new FormData(ev.currentTarget as HTMLFormElement);
    const response = await fetch('Warehouse/DeleteConstruction', {
      method: 'POST',
      body: formData
    });

    let JSONArr = await response.json();
    this.setState({ constructionJSONArr: JSONArr });
  }

  private mouseX: number;

  private handleX: number;

  private currentMargin: number;

  private border: HTMLElement;

  private MouseUpListener() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private TouchCancelListener() {
    document.removeEventListener('touchmove', this.moveTouch);
    document.removeEventListener('touchend', this.TouchCancelListener.bind(this));
  }

  private AddEventMouseMove(event: React.MouseEvent) {
    this.border = event.currentTarget as HTMLElement;
    this.mouseX = event.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.MouseUpListener.bind(this));
    this.handleX = this.border.getBoundingClientRect().left;
  }

  private MouseMoveHandler(event: MouseEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.clientX;
    this.currentMargin -= this.border.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private MoveHandle() {
    if (this.currentMargin > 100) {
      this.border.style.left = `${this.currentMargin}px`;
      this.currentMargin += this.border.offsetWidth / 2;
      this.border.parentElement.style.minWidth = `${this.currentMargin}px`;
      this.border.parentElement.style.width = `${this.currentMargin}px`;
    }
  }

  private AddEventTouchMove(event: React.TouchEvent) {
    this.border = event.currentTarget as HTMLElement;
    this.mouseX = event.targetTouches[0].pageX;
    document.addEventListener("touchmove", this.moveTouch);
    document.addEventListener('touchend', this.TouchCancelListener.bind(this));
    this.handleX = this.border.getBoundingClientRect().left;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.targetTouches[0].pageX;
    this.currentMargin -= this.border.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private mouseMoveHandler = this.MouseMoveHandler.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);
}
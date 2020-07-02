import React from 'react';
import './Hierarchy.scss';
import Construction from './Construction';
import Button from './Button/Button';
import Submit from './Submit';
import { connect } from 'react-redux';
import { stateType } from '../store/store';
import Indicate from './Indicate/Indicate';
import {
  getConstructionJSONArr,
  deleteConstruction,
} from "../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import {
  setAddPathInPath,
  setEditPathInPath,
  setConstructionJSON,
  setVisible,
  setHeaderName,
  setSubmitName
} from '../store/actions/AddEditConstruction/AddEditConstruction';



interface IHierarchyProps extends ImapStateToProps, ImapDispatchToProps {
}

interface ImapStateToProps {
  constructionJSONArr?: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  }[];
}

interface ImapDispatchToProps {
  getConstructionJSONArr?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  setAddPathInPath?: () => {
    type: 'ADD_EDIT_CONSTRUCTION_SET_PATH',
    payload: string
  };
  setEditPathInPath?: () => {
    type: 'ADD_EDIT_CONSTRUCTION_SET_PATH',
    payload: string
  };
  setVisible?: (visible: boolean) => {
    type: "ADD_EDIT_CONSTRUCTION_SET_VISIBLE";
    payload: boolean;
  }
  setConstructionJSON?: (constructionJSON: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  }) => {
    type: "ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_JSON";
    payload: {
      id: number;
      name: string;
      address: string;
      haveMachine: boolean;
    };
  };
  setHeaderName?: (headerName: string) => {
    type: "ADD_EDIT_CONSTRUCTION_SET_HEADER_NAME";
    payload: string;
  };
  setSubmitName?: (submitName: string) => {
    type: "ADD_EDIT_CONSTRUCTION_SET_SUBMIT_NAME";
    payload: string;
  };
  deleteConstruction?: (formData: FormData) => (dispatch: any) => Promise<any>;
}

class Hierarchy extends React.Component<IHierarchyProps> {
  constructor(props: any) {
    super(props);
    this.Init();
  }

  render() {
    return (
      <div className="hierarchy" style={{ width: '150px', minWidth: '150px' }}>
        <div className="hierarchy__content">
          <Button name='Добавить здание' ClickHandler={this.AddConstruction.bind(this)} />
          {this.props.constructionJSONArr && this.props.constructionJSONArr.map((constructionJSON, item) =>
            <div className='hierarchy__content-item'>
              <div className='hierarchy__edit-construction'>
                <Button dataSetConstruction={`${item}`} name='/' ClickHandler={this.EditConstruction.bind(this)}>/</Button>
              </div>
              <div className='hierarchy__delete-construction'>
                <form onSubmit={this.DeleteConstruction.bind(this)}>
                  <input type="hidden" value={`${constructionJSON.id}`} name='constructionId' />
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
    this.props.setConstructionJSON(this.props.constructionJSONArr[Number(item)])
    this.props.setVisible(true);
    this.props.setEditPathInPath();
    this.props.setHeaderName(`Редактировать здание "${this.props.constructionJSONArr[Number(item)].name}"`);
    this.props.setSubmitName('Изменить');
  }

  private Init() {
    this.GetConstructions();
  }

  private AddConstruction() {
    this.props.setVisible(true);
    this.props.setAddPathInPath();
    this.props.setHeaderName('Добавить здание');
    this.props.setSubmitName('Добавить');
  }

  private async GetConstructions() {
    this.props.getConstructionJSONArr();
  }

  private async DeleteConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.deleteConstruction(formData);
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



function mapStateToProps(state: stateType) {
  return {
    constructionJSONArr: state.constructionJSONArr.constructionJSONArr
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    getConstructionJSONArr: getConstructionJSONArr,
    setAddPathInPath: setAddPathInPath,
    setEditPathInPath: setEditPathInPath,
    setConstructionJSON: setConstructionJSON,
    setVisible: setVisible,
    setHeaderName: setHeaderName,
    setSubmitName: setSubmitName,
    deleteConstruction:deleteConstruction,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IHierarchyProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(Hierarchy);
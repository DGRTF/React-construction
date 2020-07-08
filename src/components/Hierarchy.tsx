import React from 'react';
import './Hierarchy.scss';
import Construction from './Construction';
import Button from './Button/Button';
import { connect } from 'react-redux';
import { stateType } from '../store/store';
import {
  getConstructionJSONArr,
  moreConstructions,
} from "../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import {
  openAddConstructionForm,
} from '../store/actions/actions';



interface IHierarchyProps extends ImapStateToProps, ImapDispatchToProps {
}

interface ImapStateToProps {
  constructionJSONArr?: {
    id: number
    name: string
    address: string
    haveMachine: boolean
  }[]
}

interface ImapDispatchToProps {
  getConstructionJSONArr?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  moreConstructions?: () => (dispatch: any, getState: () => stateType) => Promise<any>;
  openAddConstructionForm?: () => (dispatch: any, getState: () => stateType) => void;
}

class Hierarchy extends React.Component<IHierarchyProps> {
  constructor(props: any) {
    super(props);
    this.Init();
  }

  render() {
    return (
      <div className="hierarchy" style={{ width: '250px', minWidth: '250px' }}>
        <div className="hierarchy__content">
          <Button name='Добавить здание' ClickHandler={this.AddConstruction.bind(this)} />
          {this.props.constructionJSONArr && this.props.constructionJSONArr.map(constructionJSON =>
            <div key={constructionJSON.id} className='hierarchy__content-item'>
              <Construction constructionJSON={constructionJSON} />
            </div>
          )}
          <Button name='Больше зданий' ClickHandler={this.MoreConstructions.bind(this)} />
        </div>
        <div className="hierarchy__border-move" style={{ left: '248px' }}
          onMouseDown={this.AddEventMouseMove.bind(this)}
          onTouchStart={this.AddEventTouchMove.bind(this)}>
          <div className="hierarchy__border-move-handle"></div>
        </div>
      </div >
    );
  }

  private Init() {
    this.GetConstructions();
  }

  private AddConstruction() {
    this.props.openAddConstructionForm();
  }

  private async GetConstructions() {
    this.props.getConstructionJSONArr();
  }

  private MoreConstructions() {
    this.props.moreConstructions();
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
    getConstructionJSONArr,
    openAddConstructionForm,
    moreConstructions,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IHierarchyProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(Hierarchy);
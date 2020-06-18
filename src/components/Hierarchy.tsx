import React from 'react';
import './Hierarchy.scss';
import Construction from './Construction';

export default class Hierarchy extends React.Component {
  constructor(props: any) {
    super(props);
    this.Init();
  }

  private constructionPath:  'Warehouse/GetConstructions?';

  private constructorJSONArr: {
    id: number;
    name: string;
    address: string;
  }[] = [];

  render() {
    return (
      <div className="hierarchy" style={{ width: '150px', minWidth: '150px' }}>
        <div className="hierarchy__content">
          {
            this.constructorJSONArr && this.constructorJSONArr.map(constructorJSON =>
              <Construction constructorJSON={constructorJSON} />
            )
          }
        </div>
        <div className="hierarchy__border-move" style={{ left: '148px' }}
          onMouseDown={this.AddEventMouseMove.bind(this)}
          onTouchStart={this.AddEventTouchMove.bind(this)}
        >
          <div className="hierarchy__border-move-handle"></div>
        </div>
      </div >
    );
  }

  private Init() {
    this.GetData();
  }

  private async GetData() {
      // const response = await fetch(this.constructionPath + 'count=10', {
      //   method: 'POST',
      // });

      // this.constructorJSONArr = await response.json();
    // заглушка
    this.constructorJSONArr = [
      {
        id: 1,
        name: 'Офис',
        address: 'Невский пр-кт, 246',
      },
      {
        id: 1,
        name: 'Склад расходников',
        address: 'ул. Пионерская, 117',
      },
      {
        id: 1,
        name: 'Склад техники',
        address: 'ВО, 11-я линия, 32К3',
      },
    ]
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
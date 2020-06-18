import { Lines } from './Line';
import { ControlObserverCoordinate } from '../Control/VerticalBorder';


export default class LineHeader implements Lines, ControlObserverCoordinate{
  constructor(contentLineArr: HTMLElement[]) {
    this.contentLineArr = contentLineArr;
    this.Init();
  }
  
  private heightArr: number[] = [];

  private contentLineArr: HTMLElement[];

  private containerContentLineArr: HTMLElement[] = [];

  private Init() {
    this.Create();
  }

  private Create() {
    this.contentLineArr.forEach(el => {
      const container = document.createElement('div');
      container.classList.add('line-container-header');
      container.classList.add('line-container');
      container.appendChild(el);
      this.containerContentLineArr.push(container);
    })
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 1 && coordinatePercent >= 0) {
      this.containerContentLineArr.forEach(el => {
        el.style.height = 'auto';
      });

      this.heightArr.length = 0;

      this.containerContentLineArr.forEach(el => {
        this.heightArr.push(el.offsetHeight);
      });

      this.heightArr.sort(this.Compare);

      this.containerContentLineArr.forEach(el => {
        el.style.height = `${this.heightArr[this.heightArr.length - 1]}px`;
      });
    }
  }

  private Compare(a: number, b: number) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }

  GetElementArr(){
    return this.containerContentLineArr.slice();
  }
}
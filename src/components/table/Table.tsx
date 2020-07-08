import React, { Component } from 'react';
import './Table.scss';
import VerticalBorder from './Control/VerticalBorder';
import ColumnLineFacade from './View/ColumnLineFacade';
import BordersControl from './Control/BordersFacade';
import { stateType } from './../../store/store';
import { connect } from 'react-redux';

interface ImapStateToProps {
  machines?: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }[]
}

interface ITableProps extends ImapStateToProps {
  GetMachine: (machineJSON: {
    id: number;
    name: string;
    createYear: number;
    roomId: number;
  }) => void;
}

class Table extends Component<ITableProps> {
  render() {
    this.ChangeContent();
    return (
      <div className='table' ref='table'></div>
    );
  }

  private contentLineArr: HTMLElement[] = [];

  private header: HTMLElement[] = [];

  private names = [
    'Id',
    'Name',
    'Create Year',
  ];

  private columnCount = 3;

  selectLine: number;

  private currentElement: HTMLElement;

  private verticalBorderArr: VerticalBorder[] = [];

  private size: number;

  private bordersControl: BordersControl;

  private columnLineFacade: ColumnLineFacade;

  constructor(props: any) {
    super(props);
    this.CreateHeader();
    this.CreateLineArr(this.props.machines);
  }

  componentDidMount() {
    this.currentElement = this.refs.table as HTMLElement;
    this.Init(this.contentLineArr);
  }

  private CreateHeader() {
    this.names.forEach(el => {
      const elHTML = document.createElement('div');
      elHTML.innerText = el;
      this.header.push(elHTML);
    });
  }

  private CreateLineArr(machineJSONArr: {
    id: number;
    name: string;
    createYear: number;
  }[]) {
    const contentLineArr: HTMLElement[] = [];
    if (machineJSONArr) {
      machineJSONArr.forEach(el => {
        const elId = document.createElement('div');
        elId.innerText = `${el.id}`;
        contentLineArr.push(elId);

        const elName = document.createElement('div');
        elName.innerText = el.name;
        contentLineArr.push(elName);

        const elYear = document.createElement('div');
        elYear.innerText = `${el.createYear}`;
        contentLineArr.push(elYear);
      });
      this.contentLineArr = contentLineArr;
    }
  }

  private Init(cont: HTMLElement[]) {
    this.Create(cont);
    this.IntervalCheckSize();
  }

  Create(cont: HTMLElement[]) {
    for (let i = 0; i < this.columnCount - 1; i++) {
      this.verticalBorderArr.push(new VerticalBorder(this.currentElement));
    }

    cont = this.header.concat(cont);

    this.bordersControl = new BordersControl(this.verticalBorderArr.slice());
    this.columnLineFacade = new ColumnLineFacade(this.bordersControl.GetVerticalBorderArr(), cont.slice(), this.currentElement);
    this.columnLineFacade.SetMethodGetSelectLine(this.SetSelectLine.bind(this));
    this.bordersControl.SetDefaultPosition();
  }

  private ChangeContent() {
    this.CreateLineArr(this.props.machines);
    this.AddLines(this.contentLineArr);
  }

  private AddLines(contentLineArr: HTMLElement[]) {
    this.currentElement = this.refs.table as HTMLElement;
    if (this.currentElement) {
      this.NewLines(contentLineArr);
    }
  }

  private NewLines(contentLineArr: HTMLElement[]) {
    this.columnLineFacade.NewContent(contentLineArr.slice());
    this.bordersControl.UpdatePosition();
    this.SetSelectLine(-1);
  }

  private SetSelectLine(selectLine: number): void {
    this.selectLine = selectLine;
    if (this.props.GetMachine)
      if (selectLine !== -1)
        this.props.GetMachine(this.props.machines[selectLine]);
      else
        this.props.GetMachine(null);
  }

  private IntervalCheckSize() {
    this.size = this.currentElement.offsetWidth;
    setInterval(() => {
      if (this.currentElement.offsetWidth !== this.size) {
        this.bordersControl.UpdatePosition();
        this.columnLineFacade.UpdatePosition();
      }
    }, 50);
  }
}


function mapStateToProps(state: stateType) {
  return {
    machines: state.machineJSONArr.machineJSONArr
  };
}

export default connect<ImapStateToProps, {}, ITableProps, stateType>(
  mapStateToProps
)(Table);
import React from 'react';
import './AddEditRoom.scss';
import Submit from '../Submit';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { closeAddEditRoomForm } from '../../store/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stateType } from '../../store/store';
import { addEditRoomInConstruction } from '../../store/actions/Rooms/Rooms';

interface ImapStateToProps {
  visible?: boolean;
  roomJSON?: {
    id: number;
    name: string;
    floor: number;
    constructionId: number;
    haveMachine: boolean
  };
  headerName?: string;
  submitName?: string;
  path?: string;
}

interface ImapDispatchToProps {
  closeAddEditRoomForm?: () => (dispatch: any, getState: () => stateType) => void;
  addEditRoomInConstruction?: (formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
}

interface IAddEditRoomProps extends ImapStateToProps, ImapDispatchToProps {

}

class AddEditRoom extends React.Component<IAddEditRoomProps> {
  constructor(prop: any) {
    super(prop);
  }
  private visibleElement: JSX.Element;

  render() {
    this.visibleElement = this.props.visible ?
      <div className='add-edit-room'>
        <div className='add-edit-room__container'>
          <div className='add-edit-room__header'>
            <span>{this.props.headerName}</span>
            <div className='add-edit-room__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-room__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type="hidden" name='roomId' value={this.props.roomJSON ? this.props.roomJSON.id : 0} />
            <input type="hidden" name='constructionId' value={this.props.roomJSON ? this.props.roomJSON.constructionId : 0} />
            <Input text='Введите название' name='name' value={this.props.roomJSON ? this.props.roomJSON.name : ''}></Input>
            <Input text='Введите этаж' name='floor' value={this.props.roomJSON ? `${this.props.roomJSON.floor}` : ''}></Input>
            <Submit name={this.props.submitName} />
          </form>
        </div>
      </div>
      : null
    return (
      this.visibleElement
    );
  }

  private Close() {
    this.props.closeAddEditRoomForm();
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.addEditRoomInConstruction(formData);
  }

}



function mapStateToProps(state: stateType) {
  return {
    visible: state.addEditRoom.visible,
    roomJSON: state.addEditRoom.roomJSON,
    headerName: state.addEditRoom.headerName,
    submitName: state.addEditRoom.submitName,
    path: state.addEditRoom.path,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addEditRoomInConstruction,
    closeAddEditRoomForm,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddEditRoomProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddEditRoom);
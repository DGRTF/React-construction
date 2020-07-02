import React from 'react';
import './AddEditConstruction.scss';
// import storeAddEditConstruction from '../../store/store/AddEditConstruction/AddEditConstruction';
import { stateType } from '../../store/store';
import Button from '../Button/Button';
import Submit from '../Submit';
import Input from '../Input/Input';
import { addEditConstruction } from "../../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVisible, setConstructionJSON } from '../../store/actions/AddEditConstruction/AddEditConstruction';

interface ImapDispatchToProps {
  addEditConstruction?: (formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
  setVisible?: (visible: boolean) => {
    type: "ADD_EDIT_CONSTRUCTION_SET_VISIBLE";
    payload: boolean;
  };
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
}

interface ImapStateToProps {
  visible?: boolean;
  constructionJSON?: {
    id: number;
    name: string;
    address: string;
    haveMachine: boolean;
  };
  headerName?: string;
  submitName?: string;
}

interface IAddConstructionProps extends ImapDispatchToProps, ImapStateToProps {}

class AddConstruction extends React.Component<IAddConstructionProps> {
  constructor(prop: any) {
    super(prop);
    // this.state = {
    //   visible: false,
    //   constructionJSON: storeAddEditConstruction.getState().constructionJSON
    // };

    // storeAddEditConstruction.subscribe(this.SetConstructionJSON.bind(this));
  }

  private visibleElement: JSX.Element;

  // private headerName: string;

  // private submitName: string;

  render() {
    this.visibleElement = this.props.visible ?
      <div className='add-edit-construction'>
        <div className='add-edit-construction__container'>
          <div className='add-edit-construction__header'>
            <span>{this.props.headerName}</span>
            <div className='add-edit-construction__close'>
              <Button name='Закрыть' ClickHandler={this.Close.bind(this)}></Button>
            </div>
          </div>
          <form className='add-edit-construction__form' onSubmit={this.AddEditConstruction.bind(this)}>
            <input type='hidden' name='constructionId' value={this.props.constructionJSON ? `${this.props.constructionJSON.id}` : ''}></input>
            <Input text='Введите название' name='name' value={this.props.constructionJSON ? this.props.constructionJSON.name : ''}></Input>
            <Input text='Введите адрес' name='address' value={this.props.constructionJSON ? this.props.constructionJSON.address : ''}></Input>
            <div>
              <div className='add-edit-construction__submit-container'>
                <Submit name={this.props.submitName} />
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
    // storeAddEditConstruction.dispatch({
    //   type: 'ADD_EDIT_CONSTRUCTION_SET_VISIBLE',
    //   payload: false
    // });

    // storeAddEditConstruction.dispatch({
    //   type: 'ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_JSON',
    //   payload: null
    // });
    this.props.setVisible(false);
    this.props.setConstructionJSON(null);
  }

  // private SetConstructionJSON() {
  //   this.setState({
  //     constructionJSON: storeAddEditConstruction.getState().constructionJSON
  //   });
  //   this.setState({
  //     visible: storeAddEditConstruction.getState().visible
  //   });
  //   this.headerName = storeAddEditConstruction.getState().headerName;
  //   this.submitName = storeAddEditConstruction.getState().submitName;
  // }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.addEditConstruction(formData);

    // storeAddEditConstruction.dispatch({
    //   type: 'ADD_EDIT_CONSTRUCTION_SET_CONSTRUCTION_JSON',
    //   payload: null
    // });

    // storeAddEditConstruction.dispatch({
    //   type: 'ADD_EDIT_CONSTRUCTION_SET_VISIBLE',
    //   payload: false
    // });
    this.props.setConstructionJSON(null);
    this.props.setVisible(false);
  }

}




function mapStateToProps(state: stateType) {
  return {
    visible: state.addEditConstruction.visible,
    constructionJSON: state.addEditConstruction.constructionJSON,
    headerName: state.addEditConstruction.headerName,
    submitName: state.addEditConstruction.submitName
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addEditConstruction: addEditConstruction,
    setVisible: setVisible,
    setConstructionJSON: setConstructionJSON
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddConstructionProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddConstruction);
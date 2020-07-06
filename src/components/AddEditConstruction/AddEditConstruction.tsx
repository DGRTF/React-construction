import React from 'react';
import './AddEditConstruction.scss';
import { stateType } from '../../store/store';
import Button from '../Button/Button';
import Submit from '../Submit';
import Input from '../Input/Input';
import { addEditConstruction } from "../../store/actions/ConstructionJSONArr/ConstructionJSONArr";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeAddEditConstructionForm } from '../../store/actions/actions';

interface ImapDispatchToProps {
  addEditConstruction?: (formData: FormData) => (dispatch: any, getState: () => stateType) => Promise<any>;
  closeAddEditConstructionForm?: () => (dispatch: any, getState: () => stateType) => void;
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

interface IAddConstructionProps extends ImapDispatchToProps, ImapStateToProps { }

class AddConstruction extends React.Component<IAddConstructionProps> {
  constructor(prop: any) {
    super(prop);
  }

  render() {
    return (
      <div className='add-edit-construction' style={this.props.visible ? { display: 'flex' } : { display: 'none' }}>
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
    );
  }

  private Close() {
    this.props.closeAddEditConstructionForm();
  }

  private async AddEditConstruction(ev: React.FormEvent) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget as HTMLFormElement);
    this.props.addEditConstruction(formData);
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
    addEditConstruction,
    closeAddEditConstructionForm,
  }, dispatch)
}

export default connect<ImapStateToProps, ImapDispatchToProps, IAddConstructionProps, stateType>(
  mapStateToProps,
  mapDispatchToProps
)(AddConstruction);
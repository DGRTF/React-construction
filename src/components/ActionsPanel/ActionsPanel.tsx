import React from 'react';
import Submit from '../Submit';
import Button from '../Button/Button';
import Indicate from '../Indicate/Indicate';

interface IActionsPanel {
  AddItem: () => void;
  EditItem: (ev: React.MouseEvent) => void;
  DeleteItem: (ev: React.FormEvent) => void;
  indicate: boolean;
}

export class ActionsPanel extends React.Component<IActionsPanel> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div className='construction__add-room'>
          <Button name='+' ClickHandler={this.props.AddItem} />
        </div>
        <div className='hierarchy__delete-construction'>
          <Button name='X' ClickHandler={this.props.DeleteItem} />
        </div>
        <div className='hierarchy__edit-construction'>
          <Button name='/' ClickHandler={this.props.EditItem} />
        </div>
        <Indicate indicate={this.props.indicate} />
      </div>
    )
  }
}
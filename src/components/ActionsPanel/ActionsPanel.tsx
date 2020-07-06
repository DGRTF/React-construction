import React from 'react';
import './ActionsPanel.scss';
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
      <div className='actions-panel'>
        <div className='actions-panel__add'>
          <Button name='add' font='icons' ClickHandler={this.props.AddItem} />
        </div>
        <div className='actions-panel__delete-construction'>
          <Button name='delete_forever' font='icons' ClickHandler={this.props.DeleteItem} />
        </div>
        <div className='actions-panel__edit-construction'>
          <Button name='edit' font='icons' ClickHandler={this.props.EditItem} />
        </div>
        <Indicate indicate={this.props.indicate} />
      </div>
    )
  }
}
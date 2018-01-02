import React, { Component } from 'react';
import styled from 'styled-components';
import DoneIcon from './components/Icons/DoneIcon';

const StyledView = styled.div`
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;

    &:hover {
      cursor: pointer;
      opacity: .9;
      transform: scale(1.01);
      transition: .2;
    }
`;


class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  toggle() {
    this.setState({checked: !this.state.checked});
    this.props.toggle(this.props.todoId, !this.state.checked);
  }

  render() {
    const fillColor = this.state.checked ? "#DBDEE4" : "#FFFFFF";
    return (
      <StyledView
        onClick={() => this.toggle()}
      >
        <DoneIcon checked={this.state.checked} size={14} fill={fillColor}/>
        <span>{this.props.text}</span>
      </StyledView>
    );
  }
}

export default TodoItem;

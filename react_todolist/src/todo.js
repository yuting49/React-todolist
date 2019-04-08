import React, { Component } from 'react';
import classNames from 'classnames';

class Todo extends Component {
  constructor(props){
    super(props)
    this.delete = this.delete.bind(this)
    this.mark = this.mark.bind(this)
  }

  delete(){
    const {todo, deleteTodo} = this.props
    deleteTodo(todo.id)
  }
 
  mark(){
    const {todo, markTodo} = this.props
    markTodo(todo.id)
  }

  render() {
    const {todo} = this.props
    const taskClass = classNames({
      'list-group-item': true,
      'd-flex': true, 
      'justify-content-between': true,
      'bgg': todo.isCompleted,
    })
    
    return (
      <li  className={taskClass}>
        {todo.text} 
        <div>
          <button type='button' className="btn btn-success" onClick={this.mark}>完成</button>
          <button type='button' className='btn btn-danger' onClick={this.delete}>刪除</button>
        </div>
      </li>
    );
  }
}

export default Todo;
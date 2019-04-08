import React, { Component } from 'react';
import Todo from './todo';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      todotext: ''
    }
    this.id = 1
    this.handleChange = this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.markTodo = this.markTodo.bind(this)
  }

  componentDidMount(){
    const todoData = window.localStorage.getItem('todoapp') 
    if (todoData) {
      const oldtodos = JSON.parse(todoData)
      this.setState({
        todos: oldtodos
      })
      this.id = oldtodos[oldtodos.length - 1].id + 1
    } 
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.todos !== this.state.todos) {
      window.localStorage.setItem('todoapp', JSON.stringify(this.state.todos))
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault()
  }

  handleChange = (e) =>{
    this.setState({
      todotext: e.target.value
    })
  }

  addTodo(){
    const { todotext, todos } = this.state
    if (todotext === ''){
      return
    }
    this.setState({
      todos:[...todos,{
        id: this.id,
        text: todotext,
        isCompleted: false,
      }],
      todotext: ''
    })
    this.id++
  }

  markTodo(id){
    this.setState({
      todos: this.state.todos.map(todo =>{
        if (todo.id !== id){
          return todo
        } 
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      })
    })
  }

  deleteTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Todo List</h1>
        <form className="form-group input-group mb-3" onSubmit={this.handleSubmit}>
            <input className="form-control" type="text" name="todos" placeholder="Things to do" value={this.state.todotext} onChange={this.handleChange}/>
            <button className="btn btn-primary" type="submit" onClick={this.addTodo}>Add Todo</button>
        </form>
        <ul className="list-group">
          {this.state.todos.map(todo => 
            <Todo key={todo.id} todo={todo} class={todo.taskClass} 
                  markTodo={this.markTodo} deleteTodo={this.deleteTodo}/>)}
        </ul>
      </div>
    );
  }
}

export default App;
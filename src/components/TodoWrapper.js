import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([])
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = todo => {
    if (todo.trim() !== '') {
      setTodos([
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false }
      ]);
      setErrorMessage('');
    } else {
      setErrorMessage('Task cannot be empty');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear the error message after 3 seconds (adjust as needed)
    }
  };
  
  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, 
      completed: !todo.completed}: todo))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo,
    isEditing: !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
    if (task.trim() !== '') {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
      setErrorMessage('');
    } else {
      setErrorMessage('Task cannot be empty');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear the error message after 3 seconds (adjust as needed)
    }
  };
  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      {errorMessage && (
        <p className='error-message'>{errorMessage}</p>
      )}
      <TodoForm addTodo = {addTodo}/>
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo}/>
        ) : (
          <Todo task={todo} key={index}
        toggleComplete={toggleComplete} deleteTodo= 
        {deleteTodo} editTodo={editTodo} />
        )
        
      ))}
    </div>
  )
}

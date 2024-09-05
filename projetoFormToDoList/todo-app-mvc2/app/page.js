'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  };

  const addTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = async (id, status) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: !status }),
    });
    await response.json();
    fetchTodos();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={styles.input}
      />
      <button onClick={addTodo} className={styles.button}>
        Adicionar Tarefa
      </button>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo._id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            {todo.title} - {todo.status}
            
            <button onClick={() => deleteTodo(todo._id)} className={styles.button}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

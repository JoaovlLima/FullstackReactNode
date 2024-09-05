'use client';

import { useState, useEffect } from 'react';


export default function TodosPage() {
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

  const updateTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
    });
    setTodos(todos.filter((todo) => todo._id !== id, todos.completed == true));
  };


  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Adicione uma nova tarefa"
      />
      <button onClick={addTodo}>Adicionar Tarefa</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.completed ? 'Concluída' : 'Pendente'}
            <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
            <button onClick={() => updateTodo(todo._id)}>
              {todo.completed ? 'Desmarcar' : 'Concluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

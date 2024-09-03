'use client';

import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/todoService';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    const newTodoData = { title: newTodo, completed: false };
    const createdTodo = await createTodo(newTodoData);
    setTodos([...todos, createdTodo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleUpdateTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    const updatedTodo = await updateTodo(id, { completed: !todoToUpdate.completed });
    setTodos(todos.map((todo) =>
      todo._id === id ? updatedTodo : todo
    ));
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
      <button onClick={handleAddTodo}>Adicionar Tarefa</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.completed ? 'Concluída' : 'Pendente'}
            <button onClick={() => handleDeleteTodo(todo._id)}>Excluir</button>
            <button onClick={() => handleUpdateTodo(todo._id)}>
              {todo.completed ? 'Desmarcar' : 'Concluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

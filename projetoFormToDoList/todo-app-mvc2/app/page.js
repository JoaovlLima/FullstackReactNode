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
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      if (data.success) {
        setTodos(data.data);
      } else {
        console.error('Erro ao buscar tarefas:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });
      const data = await response.json();
      if (data.success) {
        setTodos([...todos, data.data]);
        setNewTodo('');
      } else {
        console.error('Erro ao adicionar tarefa:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        console.error('Erro ao excluir tarefa:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const updateTodo = async (id, status) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status === 'A fazer' ? 'Fazendo' : 'Feito' }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTodos();
      } else {
        console.error('Erro ao atualizar tarefa:', data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={styles.input}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={addTodo} className={styles.button}>
        Adicionar Tarefa
      </button>
      <ul className={styles.todoList}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id} className={styles.todoItem}>
              <span className={styles.todoTitle}>
                {todo.title ? todo.title : 'Sem título'}
              </span> - 
              <span className={styles.todoStatus}>
                {todo.status ? todo.status : 'Status desconhecido'}
              </span>
              <button onClick={() => updateTodo(todo._id, todo.status)} className={styles.button}>
                {todo.status === 'Feito' ? 'Desmarcar' : 'Concluir'}
              </button>
              <button onClick={() => deleteTodo(todo._id)} className={styles.button}>
                Excluir
              </button>
            </li>
          ))
        ) : (
          <li className={styles.emptyList}>Nenhuma tarefa disponível</li>
        )}
      </ul>
    </div>
  );
}

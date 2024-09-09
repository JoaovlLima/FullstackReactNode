'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redireciona para login se o usuário não estiver autenticado
        return;
      }

      const response = await fetch('/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no header da requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos da API:', data); // Verifica os dados recebidos

        if (data.todos && Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          console.error('O formato dos dados está incorreto ou os "todos" não estão disponíveis.');
          setTodos([]); // Garante que a lista de todos seja um array vazio em caso de erro
        }
      } else {
        router.push('/login'); // Redireciona para login se houver erro
      }
    };

    fetchTodos();
  }, [router]);

  const addTodo = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTodo }),
    });

    const data = await response.json();
    setTodos([...todos, data.todo]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTodo}>Adicionar Tarefa</button>
      <ul>
        {todos.map((todo, index) => {
          // Adiciona uma verificação adicional para garantir que `todo` seja um objeto válido
          if (!todo || typeof todo !== 'object' || !todo._id) {
            console.error('Item da lista inválido:', todo);
            return null;
          }
          return (
            <li key={todo._id}>
              {todo.title ? todo.title : 'Título indisponível'} {/* Verifica se o título existe */}
              <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

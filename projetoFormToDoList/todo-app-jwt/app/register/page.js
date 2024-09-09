'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register() {
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome ,email, password }),
    });


    if (response.ok) {
      router.push('/login');
    } else {
      alert('Erro ao registrar');
    }
  };


  return (
    <form onSubmit={handleRegister}>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Usuário"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}




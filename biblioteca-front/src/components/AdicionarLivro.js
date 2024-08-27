import React, { useState } from 'react';

function AdicionarLivro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoLivro = { titulo, autor, ano, genero };

    // Faz uma requisição POST para criar um novo livro
    fetch('http://localhost:3000/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoLivro)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Livro criado:', data);
        // Limpa os campos após a criação
        setTitulo('');
        setAutor('');
        setAno('');
        setGenero('');
      })
      .catch(error => console.error('Erro ao criar livro:', error));
  };

  return (
    <div>
      <h2>Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button type="submit">Adicionar Livro</button>
      </form>
    </div>
  );
}

export default AdicionarLivro;
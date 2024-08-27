import React, { useState } from 'react';

function AtualizarLivro({ livro }) {
  const [titulo, setTitulo] = useState(livro.titulo);
  const [autor, setAutor] = useState(livro.autor);
  const [ano, setAno] = useState(livro.ano);
  const [genero, setGenero] = useState(livro.genero);

  const handleSubmit = (e) => {
    e.preventDefault();

    const livroAtualizado = { titulo, autor, ano, genero };

    // Faz uma requisição PATCH para atualizar o livro
    fetch(`http://localhost:3000/livros/${livro._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(livroAtualizado)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Livro atualizado:', data);
      })
      .catch(error => console.error('Erro ao atualizar livro:', error));
  };

  return (
    <div>
      <h2>Atualizar Livro</h2>
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
        <button type="submit">Atualizar Livro</button>
      </form>
    </div>
  );
}

export default AtualizarLivro;

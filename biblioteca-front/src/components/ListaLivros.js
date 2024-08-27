import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Importa o CSS no componente

function ListaLivros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    // Faz uma requisição GET para listar todos os livros usando axios
    axios.get('http://localhost:3000/livros')
      .then(response => setLivros(response.data))
      .catch(error => console.error('Erro ao buscar livros:', error));
  }, []);

  function handleDelete(id) {
    // Faz uma requisição DELETE para remover o livro usando axios
    axios.delete(`http://localhost:3000/livros/${id}`)
      .then(() => {
        // Atualiza a lista de livros após a remoção
        setLivros(livros.filter(livro => livro._id !== id));
      })
      .catch(error => console.error('Erro ao deletar livro:', error));
  }

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro._id}>
            {livro.titulo} - {livro.autor} ({livro.ano})
            <button onClick={() => handleDelete(livro._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaLivros;

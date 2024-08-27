import React from 'react';
import ListaLivros from './components/ListaLivros';
import AdicionarLivro from './components/AdicionarLivro';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Gerenciamento de Livros</h1>
      <AdicionarLivro />
      <ListaLivros />
    </div>
  );
}

export default App;

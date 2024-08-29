// URL da API (substitua pela URL correta se necessário)
const apiUrl = 'http://localhost:3000/livros';


// Função para buscar os livros na API e renderizar na tabela
function buscarLivros() {
    fetch(apiUrl)
        .then(response => response.json()) // Converte a resposta para JSON
        .then(livros => {
            const tabelaCorpo = document.getElementById('livrosCorpo');
            tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de renderizar


            // Itera sobre os livros e cria uma linha para cada um
            livros.forEach(livro => {
                const linha = document.createElement('tr');
               
                // Cria as células da linha
                const idCelula = document.createElement('td');
                idCelula.textContent = livro._id; // Ou livro.id_livro dependendo da estrutura


                const tituloCelula = document.createElement('td');
                tituloCelula.textContent = livro.titulo;


                const autorCelula = document.createElement('td');
                autorCelula.textContent = livro.autor;


                const anoCelula = document.createElement('td');
                anoCelula.textContent = livro.ano;


                const generoCelula = document.createElement('td');
                generoCelula.textContent = livro.genero;


                // Adiciona as células na linha
                linha.appendChild(idCelula);
                linha.appendChild(tituloCelula);
                linha.appendChild(autorCelula);
                linha.appendChild(anoCelula);
                linha.appendChild(generoCelula);


                // Adiciona a linha na tabela
                tabelaCorpo.appendChild(linha);
            });
        })
        .catch(error => console.error('Erro ao buscar livros:', error)); // Loga um erro em caso de falha
}


// Chama a função para buscar e renderizar os livros ao carregar a página
window.onload = buscarLivros;


document.getElementById('livroCad').addEventListener('submit', function (event) {
    event.preventDefault();})


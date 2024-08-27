const app = require('./app');


// Definindo a porta a partir das variáveis de ambiente ou usando o padrão 3000
const port = process.env.PORT || 3000;


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

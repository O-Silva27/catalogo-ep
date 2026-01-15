// Servidor Node.js para sincronizar catálogo em tempo real
// Instale: npm install express cors
// Execute: node servidor-sync.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

let catalogo = [];
let logo = null;
let clients = [];

// Endpoint para obter catálogo
app.get('/api/catalogo', (req, res) => {
    res.json(catalogo);
});

// Endpoint para obter logo
app.get('/api/logo', (req, res) => {
    res.json({ logo });
});

// Endpoint para salvar produto
app.post('/api/produto', (req, res) => {
    const produto = req.body;
    catalogo.push(produto);
    res.json({ sucesso: true, id: produto.id });
    notificarClientes();
});

// Endpoint para deletar produto
app.delete('/api/produto/:id', (req, res) => {
    catalogo = catalogo.filter(p => p.id !== parseInt(req.params.id));
    res.json({ sucesso: true });
    notificarClientes();
});

// Endpoint para salvar logo
app.post('/api/logo', (req, res) => {
    logo = req.body.logo;
    res.json({ sucesso: true });
    notificarClientes();
});

// WebSocket para notificação em tempo real (simulado com polling)
function notificarClientes() {
    // Clientes vão fazer polling para sincronizar
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

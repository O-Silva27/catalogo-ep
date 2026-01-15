# Como Colocar o Catálogo Online com Sincronização em Tempo Real

## Opção 1: MAIS FÁCIL - GitHub Pages + Firebase (Recomendado)

### Passo 1: Criar conta GitHub
1. Acesse https://github.com
2. Crie uma conta gratuita

### Passo 2: Criar repositório
1. Clique em "New repository"
2. Nome: `catalogo-ep`
3. Faça upload do arquivo `catalogo-EP.html`

### Passo 3: Ativar GitHub Pages
1. Vá em Settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Save

### Passo 4: Acessar o site
Seu site estará disponível em: `https://seuusuario.github.io/catalogo-ep/catalogo-EP.html`

**Problema**: Os dados ainda estarão salvos em localStorage (não sincroniza entre dispositivos)

---

## Opção 2: COM SINCRONIZAÇÃO - Replit + Replit DB

### Passo 1: Criar conta Replit
1. Acesse https://replit.com
2. Sign up gratuito

### Passo 2: Criar novo Replit
1. Click "Create Repl"
2. Language: Node.js
3. Create Repl

### Passo 3: Adicionar dependências
Cole no shell (lado direito):
```bash
npm install express cors socket.io
```

### Passo 4: Copiar servidor (arquivo servidor-sync.js)
- Cole o conteúdo do arquivo `servidor-sync.js` enviado

### Passo 5: Executar
- Click no botão "Run"
- Seu servidor estará em: `https://seu-nome.replit.dev`

### Passo 6: Atualizar HTML para usar servidor
No arquivo `catalogo-EP.html`, procure por:
```javascript
let db = JSON.parse(localStorage.getItem('providencia_catalogo')) || [
```

E substitua toda a função `salvarProduto()` para enviar para o servidor ao invés do localStorage.

---

## Opção 3: MAIS SIMPLES - Usar localStorage com múltiplos abas

Se quer testar agora sem complicações:
1. Abra o arquivo HTML em múltiplas abas do navegador
2. Os produtos serão sincronizados entre as abas automaticamente
3. Para sincronizar entre dispositivos via WiFi:
   - Computador: Abra DevTools (F12)
   - Procure por "Server" ou use `http-server`
   - Instale: `npm install -g http-server`
   - Execute: `http-server` na pasta
   - Acesse em outro dispositivo: `http://[IP do computador]:8080`

---

## Opção 4: Vercel (Recomendado para produção)

### Passo 1: GitHub
- Coloque seu projeto no GitHub (Opção 1)

### Passo 2: Vercel
1. Acesse https://vercel.com
2. Click "Import Project"
3. Selecione seu repositório GitHub
4. Deploy

### Resultado
Seu site estará em: `https://seu-projeto.vercel.app`

---

## PARA SINCRONIZAÇÃO REAL (Qualquer opção acima):

Você precisa substituir o localStorage por chamadas HTTP para um servidor.

**Exemplo de alteração necessária:**

Procure por:
```javascript
function salvarProduto() {
    // ... validações ...
    db.push({ ... });
    localStorage.setItem('providencia_catalogo', JSON.stringify(db));
```

E substitua por:
```javascript
function salvarProduto() {
    // ... validações ...
    const produto = { ... };
    
    fetch('https://seu-servidor.replit.dev/api/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(r => r.json())
    .then(d => {
        renderizar();
        alert("✅ Produto adicionado!");
    });
}
```

---

## Recomendação Final:
**Use Vercel + Firebase Realtime Database** (ambos têm planos gratuitos generosos)
- Vercel: hospeda o HTML
- Firebase: sincroniza dados em tempo real entre todos os dispositivos

const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 10000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get("/Login" ,(req, res) =>{
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));

})

function PessoasCadastradas(nome, senha, email) {
  const dados = { nome, senha , email };
  const linha = JSON.stringify(dados) + '\n';

  const caminhoArquivo = path.join(__dirname, 'PessoasCadastrados.txt');

  fs.appendFile(caminhoArquivo, linha, (err) => {
    if (err) {
      console.error('Erro ao salvar no arquivo:', err);
    } else {
      console.log('Texto adicionado com sucesso!');
    }
  });
}

app.post("/Cadastro", (req, res) => {
  const { user, senha , email } = req.body;

  if (typeof user !== "string" || !user.trim()) {
    res.status(400).send("Erro: nome inválido");
    return;
  }

  if (typeof senha !== "string" || !senha.trim()) {
    res.status(400).send("Erro: senha inválida");
    return;
  }

  if (typeof email !== "string" || !email.trim()) {
    res.status(400).send("Erro: email invalido");
    return;
  }

  PessoasCadastradas(user, senha , email);
  res.send(`Parabéns, ${user}! Seu cadastro foi realizado com sucesso. Seja muito bem-vindo!`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

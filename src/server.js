const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 14000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'Home.html'));
});



function PessoasCadastradas(nome, senha, email) {
  const dados = { nome, senha  };
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
  const { user, senha} = req.body;

  if (!user || typeof user !== "string" || !user.trim()) {
  

  console.log("Oi amor")
    return res.status(400).send("Erro: nome inválido");
}

if (!senha || typeof senha !== "string" || !senha.trim()) {
    return res.status(400).send("Erro: senha inválida");
}

  PessoasCadastradas(user, senha );
  res.send(`Parabéns, ${user}! Seu cadastro foi realizado com sucesso. Seja muito bem-vindo!`);
});

app.listen(port, () => {
  console.log(`Servidorrrrrr rodando em http://localhost:${port}`);
});

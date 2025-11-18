const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
const users = []

function PessoasCadastradas(nome, senha, email) {
  const dados = { nome, senha, email };
  const linha = JSON.stringify(dados) + '\n';
  const caminhoArquivo = path.join(__dirname, 'PessoasCadastradas.txt');

  fs.appendFile(caminhoArquivo, linha, (err) => {
    if (err) {
      console.error('Erro ao salvar no arquivo:', err);
    } else {
      console.log('Texto adicionado com sucesso!');
    }
  });
}


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get('/Cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'Register.html'));
});

app.post("/login", (req, res) => {
  const { user , senha } = req.body

  if (!users.some(u => u.nome === user && u.senha === senha)) {
  return res.status('404').send("Este Usuário não existe!");
}

  res.send("Seja bem vindo " + user)
  console.log(users)
})

app.post("/Cadastro", (req, res) => {
  const { user, senha , email} = req.body;

  if (!user || typeof user !== "string" || !user.trim()) {
  
    return res.send( 'user invalido' );
}

if (!senha || typeof senha !== "string" || !senha.trim()) {
    return res.send('senha invalido');
}

if (!email|| typeof email !== "string" || !email.trim()) {
    return res.send('email invalido');
}

  users.push({nome: user , senha: senha})
  PessoasCadastradas(user, senha, email );
  res.send(`Parabéns, ${user}! Seu cadastro foi realizado com sucesso. Seja muito bem-vindo!`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

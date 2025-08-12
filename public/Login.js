const inputNome = document.querySelector("#nome");
const inputSenha = document.querySelector("#senha");
const btnEnviar = document.querySelector("#btn_envio");
const home = document.querySelector("#nomeUser")

btnEnviar.addEventListener("click", async () => {
  const user = inputNome.value.trim();
  const senha = inputSenha.value.trim();

  if (!inputNome.value.trim()) {
    inputNome.focus();
    return;
  }

  if (!inputSenha.value.trim()) {
    inputSenha.focus();
    return;
  }

  
localStorage.setItem("NomeUser" , user)
  const resposta = await fetch("/Cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, senha}),
  });

  const texto = await resposta.text();


  inputNome.value = "";
  inputSenha.value = "";

  window.location = '/home'

});






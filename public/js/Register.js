
const inputNome = document.querySelector("#input-nome");
const inputSenha = document.querySelector("#input-senha");
const inputEmail = document.querySelector("#input-email")
const btnEnviar = document.querySelector("#btn-cadastrar");
const btnRegister = document.querySelector("#Btn-register")
const home = document.querySelector("#nomeUser")

btnEnviar.addEventListener("click", async () => {
  const user = inputNome.value.trim();
  const senha = inputSenha.value.trim();
  const email = inputEmail.value.trim()

  if (!inputNome.value.trim()) {
    inputNome.focus();
    return;
  }

  if (!inputSenha.value.trim()) {
    inputSenha.focus();
    return;
  }

   if (!inputEmail.value.trim()) {
    inputEmail.focus();
    return;
  }


  
localStorage.setItem("NomeUser" , user)
  const resposta = await fetch("/Cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, senha, email}),
  });

  const texto = await resposta.text();
  alert(texto)

  inputNome.value = "";
  inputSenha.value = "";
  inputEmail.value = ''
 window.location.href = "/"; 
  

});



const btn_login = document.querySelector("#btn-login")

btn_login.addEventListener("click" , ()=>{
    window.location = '/'
})
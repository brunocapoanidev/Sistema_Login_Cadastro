const inputNome = document.querySelector("#nome");
const inputSenha = document.querySelector("#senha");
const btnEnviar = document.querySelector("#btn_envio");
const btnRegister = document.querySelector("#Btn-register")
const home = document.querySelector("#nomeUser")

function validaCampos(){

  if(inputNome.value.trim() ===""){
    inputNome.focus();
    return false;
  }

  if(inputSenha.value.trim() ===""){
    inputSenha.focus();
    return false;
  }
  return true;
}




btnEnviar.addEventListener("click", async () => {
  const user = inputNome.value.trim();
  const senha = inputSenha.value.trim();

if(!validaCampos()){
  alert("Por favor, preencha todos os campos.");
  return;
}

  
localStorage.setItem("NomeUser" , user)
  const resposta = await fetch("/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, senha}),
  });

  const texto = await resposta.text();
  alert(texto)



     
  

});




btnRegister.addEventListener("click", function (e) {
  e.preventDefault(); 
  
  document.body.classList.add("slide-out"); 
  
  setTimeout(() => {
    window.location.href = "/Cadastro"; 
  }, 1000); 
});
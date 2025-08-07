const inputNome = document.querySelector("#nome");
const inputSenha = document.querySelector("#senha");
const inputEmail = document.querySelector("#Email")
const btnEnviar = document.querySelector("#btn_envio");

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


  const resposta = await fetch("/Cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, senha , email}),
  });

  const texto = await resposta.text();
  alert(texto);

  inputNome.value = "";
  inputSenha.value = "";
  inputEmail.value = "";
});

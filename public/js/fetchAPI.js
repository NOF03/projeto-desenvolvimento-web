"use strict";
console.log("connected");

/**
 * Aqui buscamos as referencias HTML de fetch.ejs
 */
let select = document.getElementById("selectOpt");
let hr = document.getElementById("myHR");
let erro = document.getElementById("error");

//Adicionamos à tag <select> um addEbentListener que é executado quando há uma mudança ("change") na opção de <select>
select.addEventListener("change", function () {
  let id = select.value; //guarda o valor do <select>
  erro.innerHTML = ""; // limpar o valor dentro da tag <p id="error"></p>
  if (id != "") getDadosSW(id); //executa função caso haja valor valido de <select>
});

function getDadosSW(id) {
  fetch(`https://swapi.dev/api/people/${id}`) //Vai buscar o recurso de SWAPI
    .then(mostraErro) //chama a função mostraErro(res) caso a resposta do servidor for "negativo". É depois apanhado no ".catch"
    .then((res) => res.json()) //Caso não haja nenhum erro, transforma o JSON num objecto JS
    .then((json) => getPesronData(json)) //A função getPersonData() recebe como parametro o objecto Json
    .catch((err) => {
      erro.innerHTML = err; //mostra o erro ao utilizador caos o recurso, por exemplo, não está disponivel. O erro é mostrado em  <p id="error"></p>. Se querem testar, selecionam o valor 100 de <select>
    });
}

function getPesronData(json) {
  console.log(json); //imprimi o objecto na consola do browser.

  //Vamos criar uma estrutura HTML onde inserimos os dados provenientes do JSON. A função é chamada em "getDadosSW()";
  let html = `<div>
      <h2>${json.name} </h2>
      <p>Cor cabelo: ${json.hair_color}</p>
      <p>Cor pele: ${json.skin_color}</p>
      <p>Ano nascimento: ${json.birth_year}</p>
    </div>`;

  hr.insertAdjacentHTML("afterend", html);
}

//Criamos uma função onde definimos os erro que queremos mostrar ao cliente CASO a resposta do servidor não é ok (!res.ok). Se for de incusesso,mostramos ao utilizador o status e o url. Esta função é chamada depois na outra função => "getDadosSw()"";
function mostraErro(res) {
  if (!res.ok) throw Error(res.status + "-" + res.url); //chamamos o construtor "Error" e definimos a mensagem que queremos mostrar

  return res;
}

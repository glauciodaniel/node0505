// ESModule
//fs - filesystem - SO.
import fs from "fs"; // quando não tem barra é um módulo nativo ou externo.
//import meuModulo from './meuModulo'; quando tem barra ou outro caminho é um módulo criado

//versões anteriores do NodeJS usávamos o padrão CommonJS
//const fs = require('fs');

//const dir = "./upload";
const dir = `./${process.argv[2]}`;
const file = process.argv[3];
const content = process.argv[4];
//se não existir o diretório
if (!fs.existsSync(dir)) {
  //cria esse diretório
  fs.mkdirSync(dir);
  console.log(`Diretório: ${dir} criado com sucesso!`);
}
//newContent = ["Vai","Corinthians,","melhor","time","do","mundo"];

const newContent = process.argv.map((valor, indice) => {
  if (indice >= 4) {
    return valor;
  }
});
console.log(newContent.join(" "));
//"Vai Corinthians, melhor time do mundo";

fs.writeFile(`${dir}/${file}`, newContent.join(" "), (err) => {
  //existe algum erro?
  if (err) {
    //throw é um comando para estourar um erro e parar o código.
    throw err;
  }
  console.log("Arquivo criado com sucesso! Bem vindos ao NodeJS!");
});

// CLI  - Command Line Interface

const hello = (chocolate) => {
  console.log(`Parâmetro: ${chocolate}`);
};

//contador.... começo; fim; incremento;
for (let i = 0; i < process.argv.length; i++) {
  hello(process.argv[i]);
}

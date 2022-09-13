

let objetos = [
  { nome: 'teste01', date: '03/09/2019 16:37' },
  { nome: 'teste02', date: '03/10/2019 16:37' },
  { nome: 'teste03', date: '03/11/2019 16:37' },
  { nome: 'teste04', date: '03/12/2019 16:37' },
  { nome: 'teste05', date: '03/01/2020 16:37' },
  { nome: 'teste06', date: "04/02/2022 14:30" }
]

function converteData(DataDDMMYY) {
  const dataSubstring = DataDDMMYY.substring(0, 10);
  const dataSplit = dataSubstring.split("/");
  const novaData = new Date(parseInt(dataSplit[2], 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10));
  return novaData;
}

let dataInicial = converteData('03/01/2019');
console.log(dataInicial);
let dataFinal = converteData('03/12/2019');
let objetosFiltrados = objetos.filter(result => {
  return converteData(result.date) >= dataInicial && converteData(result.date) <= dataFinal;
});
console.log(objetosFiltrados);

export default function useConvertors () {
  
  function dateStringToDateObj(dateString) {
    let dataComSplit = dateString.split('/', 3)
    let dataConvertida = new Date(Number(dataComSplit[2]), Number(dataComSplit[1]) - 1, Number(dataComSplit[0]));
    return dataConvertida;
  }

  function formatadorNumerico(numero) {
    let newNum = numero.toString().replace(/[^0-9.,]/g, '');
    const lastCommaIndex = newNum.lastIndexOf(',');
    const lastDotIndex = newNum.lastIndexOf('.');

    if (lastCommaIndex > lastDotIndex) {
      newNum = newNum.replace(/\./g, '').replace(/,/, '.');
    } else if (lastDotIndex > lastCommaIndex) {
      newNum = newNum.replace(/,/g, '');
    } else {
      newNum = newNum.replace(/[.,]/g, '');
    }

    return Number(newNum);
  }
  
  return {
    dateStringToDateObj,
    formatadorNumerico
  }

}
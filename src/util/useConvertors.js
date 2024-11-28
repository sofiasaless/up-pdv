export default function useConvertors () {
  
  function dateStringToDateObj(dateString) {
    let dataComSplit = dateString.split('/', 3)
    let dataConvertida = new Date(Number(dataComSplit[2]), Number(dataComSplit[1]) - 1, Number(dataComSplit[0]));
    return dataConvertida;
  }
  
  return {
    dateStringToDateObj
  }

}
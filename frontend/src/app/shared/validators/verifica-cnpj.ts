const verificaCnpj= (cnpj: string) => {
 
    if (cnpj.length != 14)
        return false;

    if (!isRepetido(cnpj)){
        return false;
    }
         
    // Valida DVs
   let tamanho = cnpj.length - 2
   let numeros:any = cnpj.substring(0,tamanho);
   let digitos:any = cnpj.substring(tamanho);
   let soma = 0;
   let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
   let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function isRepetido(cnpj: string | any[]) {
    const primeiro = cnpj[0];
    let diferente = false;
    for(let i = 1; i < cnpj.length; i++) {
      if(cnpj[i] != primeiro) {
        diferente = true;
      }
    }
    return diferente;
}


export default verificaCnpj;

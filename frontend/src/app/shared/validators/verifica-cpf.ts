const verificaCpf = (numCpf:string) => {
    const cpf = numCpf.split('').map( (numCpf) => parseInt(numCpf));

    if (cpf.length != 11) {
        return false;
    }
    if (!isRepetido(cpf)){
        return false;
    }
    if (!primeiroDigito(cpf)) {
        return false;
    }

    if (!segundoDigito(cpf)) {
        return false;
    }
    return true;
}

function primeiroDigito(cpf: number[]) { 
    let soma =0;
    let resto;

    for (let index = 0; index < 9; index++) {
        soma += cpf[index] * (10 - index);
    }

    resto = (soma * 10) % 11;

    if ( resto < 10 ) {

        return true; 
    }
    return false;
}

function segundoDigito(cpf: number[]) {
    let soma =0;
    let resto;

    for (let index = 0; index < 10; index++) {
        soma += cpf[index] * (11 - index);
    }
    
    resto = (soma * 10) % 11;

    if ( resto < 10 ) {
        
        return true; 
    }
    return false;
}

function isRepetido(cpf: string | any[]) {
    const primeiro = cpf[0];
    let diferente = false;
    for(let i = 1; i < cpf.length; i++) {
      if(cpf[i] != primeiro) {
        diferente = true;
      }
    }
    return diferente;
}
  


export default verificaCpf;
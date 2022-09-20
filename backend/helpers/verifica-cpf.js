
const verificaCpf = (numCpf) => {
    const cpf = numCpf.split('').map( (numCpf) => parseInt(numCpf));

    if (cpf.length != 11) {
        return false;
    }
      
    if (!verificaPrimeiroDigito(cpf)) {
        return false;
    }

    if (!verificaSegundoDigito(cpf)) {
        return false;
    }
    return true;
}

function verificaPrimeiroDigito(cpf) { 
    let soma =0;
    let resto;

    for (let index = 0; index < 9; index++) {
        soma += cpf[index] * (10 - index);
    }

    resto = (soma * 10) % 11;

    if ( resto < 10 ) {
        return cpf[9] == resto; 
    }
    return cpf[9] == 0;
}

function verificaSegundoDigito(cpf) {
    let soma =0;
    let resto;

    for (let index = 0; index < 10; index++) {
        soma += cpf[index] * (11 - index);
    }
    
    resto = (soma * 10) % 11;

    if ( resto < 10 ) {
        return cpf[10] == resto; 
    }
    return cpf[10] == 0;
}

export default verificaCpf;
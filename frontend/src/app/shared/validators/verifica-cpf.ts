const verificaCpf = (numCpf: string) => {
  const cpf = numCpf;

  if (cpf.length != 11) {
    return false;
  }
  if (!isRepetido(cpf)) {
    return false;
  }

  // Valida DVs
  let Soma;
  let Resto;
  Soma = 0;

  for (let i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
  }

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
  }

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
};

function isRepetido(cpf: string | any[]) {
  const primeiro = cpf[0];
  let diferente = false;
  for (let i = 1; i < cpf.length; i++) {
    if (cpf[i] != primeiro) {
      diferente = true;
    }
  }
  return diferente;
}

export default verificaCpf;

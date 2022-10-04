import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import verificaCnpj from './verifica-cnpj'
import verificaCpf from './verifica-cpf';


export class Validacoes {
  
  static VerificaCnpj(controle: AbstractControl) {
    const cnpj = controle.value;

    let valido: boolean = verificaCnpj(cnpj);
    
    if (valido) return null;

    return { cnpjInvalido: true};
  }

  static VerificaCpf(controle: AbstractControl){
    const cpf = controle.value;
    
    let valido: boolean = verificaCpf(cpf);

    if (valido) return null;

    return { cpfInvalido: true};
  }

  static SenhasCombinam(senha: string){
    const validator = (formControl: FormControl) =>{
      const campo = (<FormGroup>formControl.root).get(senha);

      if( !formControl.root || !(<FormGroup>formControl.root).controls){
        return null;
      }
      if (campo!.value !== formControl.value){
        return { senhasNaoCombinam : true}
      }
      return null;
    }    
    return validator;
  }



}



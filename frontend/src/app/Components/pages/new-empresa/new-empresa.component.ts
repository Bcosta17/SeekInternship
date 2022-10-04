import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-new-empresa',
  templateUrl: './new-empresa.component.html',
  styleUrls: ['./new-empresa.component.css']
})
export class NewEmpresaComponent implements OnInit {
  btnText = 'Cadastrar';
  
  
  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  
  createEmpresa(empresa: Empresa){
    this.empresaService.createEmpresa(empresa).subscribe({
      next(){},
      error(err: any) {
      console.log(err); }
    });
    this.router.navigate(['/']);
  }

  
 

  
}

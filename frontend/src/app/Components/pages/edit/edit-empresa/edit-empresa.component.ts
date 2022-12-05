import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Empresa } from 'src/app/Interfaces/Empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent implements OnInit {
  empresa!: Empresa;
  btnText: string = 'Editar';
  msgSuccess!: string;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.empresaService.getEmpresa(id).subscribe((item)=>{
      this.empresa = item.data;
      
    })
  }

  editHandler(empresaData: Empresa){
    const id = this.empresa._id;
    this.empresaService.editarEmpresa(id!, empresaData).subscribe({
      next: (res)=> (this.msgSuccess = "Dados alterado com sucesso"),
    });
    
  }

}

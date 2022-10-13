import { Component, OnInit } from '@angular/core';
import { faAdd, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  faTimes = faTimes;
  faEdit = faEdit;
  faPlus = faAdd;
  
  constructor() { }

  ngOnInit(): void {
  }

}

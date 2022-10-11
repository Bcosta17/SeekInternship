import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  public msgError!: string;

  constructor(
    private fb : FormBuilder,
    private loginService : LoginService,
  ) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email')!;
  }

  get senha(){
    return this.loginForm.get('senha')!;
  }


  submit(){
    if (this.loginForm.valid){
     this.loginService.login({
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha,
     }).subscribe({
      next: (res)=> res,
      error: (e)=> (this.msgError = e),
     })
    }
  }

  

}

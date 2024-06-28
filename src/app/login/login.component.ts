import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../Interfaces/user';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  token : string = '';
  constructor(private loginService : LoginService, private router : Router){}
  loginInformation = new FormGroup({
    userName : new FormControl('',[
      Validators.required
    ]),
    password : new FormControl('',[
      Validators.required
    ])
  });

  onSubmit(){
    var userDetails : User={
      userName : this.loginInformation.value.userName ?? '',
      password : this.loginInformation.value.password ?? ''
    }
    this.loginService.validUser(userDetails).subscribe(
      token=>{localStorage.setItem("jwt",token);
    if(this.loginService.isTokenValid()){
      this.router.navigateByUrl('/home/employees');
    }}
    );
  }

  
  
}

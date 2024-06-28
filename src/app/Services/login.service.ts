import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  validUser(user : User){
    return this.http.post('https://localhost:7110/api/Login/Login',user, { responseType : 'text'});
  }

  isTokenValid(){
    var token : string | null = localStorage.getItem("jwt");
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
}

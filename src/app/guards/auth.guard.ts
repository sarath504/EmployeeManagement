import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  var loginService = inject(LoginService);
  var router = inject(Router);

  if(loginService.isTokenValid()){
    return true;
  }
  else{
    router.navigateByUrl('/login');
    return false;
  }
};



import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
    const localData=localStorage.getItem("angLogin");
    if(localData != null){
      return true;
    }else{
      router.navigateByUrl("login");
      return false;
    }

  return true;
};

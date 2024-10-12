import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const conductorGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const user = localStorage.getItem("usuario")

  if(user == "conductor"){
    return true;
  }

  router.navigate(["/c-home"])
  return false;
};

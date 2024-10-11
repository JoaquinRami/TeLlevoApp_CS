import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const pasajeroGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const user = localStorage.getItem("usuario")

  if(user == "pasajero"){
    return true;
  }

  router.navigate(["/p-home"])
  return false;
};

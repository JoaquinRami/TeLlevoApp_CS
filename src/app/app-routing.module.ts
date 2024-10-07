import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./pages/codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./pages/restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'planificar-viaje',
    loadChildren: () => import('./conductor/planificar-viaje/planificar-viaje.module').then( m => m.PlanificarViajePageModule)
  },
  {
    path: 'c-home',
    loadChildren: () => import('./conductor/c-home/c-home.module').then( m => m.CHomePageModule)
  },
  {
    path: 'p-home',
    loadChildren: () => import('./pasajero/p-home/p-home.module').then( m => m.PHomePageModule)
  },
  {
    path: 'c-mis-viajes',
    loadChildren: () => import('./conductor/c-mis-viajes/c-mis-viajes.module').then( m => m.CMisViajesPageModule)
  },
  {
    path: 'p-mis-viajes',
    loadChildren: () => import('./pasajero/p-mis-viajes/p-mis-viajes.module').then( m => m.PMisViajesPageModule)
  }, 
  {
    path: 'viaje',
    loadChildren: () => import('./conductor/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'buscar-viaje',
    loadChildren: () => import('./pasajero/buscar-viaje/buscar-viaje.module').then( m => m.BuscarViajePageModule)
  },
  {
    path: 'p-viaje',
    loadChildren: () => import('./pasajero/p-viaje/p-viaje.module').then( m => m.PViajePageModule)
  },  
  {
    path: 'qr',
    loadChildren: () => import('./conductor/qr/qr.module').then( m => m.QrPageModule)
  }, 
  {
    path: 'p-qr',
    loadChildren: () => import('./pasajero/p-qr/p-qr.module').then( m => m.PQrPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

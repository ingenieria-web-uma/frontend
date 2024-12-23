import { Component } from '@angular/core';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component.js';
import { TranslatePipe } from "@ngx-translate/core";
import { TraduccionesComponent } from '../traducciones/traducciones.component.js';
import { Router, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../guards/auth-google.service.js';

@Component({
    selector: 'app-barra-navegacion',
    imports: [NotificacionesComponent, TranslatePipe, TraduccionesComponent, RouterModule],
    templateUrl: './barra-navegacion.component.html'
})
export class BarraNavegacionComponent {

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
  ) {}

  usuarioEnSesion() {
    return true;
  }

  usuarioEsAdmin() {
    return true;
  }
  
  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component.js';
import { TranslatePipe } from "@ngx-translate/core";
import { TraduccionesComponent } from '../traducciones/traducciones.component.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [NotificacionesComponent, TranslatePipe, TraduccionesComponent, RouterModule],
  templateUrl: './barra-navegacion.component.html'
})
export class BarraNavegacionComponent {
  usuarioEnSesion() {
    return true;
  }

  usuarioEsAdmin() {
    return true;
  }
}

import { Component } from '@angular/core';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component.js';
import { TranslatePipe } from "@ngx-translate/core";
import { TraduccionesComponent } from '../traducciones/traducciones.component.js';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [NotificacionesComponent, TranslatePipe, TraduccionesComponent],
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

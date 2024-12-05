import { Component } from '@angular/core';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component.js';

@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [NotificacionesComponent],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss',
})
export class BarraNavegacionComponent {
  usuarioEnSesion() {
    return true;
  }

  usuarioEsAdmin() {
    return true;
  }
}

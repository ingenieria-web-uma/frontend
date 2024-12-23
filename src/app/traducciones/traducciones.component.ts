import { Component, OnInit } from '@angular/core';
import { TraduccionesService } from './traducciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-traducciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './traducciones.component.html',
})
export class TraduccionesComponent implements OnInit {
  idiomasDisponibles: { code: string; name: string }[] = [];
  idiomaActual = 'es';

  constructor(private traduccionesService: TraduccionesService) {}

  ngOnInit(): void {
    this.traduccionesService.obtenerIdiomasDisponibles().then((idiomas) => {
      this.idiomasDisponibles = idiomas;

      this.traduccionesService.cargarDesdeCache(this.idiomaActual);
    });
  }

  cambiarIdioma(event: Event): void {
    this.traduccionesService.traducirYActualizar(this.idiomaActual);
  }
}
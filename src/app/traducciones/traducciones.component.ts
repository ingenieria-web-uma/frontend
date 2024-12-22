import { Component, OnInit } from '@angular/core';
import { TraduccionesService } from './traducciones.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-traducciones',
  standalone: true,
  imports: [NgFor],
  templateUrl: './traducciones.component.html',
})
export class TraduccionesComponent implements OnInit {
  idiomasDisponibles: { code: string; name: string }[] = [];

  constructor(private traduccionesService: TraduccionesService) {}

  ngOnInit(): void {
    this.traduccionesService.obtenerIdiomasDisponibles().then((idiomas) => {
      this.idiomasDisponibles = idiomas;
    });

    const idiomaPredeterminado = 'es';
    this.traduccionesService.cargarDesdeCache(idiomaPredeterminado);
  }

  cambiarIdioma(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement?.value;
    if (selectedLanguage) {
      this.traduccionesService.traducirYActualizar(selectedLanguage);
    }
  }
}
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EntradaService } from "./entrada.service";
import { CommonModule } from "@angular/common";
import { VersionComponent } from "../version/version.component";
import { BotonEditarComponent } from "../boton-editar/boton-editar.component";
import { ComentariosComponent } from "../comentarios/comentarios.component";
import { MapasService } from "../mapas/mapas.service";
import { MapasComponent } from "../mapas/mapas.component";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-entrada",
  standalone: true,
  imports: [
    CommonModule,
    VersionComponent,
    BotonEditarComponent,
    ComentariosComponent,
    MapasComponent
],
  templateUrl: "./entrada.component.html",
})
export class EntradaComponent implements OnInit {
  entradaForm: FormGroup;
  entradaId!: string;
  versionActualId!: string;
  nombreEntrada: string = "";
  nombreUsuario: string = "";
  fechaCreacion: Date = new Date();
  tieneMapa: boolean = false;

  @ViewChild(MapasComponent, { static: false }) mapasComponent!: MapasComponent;

  constructor(
    private entradaService: EntradaService,
    private mapasService: MapasService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.entradaForm = this.fb.group({
      ubicacion: this.fb.group({
        lat: [''],
        lon: ['']
      })
    });
  }

  ngOnInit(): void {
    this.entradaId = this.route.snapshot.paramMap.get("id")!;
    this.cargarEntrada();
    this.cargarMapa()
  }

  verVersiones() {
    this.router.navigate([`/entrada/${this.entradaId}/historial/`]);
  }

  editarEntrada() {
    this.router.navigate([`/entrada/${this.entradaId}/editar`]);
  }

  private cargarEntrada() {
    this.entradaService.getEntradaById(this.entradaId).subscribe({
      next: (data) => {
        this.versionActualId = data["idVersionActual"];
        this.nombreEntrada = data["nombre"];
        this.nombreUsuario = data["nombreUsuario"];
        this.fechaCreacion = new Date(data["fechaCreacion"]);
      },
      error: (err) => {
        console.error("Error al obtener la entrada:", err);
      },
    });
  }

  private cargarMapa() {
    this.mapasService.getMapaByEntradaId(this.entradaId).subscribe({
      next: (mapa) => {
        if (mapa && mapa.lat && mapa.lon) {
          this.tieneMapa = true;
          this.entradaForm.get('ubicacion')?.patchValue({
            lat: mapa.lat,
            lon: mapa.lon
          });
        }
      },
      error: (err) => {
        console.error("Error al obtener el mapa:", err);
      },
    });
  }
}

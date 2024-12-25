import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { EntradaService } from "./entrada.service"
import { CommonModule } from "@angular/common"
import { VersionComponent } from "../version/version.component"
import { BotonEditarComponent } from "@shared/components/boton-editar/boton-editar.component"
import { ComentariosComponent } from "../comentarios/comentarios.component"
import { MapasService } from "../mapas/mapas.service"
import { MapasComponent } from "../mapas/mapas.component"
import { FormBuilder, FormGroup } from "@angular/forms"
import { UsuarioService } from "../usuario/usuario.service"
import { TranslatePipe } from "@ngx-translate/core"
import { TraduccionesService } from "../traducciones/traducciones.service"

@Component({
  selector: "app-entrada",
  imports: [
    CommonModule,
    VersionComponent,
    BotonEditarComponent,
    ComentariosComponent,
    MapasComponent,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: "./entrada.component.html",
})
export class EntradaComponent implements OnInit {
  entradaForm: FormGroup
  entradaId!: string
  versionActualId!: string
  nombreEntrada = ""
  nombreUsuario = ""
  idUsuario = ""
  fechaCreacion: Date = new Date()
  tieneMapa = false

  @ViewChild(MapasComponent, { static: false }) mapasComponent!: MapasComponent

  constructor(
    private entradaService: EntradaService,
    private usuarioService: UsuarioService,
    private mapasService: MapasService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private traduccionesService: TraduccionesService,
  ) {
    this.entradaForm = this.fb.group({
      ubicacion: this.fb.group({
        lat: [""],
        lon: [""],
      }),
    })
  }

  ngOnInit(): void {
    this.entradaId = this.route.snapshot.paramMap.get("id")!
    this.cargarEntrada()
    this.cargarMapa()
  }

  verVersiones() {
    this.router.navigate([`/entrada/${this.entradaId}/historial/`])
  }

  editarEntrada() {
    this.router.navigate([`/entrada/${this.entradaId}/editar`])
  }

  private cargarEntrada() {
    this.entradaService.getEntradaById(this.entradaId).subscribe({
      next: async (data) => {
        this.versionActualId = data["idVersionActual"]
        this.nombreEntrada =
          await this.traduccionesService.traducirTextoDirecto(data["nombre"])
        this.idUsuario = data["idUsuario"]
        this.fechaCreacion = new Date(data["fechaCreacion"])
        this.obtenerNombreUsuario(this.idUsuario)
      },
      error: (err) => {
        console.error("Error al obtener la entrada:", err)
      },
    })
  }

  private obtenerNombreUsuario(idUsuario: string) {
    this.usuarioService.getUsuario(idUsuario).subscribe({
      next: (usuario) => {
        this.nombreUsuario = usuario.name
      },
      error: (err) => {
        console.error("Error al obtener el usuario:", err)
        this.nombreUsuario = "Desconocido"
      },
    })
  }

  private cargarMapa() {
    this.mapasService.getMapaByEntradaId(this.entradaId).subscribe({
      next: (mapa) => {
        if (mapa && mapa.lat && mapa.lon) {
          this.tieneMapa = true
          this.entradaForm.get("ubicacion")?.patchValue({
            lat: mapa.lat,
            lon: mapa.lon,
          })
        }
      },
      error: (err) => {
        console.error("Error al obtener el mapa:", err)
      },
    })
  }
}

import { Component, Input, OnInit } from "@angular/core"
import { VersionService } from "./version.service"
import { CommonModule } from "@angular/common"
import { DomSanitizer, SafeHtml } from "@angular/platform-browser"
import { ActivatedRoute } from "@angular/router"
import { TranslateDirective } from "@ngx-translate/core"
import { TraduccionesService } from "../traducciones/traducciones.service"

@Component({
  selector: "app-version",
  imports: [CommonModule, TranslateDirective],
  templateUrl: "./version.component.html",
})
export class VersionComponent implements OnInit {
  @Input()
  versionId!: string
  idEntrada = ""
  contenido = ""
  contenidoSeguro: SafeHtml = ""
  fechaEdicion: Date = new Date()

  constructor(
    private versionService: VersionService,
    private route: ActivatedRoute,
    private sanatizer: DomSanitizer,
    private traduccionesService: TraduccionesService,
  ) { }

  ngOnInit(): void {
    this.idEntrada = this.route.snapshot.paramMap.get("id")!
    this.versionService.obtenerUltimaVersion(this.idEntrada).subscribe({
      next: async (data) => {
        console.log("Datos de la versión", data)
        this.contenido = await this.traduccionesService.traducirTextoDirecto(
          data["contenido"],
        )
        this.fechaEdicion = new Date(data["fechaEdicion"])
        this.contenidoSeguro = this.sanatizer.bypassSecurityTrustHtml(
          this.contenido,
        )
      },
      error: (err) => {
        console.error("Error al obtener la version:", err)
      },
    })
  }
}

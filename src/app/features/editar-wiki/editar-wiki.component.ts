import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { WikisService } from "../wikis/wikis.service"
import { CommonModule } from "@angular/common"
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
import { BotonAtrasComponent } from "@shared/components/boton-atras/boton-atras.component"
import { SubirImagenesComponent } from "@features/subir-imagenes/subir-imagenes.component" // Importa FormsModule
import { SubirImagenesService } from "@features/subir-imagenes/subir-imagenes.service"
import { TranslatePipe } from "@ngx-translate/core"
import { TraduccionesService } from "@features/traducciones/traducciones.service"

@Component({
  selector: "app-editar-wiki",
  imports: [
    CommonModule,
    FormsModule,
    BotonAtrasComponent,
    SubirImagenesComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ], // Asegúrate de incluir FormsModule aquí
  templateUrl: "./editar-wiki.component.html",
})
export class EditorWikiComponent implements OnInit {
  wikiId!: string
  wikiForm: FormGroup
  imageUrl = "" // Variable para almacenar la URL
  antiguoNombreWiki = ""
  nombreWiki = ""

  constructor(
    private WikisService: WikisService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private imagenUrl: SubirImagenesService,
    private traduccionesService: TraduccionesService,
  ) {
    this.wikiForm = this.fb.group({
      nombre: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.wikiId = this.route.snapshot.paramMap.get("idWiki")!
    this.WikisService.getWiki(this.wikiId).subscribe({
      next: async (data) => {
        this.wikiForm.patchValue({
          nombre: await this.traduccionesService.traducirTextoDirecto(
            data.nombre,
          ),
        })
        this.antiguoNombreWiki =
          await this.traduccionesService.traducirTextoDirecto(data.nombre)
        this.nombreWiki = await this.traduccionesService.traducirTextoDirecto(
          data.nombre,
        )
        this.imageUrl = data.imagenUrl
        console.log("Wiki:", data)
      },
      error: (err) => {
        console.error("Error al obtener la wiki:", err)
      },
    })
  }

  guardarCambios(): void {
    console.log("Guardando cambios...")
    if (this.wikiForm.valid) {
      const wikiData = this.wikiForm.value
      console.log("Datos del formulario:", wikiData)
      console.log("Imagen URL:", this.imagenUrl.getUrl())
      this.imageUrl = this.imagenUrl.getUrl()
      wikiData.imagenUrl = this.imageUrl

      this.WikisService.editWiki(this.wikiId, wikiData).subscribe({
        next: (data) => {
          console.log("Cambios guardados:", data)

          this.router.navigate(["/"])
        },
        error: (err) => {
          console.error("Error al guardar los cambios:", err)
        },
      })
    } else {
      console.log("Formulario no válido")
    }
  }
}
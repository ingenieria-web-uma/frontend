import { Component } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { SubirImagenesService } from "./subir-imagenes.service"
import { TranslatePipe } from "@ngx-translate/core"

@Component({
  selector: "app-subir-imagenes",
  imports: [HttpClientModule, CommonModule, FormsModule, TranslatePipe],
  templateUrl: "./subir-imagenes.component.html",
  styleUrls: ["./subir-imagenes.component.scss"],
})
export class SubirImagenesComponent {
  public url = ""
  selectedFile: File | null = null
  mensaje = ""

  constructor(private imageUrl: SubirImagenesService) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
    }
  }

  async onSubmit(): Promise<void> {
    if (this.selectedFile) {
      const formData = new FormData()
      formData.append("archivo", this.selectedFile)

      try {
        const response = await fetch("http://localhost:8000/archivos/subir", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.mensaje || "Error al subir la imagen")
        }

        const data = await response.json()
        console.log(data["url"])
        this.mensaje = data.mensaje
        this.imageUrl.setUrl(data["url"])
      } catch (error) {
        if (error instanceof Error) {
          this.mensaje = error.message
        } else {
          this.mensaje = "Error desconocido al subir la imagen"
        }
      }
    }
  }
}

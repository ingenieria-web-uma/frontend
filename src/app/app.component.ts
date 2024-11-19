import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubirImagenesComponent } from "./subir-imagenes/subir-imagenes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubirImagenesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}

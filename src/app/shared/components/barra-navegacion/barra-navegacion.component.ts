import { Component } from "@angular/core"
import { NotificacionesComponent } from "@features/notificaciones/notificaciones.component.js"
import { TranslatePipe } from "@ngx-translate/core"
import { TraduccionesComponent } from "@features/traducciones/traducciones.component.js"
import { Router, RouterModule } from "@angular/router"
import { AuthGoogleService } from "@core/services/auth-google.service.js"
import { UserService } from "@core/services/user.service.js"

@Component({
  selector: "app-barra-navegacion",
  standalone: true,
  imports: [
    NotificacionesComponent,
    TranslatePipe,
    TraduccionesComponent,
    RouterModule,
  ],
  templateUrl: "./barra-navegacion.component.html",
})
export class BarraNavegacionComponent {
  constructor(
    private authService: AuthGoogleService,
    private userService: UserService,
    private router: Router,
  ) { }

  usuarioEnSesion() {
    return true
  }

  usuarioEsAdmin() {
    return true
  }

  logOut() {
    this.authService.logout()
    this.userService.clearUser()
    this.router.navigate(["/login"])
  }
}

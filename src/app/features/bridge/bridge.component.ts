import { Component, effect } from "@angular/core"
import { Router } from "@angular/router"
import { AuthGoogleService } from "@core/services/auth-google.service"
import { User } from "@models/user.model"
import { UserService } from "@core/services/user.service"

@Component({
  selector: "app-bridge",
  standalone: true,
  imports: [],
  templateUrl: "./bridge.component.html",
})
export class BridgeComponent {
  profile: any
  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
  ) {
    this.profile = this.authService.profile
    effect(() => {
      if (this.profile != null) {
        console.log("Profile: ", this.profile())
        console.log("auth: ", this.authService.getRawProfile())
        const { name, email, sub, picture } = this.profile()
        const user: User = {
          id: sub,
          name: name,
          email: email,
          role: "lector",
          profilePicture: picture,
          wantsEmailNotifications: true,
          oauth: {
            access_token: this.authService.getToken(),
            expires_in: this.authService.getExpiresIn(),
            refresh_token: this.authService.getRefreshToken(),
            expires_in_refresh: this.authService.getExpiresInRefresh(),
          },
        }
        this.userService.setUser(user)
        // post a la api para guardar el usuario
        this.userService.saveUserToDb(user).subscribe({
          next: (data) => {
            console.log("Usuario guardado en la base de datos:", data)
          },
          error: (err) => {
            console.error(
              "Error al guardar el usuario en la base de datos:",
              err,
            )
          },
        })
        this.router.navigate(["/"])
      }
    })
  }
}

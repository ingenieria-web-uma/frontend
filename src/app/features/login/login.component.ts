import { Component, inject, OnInit } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { AuthGoogleService } from "@core/services/auth-google.service"
import { Router } from "@angular/router"
import { LoginService } from "@core/services/login.service"
import { UserService } from "@app/core/services/user.service"

const MODULES: any[] = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
]

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MODULES],
  templateUrl: "./login.component.html",
  // styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthGoogleService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(["/"])
    }
  }

  login(): void {
    this.authService.login() // Inicia el flujo de autenticación
  }

  loginInvitado(): void {
    this.userService.createInvitado()
    this.router.navigate(["/"])
  }
}

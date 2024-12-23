import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PerfilService } from "./perfil.service";
import { TranslatePipe } from "@ngx-translate/core";
import { UserService } from "../core/services/user.service";
import { User } from "../core/models/user.model";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-perfil",
  standalone: true,
  imports: [RouterModule, TranslatePipe, NgIf],
  templateUrl: "./perfil.component.html",
})
export class PerfilComponent implements OnInit {
  idUsuario: string | null = null;
  user: User | null = null;
  usuarioData: any;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get("id");
    this.user = this.userService.getUser() || null;

    if (this.idUsuario) {
      this.getUsuario();
    }
  }

  getUsuario(): void {
    if (this.idUsuario) {
      this.perfilService.getUsuario(this.idUsuario).subscribe({
        next: (data) => {
          this.usuarioData = data;
        },
        error: (err) => {
          console.error("Error al obtener los datos del usuario:", err);
        },
      });
    }
  }
}


import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../core/services/user.service";

@Injectable({
  providedIn: "root",
})
export class ComentariosService {
  private apiUrl = "http://localhost:8000/comentarios/";
  private apiUrlUsuarios = "http://localhost:8000/usuarios/";

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  getComentarios(idEntrada: string): Observable<any[]> {
    return this.http
      .get<{ comentarios: any[] }>(this.apiUrl + "?idEntrada=" + idEntrada)
      .pipe(map((response) => response.comentarios));
  }

  getUsuarioById(usuarioId: string) {
    return this.http.get(`${this.apiUrlUsuarios}${usuarioId}`);
  }

  crearComentario(comentarioData: any): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.userService.getUser()?.oauth.access_token}`,
    };
    return this.http.post(this.apiUrl, comentarioData, { headers });
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { UserService } from "@app/core/services/user.service"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class NewWikiService {
  private apiUrl = "http://localhost:8000/wikis/"

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  createWiki(wikiData: any): Observable<any> {
    console.log("URL de la API: ", this.apiUrl)
    console.log(wikiData)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userService.getUser()?.oauth.access_token}`,
    }
    return this.http.post(this.apiUrl, wikiData, { headers })
  }
}

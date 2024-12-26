import { Component, OnInit } from "@angular/core"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router"
import { BarraNavegacionComponent } from "@shared/components/barra-navegacion/barra-navegacion.component"
import { TranslateService } from "@ngx-translate/core"
import { NgIf } from "@angular/common"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, BarraNavegacionComponent, NgIf],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "laWiki"
  showNavbar = true

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    this.translate.addLangs(["de", "en"])
    this.translate.setDefaultLang("es")
    this.translate.use("es")
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== "/login" && event.url !== "/bridge"
      }
      window.scrollTo(0, 0)
    })
  }
}

import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { BarraNavegacionComponent } from "./barra-navegacion/barra-navegacion.component";
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, BarraNavegacionComponent, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = "laWiki";

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

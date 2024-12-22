import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraduccionesService {
  private apiUrl = 'http://localhost:8000/traducciones';
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient, private translate: TranslateService) {}

  async traducirYActualizar(lang: string): Promise<void> {
    if (this.cache[lang]) {
      this.translate.setTranslation(lang, this.cache[lang], true);
      this.translate.use(lang);
      return;
    }

    const defaultTexts = await firstValueFrom(this.http.get('/i18n/es.json'));

    const traducciones = await this.traducirTexto(defaultTexts, lang);

    this.cache[lang] = traducciones;
    localStorage.setItem(`translations_${lang}`, JSON.stringify(traducciones));

    this.translate.setTranslation(lang, traducciones, true);
    this.translate.use(lang);
  }

  private async traducirTexto(defaultTexts: any, targetLang: string): Promise<any> {
    const body = {
      textos: defaultTexts,
      target_lang: targetLang
    };

    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/traducir`, body)
    );

    return response.translations;
  }

  cargarDesdeCache(lang: string): void {
    const cache = localStorage.getItem(`translations_${lang}`);
    if (cache) {
      this.cache[lang] = JSON.parse(cache);
      this.translate.setTranslation(lang, this.cache[lang], true);
    }
  }

  async obtenerIdiomasDisponibles(): Promise<any[]> {
    const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/idiomas`));

    return response.languages.map((lang: any) => ({
      code: lang.language,
      name: lang.name,
    }));
  }
}
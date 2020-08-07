import { Injectable, OnInit } from "@angular/core";
import { LocalizeRouterService } from "@gilsdav/ngx-translate-router";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  language: string;
  private languageFromUrl = new BehaviorSubject<string>("");

  public languageFromUrl$ = this.languageFromUrl.asObservable();

  setLanguageFromUrl() {
    this.language = this.localizeService.parser.currentLang
      ? this.localizeService.parser.currentLang
      : this.localizeService.parser.defaultLang;
    this.emitLanguageChange(this.language);
  }

  constructor(public localizeService: LocalizeRouterService) {
    this.setLanguageFromUrl();
  }

  emitLanguageChange(lang: string) {
    this.languageFromUrl.next(lang);
  }
}

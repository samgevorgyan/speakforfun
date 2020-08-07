import { Component, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalizeRouterService } from "@gilsdav/ngx-translate-router";
import { isPlatformBrowser } from "@angular/common";
import { languages } from "./utils/language.list";
import { LanguageService } from "./shared/services/language.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "home";

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const languageOfBrowser = this.translate.getBrowserLang();
      let languageFromUrl = this.languageService.language;
      const lang: string = languageFromUrl || languageOfBrowser;
      this.translate.use(
        lang.includes("en") || lang.includes("am") ? lang : "am"
      );
    }
  }
}

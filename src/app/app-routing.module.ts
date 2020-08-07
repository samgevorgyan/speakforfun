import { Location } from "@angular/common";
import {
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterSettings,
  ManualParserLoader
} from "@gilsdav/ngx-translate-router";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { TranslateService } from "@ngx-translate/core";
import { languages } from "./utils/language.list";

export function createTranslateLoaderRouter(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings
) {
  return new ManualParserLoader(
    translate,
    location,
    settings,
    languages,
    "ROUTES."
  );
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: createTranslateLoaderRouter,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

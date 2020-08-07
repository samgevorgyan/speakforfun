import { CustomFontAwesomeModule } from "./../custom-font-awesome/custom-font-awesome.module";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LocalizeRouterModule } from "@gilsdav/ngx-translate-router";
// translate modules
import { TranslateModule } from "@ngx-translate/core";
// directives
// routes

import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { routes } from "src/app/app.routes";

@NgModule({
  imports: [TranslateModule.forChild(), LocalizeRouterModule.forChild(routes)],
  exports: [
    TranslateModule,
    LocalizeRouterModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    CustomFontAwesomeModule
  ]
})
export class ShareModule {}

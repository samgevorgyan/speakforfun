import { ShareModule } from './../../modules/share/share.module';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgImageSliderModule } from 'ng-image-slider';
import { FirstSectionComponent } from './first-section/first-section.component';

export const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, FirstSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ShareModule,
  ],
})
export class HomeModule {}

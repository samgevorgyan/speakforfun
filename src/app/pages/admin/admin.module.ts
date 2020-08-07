import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/modules/share/share.module';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminLoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'main', component: AdminComponent, canActivate: [AdminLoginGuard] },
];

@NgModule({
  declarations: [AdminComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ShareModule,
    OrderModule,
    FormsModule,
  ],
  providers: [AdminLoginGuard],
})
export class AdminModule {}

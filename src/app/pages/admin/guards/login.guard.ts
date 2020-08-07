import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../admin.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Injectable()
export class AdminLoginGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private localize: LocalizeRouterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.adminService.isLogedin) {
      return true;
    } else {
      const goAdmin: any = this.localize.translateRoute('/admin');
      this.router.navigate([goAdmin]);
      return false;
    }
  }
}

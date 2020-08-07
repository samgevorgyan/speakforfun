import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { languageList } from 'src/app/utils/language.list';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languageList = languageList;
  languageFromUrl$ = this.languageService.languageFromUrl$;
  isMenuOpend: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      tap(console.log),
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private localizeService: LocalizeRouterService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.languageFromUrl$.subscribe((lang: string) => {
      this.setSelectedLanguage(lang);
      console.log('subscribe headeric');
    });
  }

  openLoginModal() {
    // this.dialogService.openDialog(LoginDialogComponent, "650px");
  }

  setSelectedLanguage(lang: string) {
    this.languageList.forEach((key) => {
      if (key.name === lang) {
        key.selected = true;
      } else {
        key.selected = false;
      }
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.localizeService.changeLanguage(lang);
    this.languageService.emitLanguageChange(lang);
    this.setSelectedLanguage(lang);
  }

  logOut() {
    // this.store.dispatch(actions.Logout());
  }
}

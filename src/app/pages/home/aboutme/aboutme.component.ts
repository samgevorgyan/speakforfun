import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'jungle-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutmeComponent implements OnInit {
  aboutMeUrl$: Observable<any>;
  aboutMeText$: Observable<any>;
  currentLanguage$: Observable<string>;
  showAllText = false;
  constructor(
    private afs: AngularFirestore,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguage$ = this.languageService.languageFromUrl$;
    this.aboutMeUrl$ = this.afs
      .collection<any>('aboutme-img')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    this.aboutMeText$ = this.afs
      .collection<any>('about-me')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}

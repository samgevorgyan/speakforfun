import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jungle-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
})
export class AssortmentComponent implements OnInit {
  assormentsArray = [];
  currentLanguage$: Observable<string>;
  showAllText = false;

  constructor(
    private afs: AngularFirestore,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getAssortmentrImagesUrl('assortments');
    this.currentLanguage$ = this.languageService.languageFromUrl$;
  }
  getAssortmentrImagesUrl(path: string) {
    this.afs
      .collection<any>(path)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((res) => {
        this.assormentsArray = [];
        res.forEach((item) => {
          const imageObject = [];

          item.data.urls.forEach((element) => {
            imageObject.push({
              image: element.url,
              thumbImage: element.url,
              alt: item.id,
              main: element.main,
            });
          });

          const index = imageObject.findIndex((item) => item.main === true);
          const mainTrue = imageObject.splice(index, 1);
          imageObject.unshift(mainTrue[0]);

          this.assormentsArray.push({
            imageObject,
            amTitle: item.data.title.am,
            enTitle: item.data.title.en,
            amDescription: item.data.description.am,
            enDescription: item.data.description.en,
            price: item.data.price,
            selected : false,
          });
        });
      });
  }
}

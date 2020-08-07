import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { NgImageSliderComponent } from 'ng-image-slider';
import { AngularFirestore } from '@angular/fire/firestore';
export interface Item {
  url: string;
}
@Component({
  selector: 'jungle-slilder',
  templateUrl: './slilder.component.html',
  styleUrls: ['./slilder.component.scss'],
})
export class SlilderComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;

  imageObject: Array<{ thumbImage: string; alt: string }> = [];
  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.getSliderImagesUrl('slider-img');
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

  getSliderImagesUrl(path: string) {
    this.afs
      .collection<Item>(path)
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
        res.forEach((item) => {
          this.imageObject.push({
            thumbImage: item.url,
            alt: item.id,
          });
        });
      });
  }
}

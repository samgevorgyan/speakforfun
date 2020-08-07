import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './admin.service';
import { finalize } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { strict } from 'assert';
import { AssortmentsInterface } from 'src/app/models/assortments.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'jungle-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  sliderImageUrls$: Observable<Array<{ id: string; url: string }>>;
  aboutmeImageUrl$: Observable<any>;

  assortments$: Observable<Array<AssortmentsInterface>>;
  subscription = new Subscription();
  addNewAssortment: AssortmentsInterface;
  newAssortmentsImagesArray: Array<any>;
  amTitile: string = '';
  enTitile: string = '';
  enDescription: string = '';
  amDescription: string = '';
  amAboutme: string = '';
  enAboutme: string = '';
  price: string = '';
  idForUpdate: string | null = null;
  idForAboutMeUpdate: string | null = null;

  assortmentUploadInput: any;

  constructor(
    public adminService: AdminService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getSliderImages('slider-img');
    this.getAboutMeImages('aboutme-img');
    this.getAboutMeTexts('about-me');
    this.getAssortments('assortments');
  }

  getSliderImages(path: string) {
    this.sliderImageUrls$ = this.adminService.getCollectionFromDb(path);
  }
  getAboutMeImages(path: string) {
    this.aboutmeImageUrl$ = this.adminService.getCollectionFromDb(path);
  }
  getAboutMeTexts(path: string) {
    this.adminService.getCollectionFromDb(path).subscribe((res) => {
      console.log('res', res);
      this.amAboutme = res[0]['data'].aboutme.am;
      this.enAboutme = res[0]['data'].aboutme.en;
      this.idForAboutMeUpdate = res[0]['id'];
      console.log('amAboutme', this.amAboutme);
      console.log('enAboutme', this.enAboutme);
      console.log('idForAboutMeUpdate', this.idForAboutMeUpdate);
    });
  }
  getAssortments(path: string) {
    this.assortments$ = this.adminService.getCollectionFromDb(path);
  }

  deleteFromSlider(id: string, path: string, url: string) {
    this.adminService.deleteFromStorageBase(id, path, url).then((res) => {
      console.log('resssssssss', res);
    });
  }

  uploadFile(event: any, path: string, save: boolean) {
    const file = event.target.files[0];
    this.adminService.uploadFile(file, path, save);
  }

  uploadAssortmentFiles(event: any, path: string, save: boolean) {
    Array.from(event.target.files).forEach((file: File) => {
      this.adminService.uploadFile(file, path, save);
    });
  }

  saveAboutme() {
    const data = {
      aboutme: {
        am: this.amAboutme,
        en: this.enAboutme,
      },
    };
    if (this.idForAboutMeUpdate !== null) {
      const path = `about-me/${this.idForAboutMeUpdate}`;

      this.adminService.setToDataBaseDocument(data, path);
    } else {
      this.adminService.setToDataBase(data, 'about-me', 'data');
    }
  }
  addNewAssortmentFunc() {
    if (
      this.amTitile === '' ||
      this.enTitile === '' ||
      this.enDescription === '' ||
      this.amDescription === '' ||
      this.price === ''
    ) {
      return false;
    }
    this.addNewAssortment = {
      title: {
        am: this.amTitile ? this.amTitile : '',
        en: this.enTitile ? this.enTitile : '',
      },
      description: {
        am: this.amDescription,
        en: this.enDescription,
      },
      price: this.price,
      urls: this.adminService.tempUrls,
    };
    if (this.idForUpdate === null) {
      this.adminService.setToDataBase(
        this.addNewAssortment,
        'assortments',
        'data'
      );
    } else {
      this.adminService.setToDataBaseDocument(
        this.addNewAssortment,
        'assortments/' + this.idForUpdate
      );
    }

    this.resetForm();
  }
  resetForm() {
    this.amTitile = '';
    this.enTitile = '';
    this.amDescription = '';
    this.enDescription = '';
    this.price = '';
    this.adminService.tempUrls = [];
    this.idForUpdate = null;
    this.assortmentUploadInput = '';
  }
  makeMainImage(i: number) {
    this.adminService.tempUrls.forEach((item) => {
      item.main = false;
    });
    this.adminService.tempUrls[i].main = true;
  }

  editAssortment(item: any, el: HTMLElement) {
    this.amTitile = item.data.title.am;
    this.enTitile = item.data.title.en;
    this.amDescription = item.data.description.am;
    this.enDescription = item.data.description.en;
    this.price = item.data.price;
    this.adminService.tempUrls = item.data.urls;
    this.idForUpdate = item.id;
    el.scrollIntoView();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

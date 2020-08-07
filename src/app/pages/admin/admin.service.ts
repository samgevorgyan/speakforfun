import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  tempUrls: Array<{ main: boolean; url: string }> = [];
  isLogedin = false;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  uploadFile(file: File, path: string, save: boolean) {
    const filePath = `${path}/${new Date().getTime()}_${file.name} `;
    const ref = this.storage.ref(filePath);
    console.log('ref', ref);
    const task = ref.put(file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            if (save) {
              this.setToDataBase(url, path);
            } else {
              if (this.tempUrls.length === 0) {
                this.tempUrls.push({ main: true, url });
              } else {
                this.tempUrls.push({ main: false, url });
              }
            }
          });
        })
      )
      .subscribe();
  }

  setToDataBase(data: any, path: string, key: string = 'url') {
    this.afs.collection<any>(path).add({ [key]: data });
  }

  setToDataBaseDocument(data: any, path: string) {
    this.afs.doc<any>(path).update({ data });
  }

  getCollectionFromDb(path: string) {
    return this.afs
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
      );
  }

  deleteSliderImgUrl(id: string, path: string) {
    this.afs.doc(path + '/' + id).delete();
  }

  deleteAssortImgUrl(url: string) {
    this.tempUrls = this.tempUrls.filter((item) => item.url !== url);
  }
  async deleteFromStorageBase(id: string, path: string, url: string) {
    await this.storage.storage
      .ref(path)
      .storage.refFromURL(url)
      .delete()
      .then(() => {
        if (id === '') {
          this.deleteAssortImgUrl(url);
        } else {
          this.deleteSliderImgUrl(id, path);
        }
      });
  }
}

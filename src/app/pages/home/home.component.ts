import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('this.route   ', this.route);
    // this.router.navigate(['../../admin'], { relativeTo: this.route });
  }
}

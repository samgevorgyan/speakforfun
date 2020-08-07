import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jungle-order-cake',
  templateUrl: './order-cake.component.html',
  styleUrls: ['./order-cake.component.scss'],
})
export class OrderCakeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get isMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}

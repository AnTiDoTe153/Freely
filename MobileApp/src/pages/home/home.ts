import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private imageSrc: string;
  constructor(public navCtrl: NavController) {

  }
}

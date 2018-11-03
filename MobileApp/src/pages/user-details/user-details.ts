import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  userName: string = "Lorina Dundau";
  description: string = "Lorem ipsum dolor sit amet";
  email: string = "lorina.dundau@gmail.com";
  phone: string = "0745048848";
  rating: string = "4.3";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  onEdit(){

  }
}

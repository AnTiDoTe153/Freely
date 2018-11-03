import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrganizationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-organization-details',
  templateUrl: 'organization-details.html',
})
export class OrganizationDetailsPage {


  organizationName: string = "HackTM";
  description: string = "Lorem ipsum dolor sit amet";
  email: string = "hackTM@gmail.com";
  phone: string = "0745048848";
  website: string = "http://www.hackTM.com";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationDetailsPage');
  }

}

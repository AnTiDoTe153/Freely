import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventOrganizationDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-organization-description',
  templateUrl: 'event-organization-description.html',
})
export class EventOrganizationDescriptionPage {

  private event: any = this.navParams.data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventOrganizationDescriptionPage');
  }

  getItemImage(){
    if(this.event.name == "DreamArt Festival"){
      return "assets/imgs/1.jpg";
    }
    if(this.event.name == "Spooky Party"){
      return "assets/imgs/3.jpg";
    }
    if(this.event.name == "Feel The Real Festival"){
      return "assets/imgs/2.jpg";
    }
  }

}

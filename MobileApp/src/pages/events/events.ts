import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  private eventList: Array<any> = [{
    name: 'HackTM',
    date: "12 Dec 2018"
  },{
    name: 'HackTM',
    date: "12 Dec 2018"
  },{
    name: 'HackTM',
    date: "12 Dec 2018"
  },{
    name: 'HackTM',
    date: "12 Dec 2018"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}

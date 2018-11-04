import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateEventPage } from '../../pages/create-event/create-event';
import { ModalController } from 'ionic-angular';
import { EventManagementPage } from '../event-management/event-management';

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
    name: 'DreamArt Festival',
    date: "12 Dec 2018"
  },{
    name: 'Spooky Party',
    date: "28 Nov 2018"
  },{
    name: 'Feel The Real Festival',
    date: "02 Ian 2019"
  }];

  constructor(private modalController: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  getItemImage(item){
    if(item.name == "DreamArt Festival"){
      return "assets/imgs/1.jpg";
    }
    if(item.name == "Spooky Party"){
      return "assets/imgs/3.jpg";
    }
    if(item.name == "Feel The Real Festival"){
      return "assets/imgs/2.jpg";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  openCreateEventModal(){
    let modal = this.modalController.create(CreateEventPage);
    modal.present();
  }

  goToEventDetails(event: any){
    this.navCtrl.setRoot(EventManagementPage, {event: event});
  }

}

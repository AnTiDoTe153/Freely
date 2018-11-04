import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventParticipantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-participants',
  templateUrl: 'event-participants.html',
})
export class EventParticipantsPage {

  private event = this.navParams.data;

  private applicationList: Array<any> =[{
    name: "Calin",
    surname: "Sulea",
    rating: 3.4,
    status: "applied"
  },{
    name: "Flavius",
    surname: "Filipas",
    rating: 2.3,
    status: "accepted"
  },
  {
    name: "Calina",
    surname: "Antal",
    rating: 4.2,
    status: "accepted"
  },
  {
    name: "Serban",
    surname: "Solomon",
    rating: 1.0,
    status: "applied"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventParticipantsPage');
  }

  acceptUser(item){
    console.log(item);
    item.status = "accepted";
  }

  getItemColor(item){
    if(item.status == "applied"){
      return "third";
    }else{
      return "secondary";
    }
  }

}

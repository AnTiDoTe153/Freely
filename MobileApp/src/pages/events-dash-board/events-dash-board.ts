import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';

/**
 * Generated class for the EventsDashBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events-dash-board',
  templateUrl: 'events-dash-board.html',
})
export class EventsDashBoardPage {

  private eventsList: Array<any>;
  private currentEvent: any;

  constructor(public eventsProvider: EventsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.eventsProvider.getEvents().then(data=>{
      this.eventsList = data;
      this.currentEvent = this.eventsList[0];
    });
  }

}

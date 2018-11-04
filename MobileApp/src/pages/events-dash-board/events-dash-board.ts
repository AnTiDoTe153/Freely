import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

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

  @ViewChild(Slides) slides: Slides;
  private eventsList: Array<any>;
  private currentEvent: any = {
    name: "Dream festival",
    description: "test",
    date: "4 - 7 nov 2018"
  };

  constructor(public eventsProvider: EventsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  onClickEvent(type: string){
    if(type == "decline"){

    }else if(type == "apply"){

    }else{

    }

    var current = this.slides.getActiveIndex();
    this.slides.slideTo(current - 1, 500);
  }

  ionViewDidLoad() {
    this.eventsProvider.getEvents().then(data=>{
      this.eventsList = data;
      //this.currentEvent = this.eventsList[0];
    });
  }

}

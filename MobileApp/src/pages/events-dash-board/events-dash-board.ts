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
  private eventsList: Array<any> = [ {
    name: "DreamArt Festival",
    description: "Dreaming",
    date: "12 Dec 2018"
  },
  {
    name: "Spooky Party",
    description: "Spooky",
    date: "28 Nov 2018"
  },
  {
    name: "Feel The Real Festival",
    description: "Real",
    date: "02 Ian 2019"
  }];

  private currentEvent: any = {
    name: "Dream festival",
    description: "test",
    date: "4 - 7 nov 2018"
  };

  constructor(public eventsProvider: EventsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  getImagePicture(item){
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
      //this.eventsList = data;
      //this.currentEvent = this.eventsList[0];
    });
  }

}

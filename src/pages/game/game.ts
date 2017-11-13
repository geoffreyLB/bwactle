import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import IO from 'socket.io-client';
import { LoginPage } from '../login/login';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage extends LoginPage {
  public map = { 
    row: null,
    line: null
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);

    const username = navParams.get('username');
    const password = navParams.get('password');
    const apiUrl = 'wac.epitech.eu:1337';

  this.map = {
    row : 10, 
    line: 10
  };

   let socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});
   
   socket.on('player/add', function(player) {
      console.log(player)
    }); 
  }
}

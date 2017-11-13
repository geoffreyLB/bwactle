import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import IO from 'socket.io-client';
import {LoginPage} from '../login/login';
import {platformBrowser} from '@angular/platform-browser/src/browser';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({selector: 'page-game', templateUrl: 'game.html'})

export class GamePage extends LoginPage {

  public row = [];
  public col = [];
  public limitRow = 20;
  public limitCol = 20;
  public player;
  public currentPlayer;

  constructor(public navCtrl : NavController, public navParams : NavParams) {
    super(navCtrl);
    const that = this;

    const username = navParams.get('username');
    const password = navParams.get('password');
    const apiUrl = 'wac.epitech.eu:1337';

    for (var i = 0; i <= this.limitRow; i++) {
      this
        .row
        .push(i);
    }

    for (var j = 0; j <= this.limitCol; j++) {
      this
        .col
        .push(j);
    }

    let socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});

    socket.on('player/add', function (player) {
      if (player.login === username) {
          that.getPlayer(player);
      }
    });
  }

  getPlayer(player: string) {
    this.currentPlayer = player;
  }

}

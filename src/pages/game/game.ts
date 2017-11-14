import {Component, HostListener} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import IO from 'socket.io-client';
import {LoginPage} from '../login/login';

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
  public limitRow = 40;
  public limitCol = 40;
  public players;
  public currentPlayer;
  public playerPositionX;
  public playerPositionY;
  public playerLife;
  public arrayPlayers = [];
  public socket;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event)
  }

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

    this.socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});

    this.socket.on('player/add', function (player) {
      that.displayPlayers(player);
      if (player.login === username) {
        that.getPlayer(player);
      }
    });
  }

  getPlayer(player : {
    login: string,
    x: number,
    y: number
  }) {
   this.playerPositionX = player.x;
   this.playerPositionY = player.y;
   
  }

  displayPlayers(player) {
    this.arrayPlayers.push(player)
    this.players = player;
    const that = this;
    console.log( this.arrayPlayers)

    this.socket.on('player/move', function(players) {
      console.log(players)
        that.arrayPlayers.push(players)
    });

  }

}

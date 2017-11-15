import { Component, HostListener } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import IO from 'socket.io-client';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({selector: 'page-game', templateUrl: 'game.html'})

export class GamePage extends LoginPage {

  public players = {};
  public playerPositionX;
  public playerPositionY;
  public playerLogin;
  public playerLife;
  public socket;
  public Object = Object;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let direction;

    switch (event.which) {
      case 113: 
        direction = "left";
        break;
      case 122: 
        direction = "up";
        break;
      case 100: 
        direction = "right";
        break;
      case 115: 
        direction = "down";
        break;
      default:
        return;
    }
    this.newDirection(direction);
}

newMove(direction) {
 
}

  constructor(public navCtrl : NavController, public navParams : NavParams) {
    super(navCtrl);
    
    const that = this;
    const username = navParams.get('username');
    const password = navParams.get('password');
    const apiUrl = 'wac.epitech.eu:1337';
      
    this.socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});
    
    this.socket.on('player/move', function (player) {
        that.players[player.login].x = player.x;
        that.players[player.login].y = player.y;
      });

    this.socket.on('player/add', function (player) {
        that.players[player.login] = player;
        if (player.login === username) {
          that.currentPlayer(player);
        }
      });
  }

  currentPlayer(player : { login: string, x: number, y: number}) {
    this.playerPositionX = player.x;
    this.playerPositionY = player.y;
    this.playerLogin = player.login;
  }

  newDirection(direction: string) {
    const that = this;

    this.socket.emit('move', direction);

    this.socket.on('player/move', function(player) {
     if (player.login === 'MrPink') {
      that.currentPlayer(player)
     }
    });
  }

}

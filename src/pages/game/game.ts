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
  public items = {};
  public lastDirection;
  public item;
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
      case 102:
        this.pickItem();
      case 101: 
        this.attackEnnemie(this.lastDirection);
      case 105:
        this.equipItem()
      default:
        return;
    }
    this.newDirection(direction);
}
  constructor(public navCtrl : NavController, public navParams : NavParams) {
    super(navCtrl);
    
    const that = this;
    const username = navParams.get('username');
    const password = navParams.get('password');
    const apiUrl = 'wac.epitech.eu:1337';
      
    this.socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});

    this.socket.on('msg', function(message) {
      console.log('message =>', message)
    });
    
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

      this.socket.on('player/remove', function(player_id) {
        console.log('disconnect', player_id)
        delete that.players[player_id];
      });

      this.socket.on('item/add', function(item) {
        that.items[item.name] = item;
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
    return this.lastDirection = direction;
  }

  attackEnnemie(direction: string) {
    const that = this;

    this.socket.emit('attack', direction)
    this.socket.on('player/hurt', function(player) {
      console.log(player)
      that.players[player.login] = player;
    });
  }

  pickItem() {
    const that = this;
    this.socket.emit('pick') 
    this.socket.on('inventory/add', function(item) {
      console.log('pick item =>', item)
      that.item = item;
    })
  }

  equipItem() {
    const that = this;
    if (this.item) {
      console.log(this.item)
      this.socket.emit('equip', that.item.id)
    }
  }

}

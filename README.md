# Bwactle

## WacBattle API
Can be found here: http://wac.epitech.eu:1337

## protocol:
Built on top of socket.io

## Ionic 3:
***Launch frontend***
```sh
ionic serve
```

## Connecting to the API:

**You have to send a login and a password in the connection query. If the account doesn't exist, it will be automatically created.**

```sh
let username = 'example';
let password = 'example';
let apiUrl = 'wac.epitech.eu:1337';
let socket = IO(apiURL, {query: `login=${username}&pwd=${password}`});
Things you can send to the api:

socket.emit('drop', item_id) Drop item from inventory onto the ground
socket.emit('equip', item_id) Equip a weapon from inventory
socket.emit('attack', direction) Attack with equipped weapon
socket.emit('unequip') Remove equipement
socket.emit('pick') Remove item from ground and put it in inventory
socket.emit('move', direction) Move in a direction
socket.emit('rotate', direction) Rotate in a direction
'socket.emit('cast', {item_id, direction})' Attack with given spell

Parameters are: item_id: The id of the item.
direction: A string, can be one of these: ['up', 'down', 'left', 'right'].
```

## Things the api can send to you:
```sh
socket.on('msg', function(message) {}); Various information to help you identify errors
socket.on('player/add', function(player) {}); A player join the map
socket.on('player/remove', function(player_id) {}); A player quit the map
socket.on('player/experience', function(player) {}); A player xp level change
socket.on('player/level', function(player) {}); A player level change, That may impact lvl, xpLvl, life, lifeMax
socket.on('player/hurt', function(player) {}); A player loose life
socket.on('player/rotation', function(player) {}); A player rotation change
socket.on('player/move', function(player) {}); A player move
socket.on('item/add', function(item) {}); An item appear on the map
socket.on('item/remove', function(item_id) {}); An item is removed from the map
socket.on('inventory/update', function(item) {}); Update informations about an item in yout inventory
socket.on('inventory/add', function(item) {}); An item is added to your inventory
socket.on('inveotory/remove', function(item_id) {}); An item is removed from your inventory
socket.on('equipement/set', function(item) {}); Set a item as your current equipment
socket.on('equipement/unset', function() {}); Remove your current equipement
socket.on('configuration', function(configuration) {}); Set multiple parameter for the game
socket.on('attacks', function(attacks) {}); Set part of the map as being under attack
Parameters are:
```

message An object of the form {type, content}, where type is an integer: 0 for simple message, 1 for failure from the API, 2 for errors, 3 for fatal errors

player An object of the form {id, login, rot, lvl, xp, xpLvl, life, lifeMax, x, y}

player_id An id that match an id from a player object

item An object of the form {x, y, id, name, description, dmg, type} where type is one of thses: ['spell', 'weapon']

item_id An id that match an id from a item object

configuration An object of the form {mapSizeX, mapSizeY, inventorySize}, where mapSizeX, mapSizeY and inventorySize are integer.

If you're lazy , the default configuration is a map of 40x40 and an inventory size is 3.
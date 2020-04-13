import fs from 'fs';
import * as alt from 'alt';
import { config } from './config.mjs';

alt.on('playerConnect', (player) => {
  if (!config.enabled) return;
  alt.emitClient(player, 'PlayerId', config.method);
});

alt.onClient('PlayerIdReady', (player, id) => {
  fs.readFile('./resources/altv-whitelist/server/whitelist.json', function (err, data) {
    // you might want to use "path" here ^
    if (err) throw err;

    let whitelist = JSON.parse(data);
    let isWhitelisted = whitelist.find((wl) => wl.discord === id);
    if (!isWhitelisted) {
      player.kick();
      return;
    }
    alt.log(`[Whitelist] ${player.name} is trying to connect (${config.method} : ${id})`);
    //whitelisted, now do whatever you want
    //and if somehow discord is down
    // you can use licensehash
    // just edit config.mjs line 3
  });
});

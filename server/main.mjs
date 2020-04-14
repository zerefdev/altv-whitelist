import fs from 'fs';
import util from 'util';
import * as alt from 'alt';
import { config } from './config.mjs';

const readFile = util.promisify(fs.readFile);

alt.on('playerConnect', (player) => {
  if (!config.enabled) return;
  alt.emitClient(player, 'PlayerId');
});

alt.onClient('PlayerIdReady', async (player, data) => {
  const id = config.method == 'discord' ? data.discord : data.license;
  const whitelist = JSON.parse(await readFile('./resources/whitelist/server/whitelist.json'));

  let isWhitelisted = whitelist.find((wl) => wl[config.method] === id);
  if (!isWhitelisted) {
    alt.log(`[Not Whitelisted] ${player.name} is trying to connect (${config.method} : ${id})`);
    player.kick();
    return;
  }
  alt.log(`[Whitelisted] ${player.name} is trying to connect (${config.method} : ${id})`);
  alt.emit('playerConnectSuccess', player, data, config.method);
});

import * as alt from 'alt';
import * as chat from 'chat';
import ConnectionInfo from '../../database/database';

const db = new ConnectionInfo();

alt.on('playerConnect', (player) => {
  checkWhitelist(player);
});

function checkWhitelist(player) {
  const name = player.name;
  const socialId = player.socialId;

  db.fetchData('id', socialId, 'whitelist')
    .then((res) => {
      if (!res) {
        alt.log(`${name} connected (not whitelisted) | ID: ${socialId}`);
        player.kick();
        return;
      }
      chat.send(player, 'You have been connected.');
      alt.log(`${name} connected (whitelisted) | ID: ${socialId}`);
    })
    .catch((err) => console.log(err));
}

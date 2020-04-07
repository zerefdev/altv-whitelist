import * as chat from 'chat';
import ConnectionInfo from '../../database/database';
const db = new ConnectionInfo();
const wlObjId = 'READ COMMENT';
// get this from the whitelist collection,
// if you are using the wrapper snippet I provided,
// you will find it in the console after you start
// the server/(database.mjs) for the first time

chat.registerCmd('wladd', (player, args) => {
  add(player, args);
});

chat.registerCmd('wlremove', (player, args) => {
  remove(player, args);
});

function add(player, args) {
  if (!args.length == 0) {
    const id = args[0];
    db.fetchData('id', id, 'whitelist')
      .then((res) => {
        if (res) {
          chat.send(player, 'Already Whitelisted');
          return;
        }
        db.pushOne(wlObjId, id, 'whitelist');
      })
      .catch((err) => console.log(err));
  } else {
    chat.send(player, 'Usage: /wladd socialId');
  }
}

function remove(player, args) {
  if (!args.length == 0) {
    const id = args[0];
    db.fetchData('id', id, 'whitelist')
      .then((res) => {
        if (!res) {
          chat.send(player, 'Not Whitelisted');
          return;
        }
        db.pullOne(wlObjId, id, 'whitelist');
      })
      .catch((err) => console.log(err));
  } else {
    chat.send(player, 'Usage: /wlremove socialId');
  }
}

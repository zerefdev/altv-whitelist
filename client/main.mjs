import * as alt from 'alt';

alt.onServer('PlayerId', (method) => {
  switch (method) {
    case 'discord':
      alt.emitServer('PlayerIdReady', alt.Discord.currentUser.id);
      break;
    case 'license':
      alt.emitServer('PlayerIdReady', alt.getLicenseHash());
      break;
  }
});

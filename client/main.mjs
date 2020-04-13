import * as alt from 'alt';

alt.onServer('PlayerId', (method) => {
  const discord = alt.Discord.currentUser.id;
  const license = alt.getLicenseHash();
  switch (method) {
    case 'discord':
      alt.emitServer('PlayerIdReady', discord);
      break;
    case 'license':
      alt.emitServer('PlayerIdReady', license);
      break;
  }
  // player info printed to the console
  alt.log(`Your Information:\nDiscord: ${discord}\nLicense: ${license}`);
});

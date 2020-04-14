import * as alt from 'alt';

alt.onServer('PlayerId', () => {
  const id = {
    discord: alt.Discord.currentUser.id,
    license: alt.getLicenseHash()
  };

  alt.emitServer('PlayerIdReady', id);

  // player info printed to the console
  alt.log(`Your Information:\nDiscord: ${id.discord}\nLicense: ${id.license}`);
});

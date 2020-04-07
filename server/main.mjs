import * as alt from 'alt';
import ConnectionInfo from '../../database/database';

alt.on('database:ready', () => {
  import('./events/playerConnect');
  import('./commands/whitelist');
});

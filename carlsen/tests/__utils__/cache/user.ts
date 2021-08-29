import { initClient, connectWait, disconnectWait } from '../client.utils';

async function clear() {
  const cacheClient = initClient();
  cacheClient.auth = { username: 'clear-cache' };
  await connectWait(cacheClient).catch(() => ({}));
  if (cacheClient.connected) await disconnectWait(cacheClient);
}

export default { clear };

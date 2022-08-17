import { load as loadDependencies } from './dependencies';
import { init as initServer } from './infra/http/server';

const deps = loadDependencies();

const server = initServer(deps);
server.listen({ port: 3030 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});

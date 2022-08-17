import Fastify from 'fastify';
import { Dependencies } from '../../dependencies';
import { init as initEventMap } from '../events/eventMap';

interface CreateUserBody {
  username?: string;
  email?: string;
}

export const init = (deps: Dependencies) => {
  const { createUser } = deps;
  initEventMap(deps);

  const fastify = Fastify({
    logger: true,
  });

  fastify.post<{ Body: CreateUserBody }>('/users', async (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
      res.code(400).send({ message: 'username or email is missing' });
      return;
    }

    const user = await createUser.execute({ username, email });

    res.send({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  });

  return fastify;
};

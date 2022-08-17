import { Dependencies } from '../../dependencies';
import { UserCreated } from '../../events/UserCreated';

export const init = (deps: Dependencies) => {
  const { sendWelcomeMail, eventBus } = deps;

  eventBus.subscribe(UserCreated, async ({ user }) => {
    await sendWelcomeMail.execute({ user });
  });
};

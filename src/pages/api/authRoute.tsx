import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(function AuthRoute(req, res) {
  const session = getSession(req, res);
  if (session) {
    const { user } = session;
    // User is authenticated
    console.log(user);
  }
});

// JWT is our primary identification mechanism
import * as jwt from 'jsonwebtoken';

// used to validate incoming Google profiles from client
import { OAuth2Client } from 'google-auth-library';

// we depend on both OAUTH_CLIENT_ID and a SECURE
// HMAC which is used to sign our tokens
//
// THE HMAC CANNOT BE LEAKED!!!!!!!!!!!!!!
const {
  REACT_APP_OAUTH_CLIENT_ID,
  JWT_HMAC_KEY,
  REACT_APP_VALID_HOSTED_DOMAIN,
} = process.env;

const client = new OAuth2Client(REACT_APP_OAUTH_CLIENT_ID);

/**
 * Makes the necessary requests to Google auth servers
 * to verify that the client user is actually who they
 * say they are.
 *
 * @param { string } token - idToken returned by clientside auth
 */
async function verifyGoogleUser(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: REACT_APP_OAUTH_CLIENT_ID,
  });
  return ticket.getPayload();
}

/**
 * Authenticates a Google user whose token was returned
 * from the client-side Google authentication flow. Assuming
 * the user is valid, a side-wide JWT will be returned for
 * future identification.
 *
 * @param { string } googleToken - googleToken returned by clientside auth
 *
 * @return { string } - site-wide JWT that allows future access
 */
/* @expose */
export async function authenticateUser(googleToken) {
  const payload = await verifyGoogleUser(googleToken);
  const { hd } = payload;
  if (hd === REACT_APP_VALID_HOSTED_DOMAIN) {
    // store some basic (unreliable) profile information in the token
    return jwt.sign({
      name: payload.name,
      email: payload.email,
    }, JWT_HMAC_KEY);
  } else {
    // TODO: Format error to meet specification defined in contentBackend
    throw new Error(`User cannot be authenticated, ${hd} is not a valid host domain`);
  }
}

// validates a JWT by decoding it with the HMAC secret
export async function validateJWT(token) {
  // this will throw if verification fails
  jwt.verify(token, JWT_HMAC_KEY);
  return token;
}

import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
// import { SignJWT } from 'jose';

// const Side = 'https://dev.tracki.com';

// --kid, --key_id        The key id of the private key
//     --iss, --team_id       The Apple team ID
//     --private_key          The private key to use to sign the JWT. (Starts with -----BEGIN PRIVATE KEY-----)
//     --sub, --client_id     The client id to use in the JWT.
//     --expires_in           Number of seconds from now when the JWT should expire. Defaults to 6 months.
//     --exp                  Future date in seconds when the JWT expires

// const iss = process.env.NEXT_PUBLIC_APPLE_TEAM_ID;
// const sub = process.env.NEXT_PUBLIC_APPLE_ID;
// const kid = process.env.NEXT_PUBLIC_APPLE_KEY_ID;
// const expiresIn = 86400 * 180;
// const exp = Math.ceil(Date.now() / 1000) + expiresIn;

const options = {
  // site: 'https://25dda1de678d.ngrok.io',
  providers: [
    // {
    //   id: 'tracki',
    //   name: 'Tracki',
    //   type: 'oauth',
    //   version: '2.0',
    //   scope: 'settings devices geozones locations accounts notifications',
    //   clientId: '26886fb0-b7e0-44dd-acf0-d0a116c3a0e3',
    //   clientSecret: '67e2b1c92bb5877ccb1286ef949531a2',
    //   authorizationUrl:
    //     'https://legacy-app.trackimo.com/api/v3/ns/oauth2/auth?response_type=code',
    //   accessTokenUrl: 'https://legacy-app.trackimo.com/api/v3/oauth2/token',
    //   profileUrl: 'https://legacy-app.trackimo.com/api/v3/user',
    // },
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET,
    }),
    AppleProvider({
      clientId: 'com.trackimo.trackiios',
      clientSecret:
        'eyJraWQiOiIzWDk5Sjk4VEg2IiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJMVFdQNTVNTDkyIiwiaWF0IjoxNjQ5OTYwODY1LCJleHAiOjE2NjU1MTI4NjUsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20udHJhY2tpbW8udHJhY2tpaW9zIn0.G8eXwOmEX-QJMc_HLQGmpbqXpuZfJMyK1K2A86_jWdJK5G3sjd-7p_oj0ok9YPW6Tj8zLsrczUkMgZsYWR0YzA',
    }),
  ],
  // The 'database' option should be a connection string or TypeORM
  // configuration object https://typeorm.io/#/connection-options
  //
  // Notes:
  // * You need to install an appropriate node_module for your database!
  // * The email sign in provider requires a database but OAuth providers do not
  database: process.env.DATABASE_URL,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
  },

  // JSON Web Token options
  jwt: {},

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  pages: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('xxxxx');
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(
        '🚀 ~ file: [...nextauth].js ~ line 78 ~ redirect ~ url',
        url
      );
      console.log(
        '🚀 ~ file: [...nextauth].js ~ line 78 ~ redirect ~ baseUrl',
        baseUrl
      );
      return baseUrl;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
  // Additional options
  secret: process.env.SECRET || '123456789ABCDEF', // Recommended (but auto-generated if not specified)
  debug: true, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.VERCEL_URL,
  providers: [
    // Providers.Email({
    //   // SMTP connection string or nodemailer configuration object https://nodemailer.com/
    //   server: process.env.EMAIL_SERVER,
    //   // Email services often only allow sending email from a valid/verified address
    //   from: process.env.EMAIL_FROM,
    // }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
    {
      id: 'tracki',
      name: 'Tracki',
      type: 'oauth',
      version: '2.0',
      scope: 'settings devices geozones locations accounts notifications',
      clientId: '26886fb0-b7e0-44dd-acf0-d0a116c3a0e3',
      clientSecret: '67e2b1c92bb5877ccb1286ef949531a2',
      authorizationUrl:
        'https://legacy-app.trackimo.com/api/v3/ns/oauth2/auth?response_type=code',
      accessTokenUrl: 'https://legacy-app.trackimo.com/api/v3/oauth2/token',
      profileUrl: 'https://legacy-app.trackimo.com/api/v3/user',
    },
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Facebook({
      clientId: '259417625433991',
      clientSecret: '5e984f1c1f1fde7f7773a953587216db',
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
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
    // Easily add custom properties to response from `/api/auth/session`.
    // Note: This should not return any sensitive information.
    /*
    get: async (session) => {
      session.customSessionProperty = "ABC123"
      return session
    }
    */
  },

  // JSON Web Token options
  jwt: {
    secret: process.env.SECRET, // Recommended (but auto-generated if not specified)
    // Custom encode/decode functions for signing + encryption can be specified.
    // if you want to override what is in the JWT or how it is signed.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
    // Easily add custom to the JWT. It is updated every time it is accessed.
    // This is encrypted and signed by default and may contain sensitive information
    // as long as a reasonable secret is defined.
    signingKey: { kty: 'oct', kid: '--', alg: 'HS256', k: '--' },
    verificationOptions: {
      algorithms: ['HS256'],
    },
    encryption: true,
    // set: async token => {
    //   token.customJwtProperty = 'ABC123';
    //   return token;
    // },
  },

  // Control which users / accounts can sign in
  // You can use this option in conjuction with OAuth and JWT to control which
  // accounts can sign in without having to use a database.
  allowSignin: async (user, account) => {
    // Return true if user / account is allowed to sign in.
    // Return false to display an access denied message.
    return true;
  },

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  pages: {
    // signin: '/login', // Displays signin buttons
    // signout: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {},
    async session(session, token) {
      session.accessToken = token.account;
      return session;
    },
    async jwt(token, isNewUser) {
      return token;
    },
  },
  // Additional options
  secret: process.env.SECRET, // Recommended (but auto-generated if not specified)
  debug: true, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

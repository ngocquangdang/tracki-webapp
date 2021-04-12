import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// const Side = 'https://ac17b106b94b.ngrok.io';
// const Side = 'https://dev.tracki.com';

const options = {
  // site: 'https://25dda1de678d.ngrok.io',
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
      clientId:
        '146989380702-1vbclr1869p70ec0veqf4b62jj93cuhp.apps.googleusercontent.com',
      clientSecret: 'IkrCgkp9P0t1Qf6qpAHbZcmK',
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      idToken: true,
      profile: profile => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google',
        };
      },
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
  },

  // JSON Web Token options
  jwt: {
    // secret: process.env.SECRET, // Recommended (but auto-generated if not specified)
    // encryption: true,
    // signingKey: process.env.JWT_SIGNING_KEY,
    // encryptionKey: process.env.JWT_ENCRYPTION_KEY,
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
  pages: {},
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    // async redirect(url, baseUrl) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async session(session, token) {
      session.accessToken = token.account;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser, idToken) {
      console.log(
        '🚀 ~ file: [...nextauth].js ~ line 116 ~ jwt ~ idToken',
        idToken
      );
      return token;
    },
  },
  // Additional options
  secret: process.env.SECRET, // Recommended (but auto-generated if not specified)
  debug: true, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;

import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await getToken({ req, secret, raw: true });
  console.log("🚀 ~ file: jwt.js ~ line 7 ~ token", token)
  res.send(JSON.stringify(token, null, 2));
};

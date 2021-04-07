import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await getToken({ req, secret, raw: true });
  res.send(JSON.stringify(token, null, 2));
};

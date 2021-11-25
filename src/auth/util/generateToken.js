import jwt from 'jsonwebtoken'
export default (user) => {

  const data = {
    id: user.id,
    email: user.email,
    username: user.username,
    method: user.method
  };
  const signature = 'supersecret';
  const expiration = '20d';

  return jwt.sign({ data, }, signature, { expiresIn: expiration });
}

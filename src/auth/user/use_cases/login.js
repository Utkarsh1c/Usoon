export default ({ repository, argon2, generateJWT }) => {
  async function execute(username, password) {
    const userRecord = await repository.getByEmail(username);
    const userRecord1 = await repository.getByUsername(username);
    if (!userRecord && !userRecord1) {
      throw new Error('Invalid username/email or password')
    }
    const loggedUser = (userRecord)?userRecord:userRecord1;
    if(loggedUser.method)
      throw new Error('Incorrect login method')
    // const loggedUser = userRecord;
    const correctPassword = await argon2.verify(loggedUser.password, password);
    if (!correctPassword) {
      throw new Error('Invalid username/email or password')
    } 

    return {
      user: {
        id: loggedUser.id,
        email: loggedUser.email,
        username: loggedUser.username
      },
      token: generateJWT(loggedUser),
    }
  }

  return { execute }
}
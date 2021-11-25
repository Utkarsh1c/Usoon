export default ({ repository, argon2, makeUser, generateJWT }) => {
  async function execute( username, email, password ) {
    const passwordHashed = await argon2.hash(password);
    console.log(passwordHashed);
    const newUser = makeUser({ username, email, password: passwordHashed });
    console.log(newUser);
    const createdUser = await repository.create(newUser);
    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username
      },
      token: generateJWT(createdUser),
    }
  }

  return { execute }
}
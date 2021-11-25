export default ({ repository, makeUser, generateJWT }) => {
  async function execute(email, method) {
    const userRecord = await repository.getByEmailandMethod(email, method);
    if (userRecord) {
      return {
          isNew: false,
          user: {
            id : userRecord.id,
            email: userRecord.email,
            username: userRecord.username,
            method: userRecord.method
          },
          token: generateJWT(userRecord),
        }
      }
    const newUser = makeUser({ username: email, email, method });
    console.log(newUser);
    const createdUser = await repository.create(newUser);

    return {
        isNew: true,
        user: {
          id: createdUser.id,
          email: createdUser.email,
          username: createdUser.username,
          method: createdUser.method
        },
        token: generateJWT(createdUser),
      }
    }
    return { execute }
  }
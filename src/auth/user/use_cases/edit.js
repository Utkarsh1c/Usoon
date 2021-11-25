export default ({ repository }) => {
    async function execute( userId, username, email ) {

        const data = { username, email };
        const updatedUser = await repository.update(userId, data);
        return {
          id: updatedUser.id,
          email: updatedUser.email,
          username: updatedUser.username
        }
    }
   
    return { execute }
  }
export default ({ repository }) => {
    async function execute( userId ) {
      const accountSettings = await repository.getById(userId);
        return {
          account: accountSettings
        }
    }
  
    return { execute }
  }
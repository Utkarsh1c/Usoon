export default ({ repository }) => {
    async function execute(username, currUsername) {
      const userRecord = await repository.getByUsername(username);
      if ((username !== currUsername) && userRecord) {
        return {
          result: true
        }
      }
  
      return {
        result: false
      }
    }
  
    return { execute }
  }
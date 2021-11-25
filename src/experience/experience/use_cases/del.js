export default ({ repository }) => {
    // delete a particular playlist
    async function execute(id) {
      
      const experience = await repository.deleteById(id);
      return {
        experience: experience
      }
    }
  
    return { execute }
  }
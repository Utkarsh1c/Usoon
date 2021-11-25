export default ({ repository }) => {
    // get playlists data of a particular userId
    async function execute( userId ) {
      const experiences = await repository.getByUserId(userId);
      return {
        experiences: experiences
      }
    }
  
    return { execute }
  }
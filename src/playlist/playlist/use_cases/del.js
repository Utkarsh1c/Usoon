export default ({ repository }) => {
    // delete a particular playlist
    async function execute(id) {
      
      const playlist = await repository.deleteById(id);
      return {
        playlist: playlist
      }
    }
  
    return { execute }
  }
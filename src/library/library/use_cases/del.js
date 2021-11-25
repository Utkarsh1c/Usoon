export default ({ repository }) => {
    // delete a particular playlist
    async function execute(id) {
      
      const book = await repository.deleteById(id);
      return {
        book: book
      }
    }
  
    return { execute }
  }
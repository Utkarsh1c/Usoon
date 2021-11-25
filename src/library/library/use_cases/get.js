export default ({ repository }) => {
  // get playlists data of a particular userId
  async function execute( userId ) {
    const books = await repository.getByUserId(userId);
    return {
      books: books
    }
  }

  return { execute }
}
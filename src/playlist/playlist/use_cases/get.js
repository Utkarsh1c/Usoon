export default ({ repository }) => {
  // get playlists data of a particular userId
  async function execute( userId ) {
    const playlists = await repository.getByUserId(userId);
    return {
      playlists: playlists
    }
  }

  return { execute }
}
export default ({ repository, makePlaylist, getPlaylistData }) => {
  async function execute( userId, playlist_url, platform ) {

  // get data from playlist url
    const data = await getPlaylistData(playlist_url, platform);
    const { name, image_url, no_of_tracks } = data;
    const newPlaylist = makePlaylist({ userId , name, image_url, no_of_tracks, playlist_url, platform});
    console.log(newPlaylist);
    // store data in db
    const playlist = await repository.create(newPlaylist);
    return {
      playlist: playlist
    }
  }

  return { execute }
}
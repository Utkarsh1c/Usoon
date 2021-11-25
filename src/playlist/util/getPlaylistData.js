// axios library to handle requests
import axios from 'axios'
var count = 0;

// to get no of tracks for spotify api
function getArtists(array){
  const data = [];
  array.forEach(track => {
    count++;
    track.track.artists.forEach(artist => {
      data.push(artist.name)
    })
  })
  return data;
}

export default async(playlist_url, platform) => {

  // accessing spotify api
    if(platform == 'spotify'){

        var client_id = process.env.client_id; // client id
        var client_secret = process.env.client_secret; // secret

    // playlist id
    var url = playlist_url.split('/')[4];

    const response = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      // grant type according to flow
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // auth protocols
      auth: {
        username: client_id,
        password: client_secret
      }
    })

      
      if (response.status === 200) {
        // use the access token to access the Spotify Web API
        var token = response.data.access_token;
        // console.log('....', token);
       

        const body = await axios({
          url: `https://api.spotify.com/v1/playlists/${url}`,
          method: 'get',
          // use the token to get playlist data
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })

        // extracting relevant info
          var artists = getArtists(body.data.tracks.items);
          var image_url = body.data.images[0].url;
          var name = body.data.name;
      
          const result = {
            name : name,
            image_url : image_url,
            // artists : artists,  
            no_of_tracks : count
          }
          // console.log(result);
          return result;

        }
    }

    // for youtube api
  else {

  // playlist id
  var url = playlist_url.split('=')[1];

  const youtube_key = process.env.youtube_key;

  // request to youtube api
  const body = await axios({
    url: `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&part=contentDetails&id=${url}&key=${youtube_key}`,
    method: 'get',
    headers: {
      accept: 'application/json'
    }
  })

  // accessing relevant data
  var playlist = body.data.items[0];
  var name = playlist.snippet.title;
  var image_url = playlist.snippet.thumbnails.default.url;
  var no_of_tracks = playlist.contentDetails.itemCount;

  const result = {
    name: name,
    image_url: image_url,
    no_of_tracks: no_of_tracks
  }

  return result;

  }

}

if (process.argv.length < 4){
  console.error('spodl requires 2 arguments. The spotify username and playlist url.');
  process.exit()
}

const username = process.argv[2];
const playlistid = process.argv[3];
const config = require('../config.js');
const SpotifyWebApi = require('spotify-web-api-node');
const YouTube = require('youtube-node');
const fs = require('fs');
const util = require('util');
const exec = require('child_process').exec;
const cmd = process.argv[4] === 'video' ? 'youtube-dl -o "' + playlistid + '/%(title)s.%(ext)s"'  :
  'youtube-dl -o "' + playlistid + '/%(title)s.%(ext)s" --extract-audio --audio-format mp3 ';

const youTube = new YouTube();
youTube.setKey(config.youtube.apikey);

if (!fs.existsSync(playlistid))
  fs.mkdirSync(playlistid);

// helpers
const createSearchTerm = e => e.track.artists[0].name + ': ' + e.track.name;
const search = (data) => data.body.tracks.items.forEach(e=>yt(createSearchTerm(e)))
const createYouTubeId = (result) => result.items[0].id.videoId;
const createYouTubeUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

// callbacks
const ytCb = (err, res) => {
  if (err) console.log(err)
  else {
    let url = createYouTubeUrl(createYouTubeId(res))
    console.log('Youtube url: '+url);
    dl(url);
  }
}

const dlCb = (err, stdout, stderr) => {
  if(error) console.log('exec error: '+error);
  else      util.print('stdout: '+stdout);
}

//Spotify
const spotifyApi = new SpotifyWebApi({
  clientId : config.spotify.clientid,
  clientSecret : config.spotify.clientsecret
});

const getPlaylist = (data) => {
  spotifyApi.setAccessToken(data.body['access_token']);
  spotifyApi.getPlaylist(username, playlistid)
    .then(search)
    .catch(err => console.log('Something went wrong!', err))
}

//Youtube
const yt = (searchTerm) => youTube.search(searchTerm, 1, ytCb);

//Downloading
const dl = (url) => exec(cmd+url, dlCb);

//Run
spotifyApi.clientCredentialsGrant()
  .then(getPlaylist)
  .catch(err=> console.log('Something went wrong when retrieving an access token', err));

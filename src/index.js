if (process.argv.length >= 4){
  var username = process.argv[2];
  var playlistid = process.argv[3];
} else {
  console.error('spodl requires 2 arguments. The spotify username and playlist url.');
}

var config = require('../config.js');
var SpotifyWebApi = require('spotify-web-api-node');
var YouTube = require('youtube-node');
var sys = require('sys');
var exec = require('child_process').exec;
var child;

var fs = require('fs');

if (!fs.existsSync(playlistid)){
  fs.mkdirSync(playlistid);
}

//Spotify

var clientId = config.spotify.clientid,
    clientSecret = config.spotify.clientsecret;

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.getPlaylist(username, playlistid)
    .then(function(data) {
      for(var i = 0; i < data.body.tracks.items.length; i++){
        var searchTerm = data.body.tracks.items[i].track.artists[0].name + ': ' + data.body.tracks.items[i].track.name;
        yt(searchTerm);
      }
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

//Youtube

function yt(searchTerm){
  var youTube = new YouTube();

  youTube.setKey(config.youtube.apikey);
  youTube.search(searchTerm, 1, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      var id = result.items[0].id.videoId
      var url = 'https://www.youtube.com/watch?v='+id;
      console.log('Youtube url: '+url);
      dl(url);
    }
  });
}

//Downloading

function dl(url){
  var command;
  if(process.argv[4] === 'video'){
    command = 'youtube-dl -o "' + playlistid + '/%(title)s.%(ext)s" ';
  } else {
    command = 'youtube-dl -o "' + playlistid + '/%(title)s.%(ext)s" --extract-audio --audio-format mp3 ';
  }
  child = exec(command+url, function(error, stdout, stderr){
    if(error){
      console.log('exec error: '+error);
    } else {
      sys.print('stdout: '+stdout);
    }
  });
}

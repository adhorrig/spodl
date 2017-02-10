#Spodl

A tool which can be ran from the command line to download a Spotify playlist through Youtube, via youtube-dl.

Note: This is for educational purposes and I am not responsible for those who use the tool.

## Installation

```
git clone https://github.com/adhorrig/spodl.git
```

```
cd spodl
```

```
npm install
```

## What you need

1) Spotify client id and secret. (Retreive at: https://developer.spotify.com/)

2) Spotify account name and playlist ID. (Playlist ID is the alphanumeric string following /playlist/)

2) Youtube API Key. (Retreive at: https://console.developers.google.com)

3) Youtube-dl installed on your machine. (Retreive at: https://rg3.github.io/youtube-dl/)

## Running

Open ```config.js``` and substitute in your Spotify clientId and clientSecret, as well as your Youtube API Key. After this you can then run ```node src/index.js spotify_account_name spotify_playlist_id```

For example:

```
node src/index.js adam4543 7KLGqYIgcNeoWepuZ2sjXC
```

This will create a new directory using the playlist id and download all songs from the playlist into that directory.

If you would like to also download the music video, rather than just audio you can include ```video``` at the end of the command.

For example:

```
node src/index.js adam4543 7KLGqYIgcNeoWepuZ2sjXC video
```

If ```video``` is not specified, only the audio will be downloaded.

#Spodl

A tool which can be ran from the command line to download a Spotify playlist through Youtube, via youtube-dl.

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

1) Spotify client id and secret. (Gotten from: https://developer.spotify.com/)

2) Spotify account name and playlist ID. (Playlist ID is the alphanumeric string following /playlist/)

2) Youtube API Key. (Gotten from: https://console.developers.google.com)

3) Youtube-dl installed on your machine. (Gotten from: https://rg3.github.io/youtube-dl/)

## Running

Open ```config.js``` and substitute in your Spotify clientId and clientSecret, as well as your Youtube API Key. After this you can then run ```node src/index.js spotify_account_name spotify_playlist_id``` i.e. ```node src/index.js adam4543 7KLGqYIgcNeoWepuZ2sjXC```. This will download all songs from the playlist to the current directory, as such I'd suggest creating a new directory and running the script from there.

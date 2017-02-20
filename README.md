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

To install spodl globally, run:

```
npm install -g
```


## What you need

1) Spotify client id and secret from [here.](https://developer.spotify.com/)

2) Spotify account name and playlist id. (Playlist id is the alphanumeric string following /playlist/)

3) Youtube API Key from [here.]( https://console.developers.google.com)

4) Youtube-dl installed on your machine from [here.](https://rg3.github.io/youtube-dl/)

## Running

Open ```config.js``` and substitute in your Spotify client id and client secret, as well as your Youtube API Key. 

You can specify the directory you wish to download the playlist to in ```config.js```. For example, ```directory : '~/Music/'```. If the directory is not specified, spodl will download the playlist to the spodl directory.

After this you can then run ```spodl spotify_account_name spotify_playlist_id```

For example:

```
spodl adam4543 7KLGqYIgcNeoWepuZ2sjXC
```

This will create a new directory using the playlist name and download all songs from the playlist into that directory.

If you would like to also download the music video, rather than just audio you can include ```video``` at the end of the command.

For example:

```
spodl adam4543 7KLGqYIgcNeoWepuZ2sjXC video
```

If ```video``` is not specified, only the audio will be downloaded.

## Contributing

Pull requests are happily accepted so feel free to hack away.

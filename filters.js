const spotify = require('spotify-node-applescript');
const util = require('util');

spotify.getState = util.promisify(spotify.getState);
spotify.getTrack = util.promisify(spotify.getTrack);

async function getPlayingTrackFromSpotify() {
  try {
    const {state} = await spotify.getState();
    if (state !== 'playing') return null;
    const {artist, album, name} = await spotify.getTrack();
    return {
      'bgm': `${name} - ${artist}`,
      'bgm:artist': artist,
      'bgm:album': album,
      'bgm:name': name,
      'bgm:player': 'spotify',
    }
  } catch {
    return null;
  }
}

async function bgm() {
  return getPlayingTrackFromSpotify();
}

module.exports = {
  bgm,
};

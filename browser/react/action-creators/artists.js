import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from '../constants.js';
import axios from 'axios';
import {convertAlbums} from '../utils'


export const receiveArtists = (artists) => {
    return {
        type: RECEIVE_ARTISTS,
        artists
    }
}

export const receiveArtist = (artist) => {
    return {
        type: RECEIVE_ARTIST,
        artist
    }
}

export const fetchArtists = function () {
  return function (dispatch, getState) {
    axios.get('/api/artists/')
      .then(res => {
        dispatch(receiveArtists(res.data));
      });
  };
};

export const selectArtist = (artist) => {
    return function (dispatch, getState) {
        Promise.all([
            axios.get(`/api/artists/${artistId}`),
            axios.get(`/api/artists/${artistId}/albums`),
            axios.get(`/api/artists/${artistId}/songs`)
            ])
            .then(res => res.map(r => r.data))
            .then(data => dispatch(receiveArtist(this.onLoadArtist(...data))));
    };
}

export const onLoadArtist = function(artist, albums, songs) {
    songs = songs.map(convertSong);
    albums = convertAlbums(albums);
    artist.albums = albums;
    artist.songs = songs;
    return artist;

//this.setState({ selectedArtist: artist });
}
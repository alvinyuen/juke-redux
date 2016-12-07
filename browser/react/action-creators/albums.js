import { RECEIVE_ALBUM, RECEIVE_ALBUMS } from '../constants.js';
import axios from 'axios';
import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';


export const receiveAlbums = (albums) => {
    return {
        type: RECEIVE_ALBUMS,
        albums
    }
}

export const receiveAlbum = (album) => {
    return {
        type: RECEIVE_ALBUM,
        album
    }
}

export const fetchAlbums = function () {
  return function (dispatch, getState) {
    axios.get('/api/albums/')
      .then(res => {
        dispatch(receiveAlbums(convertAlbums(res.data)));
      });
  };
};

export const selectAlbum = (albumId) => {
    return function (dispatch, getState) {
        axios.get(`/api/albums/${albumId}`)
        .then(res => {
            dispatch(receiveAlbum(convertAlbum(res.data)));
        });
    };
}
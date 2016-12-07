import { START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST } from '../constants.js';
import axios from 'axios'
import AUDIO from '../audio.js'
import {skip} from '../utils';

export const startPlaying = function(){

    return {
        type: START_PLAYING
    }
}
export const stopPlaying = function(){
    return {
        type: STOP_PLAYING
    }
}

export const setCurrentSong = function(song){
    return {
        type: SET_CURRENT_SONG,
        song
    }
}

export const setList = function(songList){
    return {
        type: SET_LIST,
        songList
    }
}

//PLAY SONG
 export const play = function() {
    return function(dispatch, getState){
        AUDIO.play();
        dispatch(startPlaying())
    }
  }


//PAUSE
  export const pause = function(toggle){
      return function(dispatch, getState){
          AUDIO.pause();
          dispatch(stopPlaying())
      }

  }

//LOAD AUDIO SOURCE
export const load = function(currentSong, currentSongList){
      return function(dispatch, getState){
          console.log('CURRENT SONGGG', currentSong);
          AUDIO.src = currentSong.audioUrl;
          AUDIO.load();
          dispatch(setCurrentSong(currentSong));
          dispatch(setList(currentSongList));
      }
  }

  //START NEW SONG
export const startSong = (song, list) => dispatch => {
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
};

//TOGGLE PLAY & PAUSE
export const toggle = () => (dispatch, getState) => {
  const { isPlaying } = getState().player;
  if (isPlaying) dispatch(pause());
  else dispatch(play());
};

//CHECK IF PLAYING NEW SONG OR TOGGLE EXISTING SONG
export const toggleOne = (selectedSong, selectedSongList) =>
  (dispatch, getState) => {
    const { currentSong } = getState().player;
    // console.log('currentSong:', currentSong);
    if (selectedSong.id !== currentSong.id){
      dispatch(startSong(selectedSong, selectedSongList));
    }
    else {
        dispatch(toggle());
    }
};

//NEXT SONG
export const next = () =>
  (dispatch, getState) => {
    const {currentSongList, currentSong} = getState().player;
    dispatch(startSong(...skip(1, {currentSongList, currentSong})));
};

//PREV SONG
export const prev = () =>
  (dispatch, getState) => {
    const {currentSongList, currentSong} = getState().player;
    dispatch(startSong(...skip(-1, {currentSongList, currentSong})));
};









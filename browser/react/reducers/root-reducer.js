import { SET_LYRICS } from '../constants';
// import { setLyrics } from '../action-creators/lyrics'
// import initialState from '../initialState';

const initialState = { text: '' };

export default function reducer(prevState = initialState, action){
    switch(action.type){
        case SET_LYRICS:
            return  Object.assign({}, prevState, {text: action.lyric});
        default:
            return prevState;
    }
}
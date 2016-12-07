import { RECEIVE_ARTIST, RECEIVE_ARTISTS } from '../constants';


const initialState = { artists: [], selectedArtist: {} };

export default function reducer(prevState = initialState, action){
    switch(action.type){
        case RECEIVE_ARTIST:
            return  Object.assign({}, prevState, {selectedArtist: action.artist});
        case RECEIVE_ARTISTS:
            return Object.assign({}, prevState, {artists: action.artists});
        default:
            return prevState;
    }
}
import { RECEIVE_ALBUM, RECEIVE_ALBUMS } from '../constants';


const initialState = { albums: [], selectedAlbum: {} };

export default function reducer(prevState = initialState, action){
    switch(action.type){
        case RECEIVE_ALBUM:
            return  Object.assign({}, prevState, {selectedAlbum: action.album});
        case RECEIVE_ALBUMS:
            return Object.assign({}, prevState, {albums: action.albums});
        default:
            return prevState;
    }
}
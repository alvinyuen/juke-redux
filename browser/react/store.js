import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer'
import initialState from './initialState';


let logger = createLogger()
let middleware = applyMiddleware(logger, thunkMiddleware)

let reducers = combineReducers({
    lyrics: lyricsReducer,
    player: playerReducer
});

let store = createStore(reducers, middleware);

export default store;
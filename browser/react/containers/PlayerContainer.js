import React from 'react';
import store from '../store';
import Player from '../components/Player'
import { toggleOne , next, prev } from '../action-creators/player'
import axios from 'axios'
import {START_PLAYING,
        STOP_PLAYING,
        SET_CURRENT_SONG,
        SET_LIST,
        SET_PROGRESS} from '../constants';


export default class PlayerContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = Object.assign({}, store.getState());

        this.playSong = this.playSong.bind(this);
        this.prevSong = this.prevSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
    }


    playSong(song, songList ){
        store.dispatch(toggleOne(song, songList));
    }

    prevSong(songList, song){
        store.dispatch(prev());
    }

    nextSong(songList, song){
        store.dispatch(next());
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){

    return <Player
        {...this.props}
        playSong={this.playSong}
        prevSong={this.prevSong}
        nextSong={this.nextSong}
        currentSong = {this.state.player.currentSong}
        currentSongList={this.state.player.currentSongList}
        isPlaying={this.state.player.isPlaying}
        progress={this.state.player.progress}
        />
  }


}
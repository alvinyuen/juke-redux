import React from 'react';
import store from '../store';
import Songs from '../components/Songs'
import { toggleOne , next, prev } from '../action-creators/player'
import axios from 'axios'
import {START_PLAYING,
        STOP_PLAYING,
        SET_CURRENT_SONG,
        SET_LIST,
        SET_PROGRESS} from '../constants';


export default class SongContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = Object.assign({}, store.getState());

        this.playSong = this.playSong.bind(this);
    }


    playSong(song, songs){
        console.log('trigger play song');
        store.dispatch(toggleOne(song, songs));
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
    return <Songs
        {...this.props}
        playSong={this.playSong}
        currentSong = {this.state.player.currentSong}
        isPlaying = {this.state.player.isPlaying}
        />
  }


}
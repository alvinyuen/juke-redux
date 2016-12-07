import React from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics'
import setLyrics, { fetchLyrics } from '../action-creators/lyrics'
import axios from 'axios'
import {SET_LYRICS} from '../constants';


export default class LyricsContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = Object.assign({}, store.getState(), {artistQuery: '', songQuery: ''});
        this.setArtist = this.setArtist.bind(this)
        this.setSong = this.setSong.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setArtist(text){
        this.setState({artistQuery : text})
    }

    setSong(text){
        this.setState({songQuery : text})
    }


    handleSubmit(){
        store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery))
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

    return <Lyrics
      text={this.state.lyrics.text}
      setArtist={this.setArtist}
      setSong={this.setSong}
      artistQuery={this.state.lyrics.artistQuery}
      songQuery={this.state.lyrics.songQuery}
      submit={this.handleSubmit}
    />
  }


}
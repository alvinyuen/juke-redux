import React from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics'
import setLyrics from '../action-creators/lyrics'
import axios from 'axios'
import {SET_LYRICS} from '../constants'

export default class LyricsContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = store.getState();
        this.state.artistQuery = ""
        this.state.songQuery = ""
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
        axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(res=>res.data)
        .then((data)=> {
            const lyrics = setLyrics(data.lyric)
            store.dispatch(lyrics)
        })
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState(this.state)
        });
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
    return <Lyrics
      text={this.state.text}
      setArtist={this.setArtist}
      setSong={this.setSong}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      submit={this.handleSubmit}
    />
  }


}
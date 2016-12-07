import React from 'react';
import Songs from '../components/Songs';
import {selectAlbum } from '../action-creators/albums';
import store from '../store';
import { toggleOne } from '../action-creators/player';

class Album extends React.Component {

  constructor(props){
    super(props);
    this.state = Object.assign({}, store.getState());

    this.playSong= this.playSong.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        });

    // const selectAlbum = this.props.selectAlbum;
    const albumId = this.props.routeParams.albumId;
    store.dispatch(selectAlbum(albumId));
  }


  playSong(song, songList ){
        store.dispatch(toggleOne(song, songList));
    }


  componentWillUnmount(){
    this.unsubscribe();
  }

  render () {
    const album = this.state.albums.selectedAlbum;
    console.log('album', this.state.albums.selectedAlbum);
    const currentSong = this.state.player.currentSong;
    const isPlaying = this.state.player.isPlaying;
    const currentSongList = this.state.player.currentSongList;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          currentSongList={currentSongList}
          isPlaying={isPlaying}
          playSong={this.playSong} />
      </div>
    );
  }
}

export default Album;

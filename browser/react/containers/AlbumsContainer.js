import React from 'react';
import store from '../store';
import Songs from '../components/Songs'
import Albums from '../components/Albums'
import { fetchAlbums, selectAlbum } from '../action-creators/albums'
import axios from 'axios';


export default class AlbumsContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = Object.assign({}, store.getState());
    }

    componentDidMount(){
        console.log(this.state.albums)
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState())
        });
        store.dispatch(fetchAlbums())
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
    return <Albums
        {...this.props}
        fetchAlbums={fetchAlbums}
        selectAlbum={selectAlbum}
        albums={this.state.albums.albums}
        />
  }


}
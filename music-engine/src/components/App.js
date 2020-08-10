import React, { Component } from 'react';
import Search from './Search.js';
import Artist from './Artist.js';
import Tracks from './Tracks.js';


const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = { artist: null, tracks: []};

  //componentDidMount(){
  //  this.searchArtist('pentatonix');
  //}

  searchArtist = artistQuery =>{
    //console.log(this.state);
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then(response => response.json())
      .then(json => {
        if(json.artists.total>0){
          const artist = json.artists.items[0];
          this.setState({artist});
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then(response=>response.json())
            .then(json=>this.setState({tracks:json.tracks}))
            .catch(error=>alert(error.message));
      }
    })
    .catch(error=>alert(error.message));

  }

  render() {
    //console.log('this.state', this.state);
    return (
      <div>
        <h2>Music Search Engine - powered by Spotify</h2>
        <Search searchArtist={this.searchArtist}></Search>
        <Artist artist={this.state.artist}></Artist>
        <Tracks tracks={this.state.tracks}></Tracks>
      </div>
    );
  }
}

export default App;

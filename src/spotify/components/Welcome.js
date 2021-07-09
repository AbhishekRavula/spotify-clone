import AllPlaylist from './AllPlaylist';
import React, { Component } from 'react';
import '../styles/Welcome.css';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import OnPlaylist from './OnPlaylist';
import SideNav from './SideNav';
import Footer from './Footer';
import Search from './Search';
import CreatePlaylist from './CreatePlaylist';
import LikedMusic from './LikedMusic';
import UserPlaylists from './UserPlaylists';
import UserAuthenticate, { Logout } from './UserAuthenticate';



class WelcomeHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            currentPlayingSong: null,
            playState: 'play',
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username')
        }
    }


    footerCurrentSongDetails = (song) => {
        this.setState({ currentPlayingSong: song })
    }

    updateIsPlaying = (isPlaying) => {
        this.setState({ isPlaying: isPlaying });
    }

    updatePlayState = (state) => {
        if (state === 'pause') {
            this.setState({ playState: 'play' })
        }
        else {
            this.setState({ playState: 'pause' })
        }
    }

    setUserToken = (tokenKey, username) => {
        console.log('userToken',);
        this.setState({ token: tokenKey, username: username })
    }


    render() {
        console.log('token', this.state.token)
        return (
            <Router>
                <div id="body">
                    <div id="left_nav">
                        <SideNav userPlaylistNames={this.state.UserPlaylistNames} />
                    </div>
                    <div id="side_content">
                        {this.state.username &&
                            <div id='up_nav'>
                                <div>
                                    Welcome {localStorage.getItem('username')}
                                </div>
                                <div>
                                    <Logout setUserToken={this.setUserToken} />
                                </div>
                            </div>
                        }
                        <div id="content">
                            <Route exact path='/login'>
                                <UserAuthenticate setUserToken={this.setUserToken} />
                            </Route>
                            {this.state.token !== null ?
                                <Switch>
                                    <Route exact path='/'>
                                        <AllPlaylist token={this.state.token} />
                                    </Route>
                                    <Route exact path="/search">
                                        <Search footerCurrentSongDetails={this.footerCurrentSongDetails}
                                            updatePlayState={this.updatePlayState} />
                                    </Route>
                                    <Route exact path="/playlists/:id">
                                        <OnPlaylist footerCurrentSongDetails={this.footerCurrentSongDetails}
                                            updatePlayState={this.updatePlayState} playState={this.state.playState} />
                                    </Route>
                                    <Route exact path="/collection/musics">
                                        <LikedMusic footerCurrentSongDetails={this.footerCurrentSongDetails}
                                            updatePlayState={this.updatePlayState} playState={this.state.playState} />
                                    </Route>
                                    <Route exact path="/collection/playlists">
                                        <UserPlaylists />
                                    </Route>
                                </Switch>
                                : <Redirect to='/login' />
                            }
                        </div>
                    </div>
                    <Footer currentPlayingSong={this.state.currentPlayingSong} playState={this.state.playState}
                        updatePlayState={this.updatePlayState}
                    />
                </div>
            </Router>
        )
    }
}




export default WelcomeHome
// updateIsPlaying = { this.updateIsPlaying }
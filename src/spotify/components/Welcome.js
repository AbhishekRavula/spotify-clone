import React, { Component } from 'react';
import '../styles/Welcome.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllPlaylists from './AllPlaylists';
import SideNav from './SideNav';
import Footer from './Footer';
import Search from './Search';
import LikedMusic from './LikedMusic';
import UserPlaylists from './UserPlaylists';
import PlaylistView from './PlaylistView';
import { Logout } from './UserAuthenticate';


function UpNav() {
    return (
        <div id='up_nav'>
            <div>
                Welcome {localStorage.getItem('username')}
            </div>
            <div>
                <Logout />
            </div>
        </div>
    )
}


class WelcomeHome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div id="body">
                    <SideNav />
                    <div id="side_content">
                        <UpNav />
                        <div id="content">
                            <Switch>
                                <Route exact path='/'>
                                    <AllPlaylists />
                                </Route>
                                <Route exact path="/search">
                                    <Search />
                                </Route>
                                <Route exact path="/playlists/:id">
                                    <PlaylistView />
                                </Route>
                                <Route exact path="/collection/musics">
                                    <LikedMusic />
                                </Route>
                                <Route exact path="/collection/playlists">
                                    <UserPlaylists />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                    <audio id="globalAudio" />
                </div>
            </Router>
        )
    }
}

export default WelcomeHome
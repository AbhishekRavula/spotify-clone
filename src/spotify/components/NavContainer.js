import React from 'react'
import '../styles/Welcome.css'
import SideNav from './SideNav'
import { Logout } from './UserAuthenticate'
import Footer from './Footer'


function NavContainer(props) {  
    return (
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
                    {props.children}
                </div>
            </div>
            <Footer currentPlayingSong={this.state.currentPlayingSong} playState={this.state.playState}
                updatePlayState={this.updatePlayState}
            />
        </div>
    )
}

export default NavContainer

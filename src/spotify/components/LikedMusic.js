import React, { useState, useEffect } from 'react';
import '../styles//PlaylistView.css';
import Song from './SongView'
import { HOSTNAME } from '../spotify.constants.js'

function LikedMusic(props) {
    const [updated, setupdated] = useState(false)
    const [musicData, setmusicData] = useState([]);
    const token = localStorage.getItem('token')

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` }
    }

    useEffect(() => {
        
        fetch(HOSTNAME + 'musics/liked/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(jsonData => {
                setmusicData(jsonData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [updated])

    function updateLikedMusicData() {
        setupdated(!updated)
    }

    return (
        <div>
            <div id="playlistHeader">
                <img id="image" src="https://i.pinimg.com/originals/db/f0/98/dbf098866a153bc938dce016f180e397.jpg" alt="playlistCover"></img>
                <div id="playlistHeaderData">
                    <p id="playlist">PLAYLIST</p>
                    <h1>Liked Songs</h1>
                    <p>your fav's</p>
                </div>
            </div>
            <div style={{ display: 'flex', marginLeft: "10px", color: "#9A9B9C", marginTop: "20px" }}>
                <div id="ash">#</div>
                <div id="title">Title</div>
                <div id="album">Album</div>
            </div>
            {musicData.map((song, index) => {
                return (
                    <div>
                        <Song key={song.id} song={song.url} index={index + 1} updateLikedMusicData={updateLikedMusicData}
                            playState={props.playState} updateMusicData={props.updateMusicData}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default LikedMusic
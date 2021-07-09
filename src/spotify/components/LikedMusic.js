import React, { useState, useEffect } from 'react';
import '../styles//PlaylistView.css';
import Song from './SongView'

function LikedMusic(props) {
    const [updated, setupdated] = useState(false)
    const [musicData, setmusicData] = useState([]);
    const [currentPlayingSong, setcurrentPlayingSong] = useState(null);
    const token = localStorage.getItem('token')


    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` }
    }

    useEffect(() => {
        console.log('effected')
        fetch('http://127.0.0.1:8000/musics/liked/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(jsonData => {
                console.log('jsonData', jsonData)
                setmusicData(jsonData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [updated])

    function updateLikedMusicData() {
        console.log('here')
        // setmusicData(newMusicData);
        setupdated(!updated)
    }

    const changeCurrentPlayingSong = (song) => {
        setcurrentPlayingSong(song);
        props.footerCurrentSongDetails(song);
    }

    return (
        <div>
            <div id="playlistHeader">
                <img id="image" src="" alt="playlistCover"></img>
                <div id="playlistHeaderData">
                    <p id="playlist">PLAYLIST</p>
                    <h1>Liked Songs</h1>
                    <p>something</p>
                </div>
            </div>
            {musicData.map((song, index) => {
                return (
                    <div>
                        {/* {console.log(index, song.url)} */}
                        <Song key={song.id} song={song.url} index={index + 1}
                            changeCurrentPlayingSong={changeCurrentPlayingSong} currentPlayingSong={currentPlayingSong} updateLikedMusicData={updateLikedMusicData}
                            updatePlayState={props.updatePlayState} playState={props.playState} updateMusicData={props.updateMusicData}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default LikedMusic
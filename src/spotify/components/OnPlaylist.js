import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IsUserPlaylist from './PlaylistView';
import PlaylistView from './PlaylistView'


function OnPlaylist(props) {

    // console.log("OnPlaylist")
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);
    const token = localStorage.getItem('token')

    useEffect(() => {
        console.log("useEffected")
        fetch(`http://127.0.0.1:8000/playlists/${id}/`, {
            "headers": {
                "Authorization": `Token ${token}`
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                // console.log("user", myJson.created_by)
                console.log("playlist", jsonData)
                setPlaylistData(jsonData);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    useEffect(() => {
        if (playlistData) {
            let newPlaylist = new CustomEvent("newPlaylist", {detail:{noOfSongs : playlistData.music.length, playlistId: id}})
            document.dispatchEvent(newPlaylist)

            document.addEventListener('playNext', (e) => {
                console.log("playNext event received: ", e.detail);
                setCurrentSongIndex(e.detail.currentIndex);
            })
        }
    }, [playlistData])

    return (
        <div>
            {playlistData ? <PlaylistView {...playlistData} footerCurrentSongDetails={props.footerCurrentSongDetails}
                updatePlayState={props.updatePlayState} playState={props.playState} currentSongIndex={currentSongIndex} /> : "Loading..."}
        </div>
    );
}

export default OnPlaylist
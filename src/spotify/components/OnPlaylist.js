import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IsUserPlaylist from './PlaylistView';
import PlaylistView from './PlaylistView'


function OnPlaylist(props) {

    // console.log("OnPlaylist")
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);
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
            .then((myJson) => {
                // console.log("user", myJson.created_by)
                console.log("playlist", myJson)
                setPlaylistData(myJson);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    return (
        <div>
            {playlistData ? <PlaylistView {...playlistData} footerCurrentSongDetails={props.footerCurrentSongDetails}
                updatePlayState={props.updatePlayState} playState={props.playState} /> : "Loading..."}
        </div>
    );
}

export default OnPlaylist
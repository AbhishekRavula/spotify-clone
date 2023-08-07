import React, { useState, useEffect } from 'react';
import { Playlist } from './Playlist';
import Grid from '../libs/Grid';
import { HOSTNAME } from '../spotify.constants.js'


function AllPlaylists() {

    const [AllPlaylistData, setAllPlaylistData] = useState([])
    const token = localStorage.getItem('token')


    useEffect(() => {
        fetch(HOSTNAME + "playlists/", {
            "headers": {
                "Authorization": `Token ${token}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setAllPlaylistData(myJson)
            })
            .catch(err => {
                console.error(err);
            });
    }, [])


    return (
        <Grid>
            {AllPlaylistData.map(playlist => {
                return <Playlist key={playlist.id} {...playlist} />
            })}
        </Grid>
    )
}

export default AllPlaylists

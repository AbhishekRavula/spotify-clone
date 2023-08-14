import React, { useState, useEffect } from 'react';
import { Playlist } from './Playlist';
import Grid from '../libs/Grid';
import { HOSTNAME } from '../spotify.constants.js'


function AllPlaylists() {

    const [AllPlaylistData, setAllPlaylistData] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')



    useEffect(() => {
        setLoading(true)
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
            }).finally(() => {
                setLoading(false)
            });
    }, [])


    return (
        <Grid>
            {loading && <h3>Loading...</h3>}
            {!!AllPlaylistData?.length && AllPlaylistData.map(playlist => {
                return <Playlist key={playlist.id} {...playlist} />
            })}
        </Grid>
    )
}

export default AllPlaylists

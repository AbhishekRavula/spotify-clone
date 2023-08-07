import React, { useEffect, useState } from 'react'
import Grid from '../libs/Grid'
import Playlist from './Playlist'
import { HOSTNAME } from '../spotify.constants.js'


function UserPlaylists() {

    const [playlists, setplaylists] = useState(null)
    const token = localStorage.getItem('token')

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }

    useEffect(() => {
        fetch(HOSTNAME + 'playlists/library/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setplaylists(json)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Grid>
                {playlists && playlists.map(playlistData => {
                    return <Playlist key={playlistData.id} {...playlistData} />
                })}
            </Grid>
        </div>
    )
}

export default UserPlaylists

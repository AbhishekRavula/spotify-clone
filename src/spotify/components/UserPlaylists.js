import React, { useEffect, useState } from 'react'
import Grid from '../libs/Grid'
import Playlist from './Playlist'


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
        fetch('http://127.0.0.1:8000/playlists/library/', requestOptions)
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

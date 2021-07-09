import React, { useContext, useState, useEffect } from 'react';
import { Playlist } from './Playlist';
import Grid from '../libs/Grid';
import NavContainer from './NavContainer';
import CustomizedSlider from '../libs/temp';


function AllPlaylist() {

    console.log('allplaylist called')

    const [AllPlaylistData, setAllPlaylistData] = useState([])
    const token = localStorage.getItem('token')


    useEffect(() => {

        fetch("http://127.0.0.1:8000/playlists/", {
            "headers": {
                // "Authorization": "Basic YWJoaToxMjM0"
                "Authorization": `Token ${token}`
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                // this.setState({ AllPlaylistData: myJson });
                setAllPlaylistData(myJson)
                // console.log('json',myJson);
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

export default AllPlaylist;

// Reusability
// Modularity
// 
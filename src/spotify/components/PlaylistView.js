import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PlaylistView.css';
import Song from './SongView';
import Search from './Search';
import PlaylistHeader from './PlaylistHeader'
import EditPlaylistDetailsModal from '../libs/EditPlaylistDetailsModal';


function PlaylistView(props) {

    const [musicData, setmusicData] = useState([])
    const [name, setname] = useState(null);
    const [description, setdescription] = useState(null);
    const [created_by, setcreated_by] = useState(null)
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token')
    const { id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);
    const HOSTNAME = "https://spotifyclonebackend.herokuapp.com/"

    useEffect(() => {
        fetch(HOSTNAME + `playlists/${id}/`, {
            "headers": {
                "Authorization": `Token ${token}`
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setPlaylistData(jsonData);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    useEffect(() => {
        if (playlistData) {
            setname(playlistData.name)
            setdescription(playlistData.description)
            setcreated_by(playlistData.created_by)
            setmusicData(playlistData.music)
        }
    }, [playlistData])

    useEffect(() => {
        if (playlistData) {
            let newPlaylist = new CustomEvent("newPlaylist", { detail: { noOfSongs: playlistData.music.length, playlistId: id } })
            document.dispatchEvent(newPlaylist)
        }
    }, [playlistData])


    function updateMusicData(data, remove) { //adds new music to playlist

        musicData.push(data)
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
            body: JSON.stringify({
                music: [data],
                remove_music: remove
            })
        }
        fetch(HOSTNAME + `playlists/${playlistData.id}/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setmusicData(json.music)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleOpen() {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function savePlaylistDetails() { // saves playlist data without new music

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
            body: JSON.stringify({
                name: name,
                description: description,
                created_by: props.created_by
            })
        };
        fetch(HOSTNAME + `playlists/${playlistData.id}/`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                setname(json.name)
                setdescription(json.description)
            });
        handleClose()
    }

    const setPlaylistName = (newName) => {
        setname(newName)
    }
    const setPlaylistDescription = (newDesc) => {
        setdescription(newDesc)
    }

    return (
        <div>
            <PlaylistHeader handleOpen={handleOpen} name={name} image={playlistData && playlistData.image} description={description} created_by={created_by} />
            <div style={{ display: 'flex', marginLeft: "10px", color: "#9A9B9C", marginTop: "20px" }}>
                <div id="ash">#</div>
                <div id="title">Title</div>
                <div id="album">Album</div>
            </div>
            <div>
                {musicData.map((song, index) => {
                    return (
                        <div>
                            <Song song={song} index={index + 1} noOfSongs={musicData.length} updateMusicData={updateMusicData} />
                        </div>
                    )
                })}
                {props.created_by !== 'SpotifyAdmin' && <h5>Let's Find Some Songs For Your Playlist</h5>}
                <EditPlaylistDetailsModal image={playlistData && playlistData.image} setPlaylistDescription={setPlaylistDescription} open={open} handleOpen={handleOpen} handleClose={handleClose}
                    setPlaylistName={setPlaylistName} savePlaylistDetails={savePlaylistDetails} {...playlistData} />
                {props.created_by !== 'SpotifyAdmin' && <Search add={true} {...props} updateMusicData={updateMusicData} />}
            </div>
        </div>
    )
}

export default PlaylistView

import React, { Component, useState, useEffect } from 'react';
import '../styles/PlaylistView.css';
import Song from './SongView';
import Search from './Search';
import PlaylistHeader from './PlaylistHeader'
import EditPlaylistDetailsModal, { handleOpen } from '../libs/EditPlaylistDetailsModal';
import '../styles/temp.css';



function PlaylistView(props) {
    
    // console.log('propss', props.music)
    const [musicData, setmusicData] = useState(props.music)
    const [currentPlayingSong, setcurrentPlayingSong] = useState(null);
    const [image, setimage] = useState(props.image);
    const [name, setname] = useState(props.name);
    const [description, setdescription] = useState(props.description);
    const [created_by] = useState(props.created_by)
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [currentSongSrc, setcurrentSongSrc] = useState("")
    // let audio = document.getElementById("globalAudio")

    function updateMusicData(data, remove) { //adds new music to playlist
        console.log("updated", data)
        musicData.push(data)
        console.log(musicData)
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
            body: JSON.stringify({
                music: [data],
                remove_music: remove
            })
        }
        console.log("here")
        fetch(`http://127.0.0.1:8000/playlists/${props.id}/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log("music", json)
                setmusicData(json.music)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeCurrentPlayingSong = (song) => {
        setcurrentPlayingSong(song);
        props.footerCurrentSongDetails(song);
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
                image: image,
                description: description,
                created_by: props.created_by
            })
        };
        fetch(`http://127.0.0.1:8000/playlists/${props.id}/`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                console.log(json)
                console.log(json.id)
                setname(json.name)
                setimage(json.image)
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
            {console.log("playlistView name", name)}
            <PlaylistHeader key={props.id} handleOpen={handleOpen} name={name} image={image} description={description}
                created_by={created_by} created_by={props.created_by}/>
            <div style={{ display: 'flex', marginLeft: "10px", color: "#9A9B9C", marginTop: "20px" }}>
                <div id="ash">#</div>
                <div id="title">Title</div>
                <div id="album">Album</div>
            </div>
            <div>
                {musicData && musicData.map((song, index) => {
                    return (
                        <div>
                            {/* {console.log("index", index)} */}
                            <Song song={song} index={index + 1} noOfSongs={musicData.length}
                                changeCurrentPlayingSong={changeCurrentPlayingSong} currentPlayingSong={currentPlayingSong}
                                updatePlayState={props.updatePlayState} playState={props.playState} updateMusicData={updateMusicData}
                                currentSongIndex={props.currentSongIndex}
                            />
                        </div>
                    )
                })}
                {props.created_by !== 'SpotifyAdmin' && <h5>Let's Find Some Songs For Your Playlist</h5>}
                <EditPlaylistDetailsModal key={props.id} image={image} setPlaylistDescription={setPlaylistDescription} open={open} handleOpen={handleOpen} handleClose={handleClose}
                    setPlaylistName={setPlaylistName} savePlaylistDetails={savePlaylistDetails} />
                {props.created_by !== 'SpotifyAdmin' && <Search add={true} footerCurrentSongDetails={props.footerCurrentSongDetails} {...props} updateMusicData={updateMusicData}
                    updatePlayState={props.updatePlayState} playlistId={props.id} />}
            </div>
        </div>
    )
}

// export default IsUserPlaylist
export default PlaylistView;

// Basic YWJoaToxMjM0"
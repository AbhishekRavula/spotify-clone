import React from 'react'
import '../styles/PlaylistView.css';

function PlaylistHeader(props) {
    return (
        <>
            <div id="playlistHeader">
                <img id="image" onClick={() => props.created_by != "SpotifyAdmin" && props.handleOpen()}
                    src={props.image ? props.image : "https://i.pinimg.com/originals/db/f0/98/dbf098866a153bc938dce016f180e397.jpg"} alt="playlistCover"></img>
                <div id="playlistHeaderData">
                    <p id="playlist">PLAYLIST</p>
                    <h1 onClick={() => props.created_by != "SpotifyAdmin" && props.handleOpen()}>{props.name}</h1>
                    <div id="playlistDescription" onClick={() => props.created_by != "SpotifyAdmin" && props.handleOpen()}>{props.description}</div>
                    <div>{props.created_by}</div>
                </div>
            </div>
        </>
    )
}

export default PlaylistHeader

import React from 'react'
import '../styles/PlaylistView.css';
import '../styles/temp.css';


function PlaylistHeader(props) {
    return (
        <>
            <div id="playlistHeader">
                <img id="image" onClick={() => props.created_by != "SpotifyAdmin" && props.handleOpen()} src={props.image} alt="playlistCover"></img>
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



// const quadraCover = (
//     <div id="body">
//         <div id="row">
//             <div id="block">
//                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
//             </div>
//             <div id="block">
//                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
//             </div>
//         </div>
//         <div id="row">
//             <div id="block">
//                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
//             </div>
//             <div id="block">
//                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
//             </div>
//         </div>
//     </div>
// )

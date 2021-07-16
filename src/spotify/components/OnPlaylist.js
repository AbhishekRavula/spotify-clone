// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import IsUserPlaylist from './PlaylistView';
// import PlaylistView from './PlaylistView'


// function OnPlaylist() {

//     const { id } = useParams();
//     const [playlistData, setPlaylistData] = useState(null);
//     const token = localStorage.getItem('token')

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/playlists/${id}/`, {
//             "headers": {
//                 "Authorization": `Token ${token}`
//             },
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((jsonData) => {
//                 setPlaylistData(jsonData);
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }, [id]);

//     useEffect(() => {
//         if (playlistData) {
//             let newPlaylist = new CustomEvent("newPlaylist", { detail: { noOfSongs: playlistData.music.length, playlistId: id } })
//             document.dispatchEvent(newPlaylist)
//         }
//     }, [playlistData])

//     return (
//         <div>
//             {playlistData ? <PlaylistView {...playlistData} /> : "Loading..."}
//         </div>
//     );
// }

// export default OnPlaylist
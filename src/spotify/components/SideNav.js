import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import '../styles/Welcome.css';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LibraryMusicRoundedIcon from '@material-ui/icons/LibraryMusicRounded';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';


let useClickOutside = (handler) => { // custom hook defination
    let domNode = useRef()
    // console.log("usedd")
    useEffect(() => {
        // console.log("renderingggg")
        let eventHandler = (event) => {
            if (domNode.current && !domNode.current.contains(event.target)) {
                handler()
            }
        }
        document.addEventListener("mousedown", eventHandler)
    })
    return domNode
}

function SideNav(props) {
    // console.log('sideNav rendered')
    const [userPlaylistNames, setuserPlaylistNames] = useState(null)
    const history = useHistory()
    const token = localStorage.getItem('token')
    const [visibleContextMenu, setvisibleContextMenu] = useState(false)
    const [contextMenu, setcontextMenu] = useState({
        posX: 0,
        posY: 0,
        playlistId: null
    })


    function routeNewPlaylist() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
            body: JSON.stringify({ name: "My Playlist", description: "My Playlist Description" })
        };
        fetch('http://127.0.0.1:8000/playlists/', requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                console.log(json);
                console.log(json.id)
                history.push(`/playlists/${json.id}`)
            });
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            onlyNamesAndId: true
        })
    }

    useEffect(() => {
        // console.log('sideNav useEffected')
        fetch('http://127.0.0.1:8000/playlists/library/', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                // console.log('jsonnnnn', json)
                setuserPlaylistNames(json)
            })
            .catch(err => {
                console.log(err)
            })
    }, [visibleContextMenu])

    const handlePlaylistContextMenu = (event, id) => {
        // console.log('right clicked', event.clientX, event.clientY, id)
        event.preventDefault();
        setvisibleContextMenu(true)
        setcontextMenu({
            posX: event.clientY,
            posY: event.clientX,
            playlistId: id
        })
    }

    const changeVisibleContextMenu = () => {
        // console.log("changeVisible called")
        setvisibleContextMenu(false)
    }



    return (
        <div>
            <ul id="sideNav">
                <li onClick={() => history.push('/')}><img id="sideNav_logo" src="http://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="logo"></img></li>
                <li onClick={() => history.push('/')}><HomeRoundedIcon /> Home</li>
                <li onClick={() => history.push('/search')}><SearchRoundedIcon /> Search</li>
                <li onClick={() => history.push('/collection/playlists')}><LibraryMusicRoundedIcon /> Library</li>
                <li onClick={routeNewPlaylist}><PlaylistAddRoundedIcon /> Create Playlist</li>
                <li onClick={() => history.push('/collection/musics')}><FavoriteRoundedIcon /> Liked Songs</li>
            </ul>
            <hr style={{ color: "rgb(255, 255, 255)", marginLeft: "25px", marginRight: "25px" }} />
            {/* <ul id="sideNav">
                {userPlaylistNames && userPlaylistNames.map(playlist => {
                    return <li key={playlist.id} onContextMenu={(e) => handlePlaylistContextMenu(e, playlist.id)}
                        style={{ fontWeight: "600" }}
                        onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.name}</li>
                })}
            </ul> */}
            {visibleContextMenu && <PlaylistContextMenu contextMenu={contextMenu} changeVisibleContextMenu={changeVisibleContextMenu} />}
        </div>
    )
}




function PlaylistContextMenu(props) {

    const token = localStorage.getItem('token')

    const contextMenuStyle = {
        "position": "absolute",
        "top": `${props.contextMenu.posX + 20}`,
        "left": `${props.contextMenu.posY}`,
        "padding": "8px",
        "backgroundColor": "rgb(18, 18, 18)",
        "color": "white",
        "listStyleType": "none",
        "border": "1px solid white"
    }

    const deleteRequestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "authorization": `Token ${token}` }
    }

    const deletePlaylist = (id, changeVisibleContextMenu) => {
        console.log('delete called', id)

        fetch(`http://127.0.0.1:8000/playlists/${id}/`, deleteRequestOptions)
            .then(response => {
                // return response.json()
                console.log('response', response)
                if (response.status === 204) {
                    console.log("yes")
                    changeVisibleContextMenu()
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    let domNode = useClickOutside(() => { // custom hook
        console.log("use")
        props.changeVisibleContextMenu(false)
    })

    return (
        <div style={contextMenuStyle} ref={domNode} >
            <li id="contextMenuItem">Edit</li>
            <li id="contextMenuItem" onClick={() => deletePlaylist(props.contextMenu.playlistId, props.changeVisibleContextMenu)}>Delete</li>
        </div>
    )
}



export default SideNav

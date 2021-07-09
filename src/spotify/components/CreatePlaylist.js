import React, { Component, useState, useEffect } from 'react'
import '../styles/CreatePlaylist.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        // backgroundColor: theme.palette.background.paper,
        backgroundColor: "#282828",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function CreatePlaylist() {


    const [playlistCover, setplaylistCover] = useState("https://i.scdn.co/image/ab67706f000000023ceb635f8f2e1ee2ee7134dd");
    const [playlistName, setplaylistName] = useState("Playlist Name");
    const [playlistDescription, setplaylistDescription] = useState("Playlist Description");
    // const [isClicked, setisClicked] = useState(false)

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem('token')


    function savePlaylistData() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
            body: JSON.stringify({ name: playlistName, image: playlistCover, description: playlistDescription })
        };
        fetch('http://127.0.0.1:8000/artists/', requestOptions)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                console.log(json);
                console.log(json.id);
            });
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalStyle = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textarea: {
            backgroundColor: "#3E3E3E",
            color: "white"
        },
        input: {
            width: "100%",
            lineHeight: "2em",
            backgroundColor: "#3E3E3E",
            color: "white",
            border: "1px solid #5A5A5A"
        }
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 style={{ color: "white" }}>Edit Details</h4>
            <div style={{ display: "flex" }}>
                <div>
                    <img onClick={handleOpen}
                        src={playlistCover}
                        style={{ width: "160", height: "155", marginRight: "15px" }}
                        alt="playlistCover" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <form>
                        <label style={{ color: "white" }}>Name:</label>
                        <input style={modalStyle.input} type="text" onChange={(event) => { setplaylistName(event.target.value) }} />
                    </form>
                    <form>
                        <label style={{ color: "white" }}>Description:</label>
                        <textarea style={modalStyle.textarea} onChange={(event) => { setplaylistDescription(event.target.value) }} />
                    </form>
                </div>
            </div>
            <Button variant="contained" size="small" color="muted"
                className={classes.margin} style={{ float: "right" }}
                onClick={savePlaylistData}
            >Save</Button>
        </div>
    );

    return (
        <div>
            {/* <button type="button" onClick={handleOpen}>
                Open Modal
      </button> */}
            <div id="playlistHeader">
                <img onClick={handleOpen} id="image" src={playlistCover} alt="playlistCover"></img>
                <div id="playlistHeaderData">
                    <p id="playlist">PLAYLIST</p>
                    <h1 onClick={handleOpen}>{playlistName}</h1>
                    <p onClick={handleOpen}>{playlistDescription}</p>
                </div>
            </div>
            <h4>Let's Find Some Songs For Your Playlist</h4>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default CreatePlaylist

import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


function EditPlaylistDetailsModal(props) {

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

    const classes = useStyles();

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

    const modalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h4 style={{ color: "white" }}>Edit Details</h4>
            <div style={{ display: "flex" }}>
                <div>
                    <img onClick={props.handleOpen}
                        src={props.image}
                        style={{ width: "160", height: "155", marginRight: "15px" }}
                        alt="playlistCover" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <form>
                        <label style={{ color: "white" }}>Name:</label>
                        <input style={modalStyle.input} type="text" onChange={(event) => { props.setPlaylistName(event.target.value) }} />
                    </form>
                    <form>
                        <label style={{ color: "white" }}>Description:</label>
                        <textarea style={modalStyle.textarea} onChange={(event) => { props.setPlaylistDescription(event.target.value) }} />
                    </form>
                </div>
            </div>
            <Button variant="contained" size="small" color="muted"
                className={classes.margin} style={{ float: "right" }}
                onClick={props.savePlaylistDetails}
            >Save</Button>
        </div>
    )


    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {modalBody}
        </Modal>
    )
}

export default EditPlaylistDetailsModal

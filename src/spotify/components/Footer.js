import React, { Component, useEffect, useRef, useState } from 'react';
import '../styles/Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { pause, resume, play, audios } from '../libs/globalAudio';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';


function Footer(props) {
    console.log("footer rendered")

    const [songChanged, setsongChanged] = useState(false)
    const [shuffle, setshuffle] = useState(false)
    localStorage.setItem("volume", 80)

    const toggleResumePause = () => {
        if (props.playState === 'pause') {
            props.updatePlayState('pause')
            pause()
        }
        else {
            props.updatePlayState('resume')
            resume()
        }
    }

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();

    const skipPrevNextSong = (next) => {
        let indexOfCurrentSong = audios.currentSource.id
        indexOfCurrentSong = (indexOfCurrentSong + 1 === audios.currentPlaylistSongsSources.length) ? -1 : indexOfCurrentSong
        next ? play(indexOfCurrentSong + 1) : (indexOfCurrentSong - 1) < 0 ? play(0) : play(indexOfCurrentSong - 1)
        console.log("skip", audios.currentSource.id)
        setsongChanged(!songChanged)
    }

    let noOfPlaylistSongs = audios.currentPlaylistSongsSources.length

    const getShuffledMusicIndexes = () => {
        let shuffledIndexes = []
        while (shuffledIndexes.length != noOfPlaylistSongs) {
            let newIndex = Math.floor(Math.random() * noOfPlaylistSongs)
            !shuffledIndexes.includes(newIndex) && shuffledIndexes.push(newIndex)
        }
        console.log(shuffledIndexes)
        return shuffledIndexes
    }

    let shuffledIndexesList = getShuffledMusicIndexes()

    const skipPrevNextShuffleList = (shuffledIndexesList) => {
        console.log("unshifted", shuffledIndexesList)
        play(shuffledIndexesList[0])
        shuffledIndexesList.push(shuffledIndexesList.shift())
        console.log("shifted", shuffledIndexesList)
        // shuffledIndexesList = shuffledIndexesList.length <= 0 ? getShuffledMusicIndexes() : shuffledIndexesList
    }

    useEffect(() => { // sets footer song details
        console.log("footer current source changed")
        setsongChanged(!songChanged)
    }, [audios.currentSource])


    return (
        <div id="footer_body">
            <div id="footer_left">
                <img id="footer_albumCover" src={audios.currentPlaylistSongsSources[audios.currentSource.id]
                    ? audios.currentPlaylistSongsSources[audios.currentSource.id].cover : ""} alt="cover" />
                <div id="footer_songInfo">
                    <strong id="footer_songTitle">{audios.currentPlaylistSongsSources[audios.currentSource.id]
                        ? audios.currentPlaylistSongsSources[audios.currentSource.id].name : ""}</strong>
                    <div id="footer_songArtists">{audios.currentPlaylistSongsSources[audios.currentSource.id] ?
                        audios.currentPlaylistSongsSources[audios.currentSource.id].artists.join(", ") : ""}</div>
                </div>
            </div>
            <div id="footer_center">
                <div id="footer_center_controls">
                    {shuffle ? <ShuffleIcon style={{ color:"#3F51B5"}} onClick={() => { setshuffle(!shuffle) }} /> : <ShuffleIcon onClick={() => { setshuffle(!shuffle) }} />}
                    <SkipPreviousIcon onClick={() => { shuffle ? skipPrevNextShuffleList(shuffledIndexesList) : skipPrevNextSong(false) }} />
                    {props.playState === 'play' &&
                        <PlayCircleOutlineIcon id="footer_icon" fontSize="large" onClick={toggleResumePause} />}
                    {props.playState === 'pause' && <PauseCircleOutlineIcon id="footer_icon" fontSize="large" onClick={toggleResumePause} />}
                    <SkipNextIcon onClick={() => { shuffle ? skipPrevNextShuffleList(shuffledIndexesList) : skipPrevNextSong(true) }} />
                    <RepeatControl />
                </div>
                <div id="footer_center_slider">
                    <SongProgressBar toggleResumePause={toggleResumePause} />
                </div>
            </div>
            <div id="footer_right">
                <Grid container className={classes.root} spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <VolumeControl />
                </Grid>
            </div>
        </div>
    )
}

export default Footer


function RepeatControl() {

    const [repeat, setrepeat] = useState(false)

    let audioRef = audios.currentSource.audio

    useEffect(() => { //controls repeat action
        if (audioRef) {
            audioRef.loop = repeat
        }
    }, [repeat])

    useEffect(() => { // turns repeat to default on song change
        if (audioRef) {
            setrepeat(false)
        }
    }, [audios.currentSource])

    return (
        <>
            {repeat ? <RepeatOneIcon style={{ color: "#3F51B5" }} onClick={() => { setrepeat(false) }} /> : <RepeatIcon onClick={() => { setrepeat(true) }} />}
        </>
    )
}


function VolumeControl() {

    const [mute, setmute] = useState(false)
    const [seekvolume, setseekvolume] = useState(80)
    let audioRef = audios.currentSource.audio

    const handleVolume = (event, newVolume) => {
        // console.log("volume", audios.currentPlaylistSongsSources)
        if (newVolume) {
            setmute(false)
            setseekvolume(newVolume)
            audioRef.volume = newVolume / 100
            localStorage.setItem("volume", newVolume)
        }
        else {
            audioRef.volume = 0
            setseekvolume(0)
            setmute(true)
        }
    }

    return (
        <>
            <Grid item>
                {mute ? <VolumeOffIcon onClick={(e) => handleVolume(e, localStorage.getItem("volume"))} /> : <VolumeUpIcon onClick={(e) => handleVolume(e, 0)} />}
            </Grid>
            <Grid item xs>
                <Slider value={seekvolume} onChange={handleVolume} aria-labelledby="continuous-slider" />
            </Grid>
        </>

    )
}


function SongProgressBar(props) {

    const [seekValue, setseekValue] = useState(0);
    const [currentSongTime, setcurrentSongTime] = useState("00:00")
    const [currentSongDuration, setcurrentSongDuration] = useState("00:00")
    const [playing, setplaying] = useState(false)

    let audioRef = audios.currentSource.audio

    const handleSeek = (event, newValue) => {
        audioRef.currentTime = (audioRef.duration / 100) * newValue
        setseekValue(newValue);
    }

    const getMinSec = (seconds) => {
        let sec = Math.floor(seconds)
        let min = Math.floor(sec / 60)
        min = min >= 10 ? min : "0" + min
        sec = Math.floor(sec % 60)
        sec = sec >= 10 ? sec : "0" + sec
        return min + ":" + sec
    }

    const getSeekValue = (currentTime, duration) => {
        return Math.floor((Math.floor(currentTime) * 100) / duration)
    }

    useEffect(() => { // set song duration
        if (audioRef) {
            setcurrentSongDuration(getMinSec(audioRef.duration))
        }
    }, [playing])

    useEffect(() => {
        if (audioRef) {
            audioRef.addEventListener("timeupdate", () => {
                setplaying(true)
                setseekValue(getSeekValue(audioRef.currentTime, audioRef.duration))
                setcurrentSongTime(getMinSec(audioRef.currentTime))
            })
            audioRef.addEventListener("ended", () => {
                setcurrentSongTime("00:00")
                setseekValue(0)
                setplaying(false)
                props.toggleResumePause()
            })
            audioRef.addEventListener("durationchange", () => {
                setplaying(!playing)
            })
        }
    })

    return (
        <>
            {/* {console.log("slide renderred", currentSongTime)} */}
            <div>{currentSongTime}</div>
            <div style={{ width: "500px" }}>
                <Grid container>
                    <Grid item xs>
                        <Slider value={seekValue} onChange={handleSeek} aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
            <div>{currentSongDuration}</div>
        </>
    )
}

// export default SongProgressBar


// const [audio] = useState(new Audio("https://s5.as05210315.pw/2103152315/tedv95der9zdns/Sarrainodu%20-%20%282016%29/[iSongs.info]%2006%20-%20Sarrainodu.mp3"));

 // return (
    //     <div id="footer_body">
    //         <div id="footer_left">
    //             <img id="footer_albumCover" src={props.currentPlayingSong ? props.currentPlayingSong.album.image : ""} alt="cover" />
    //             <div id="footer_songInfo">
    //                 <strong id="footer_songTitle">{props.currentPlayingSong ? props.currentPlayingSong.name : ""}</strong>
    //                 <div id="footer_songArtists">{props.currentPlayingSong ? props.currentPlayingSong.artist.join(", ") : ""}</div>
    //             </div>
    //         </div>
    //         <div id="footer_center">
    //             <div id="footer_center_controls">
    //                 <ShuffleIcon id="footer_green" />
    //                 <SkipPreviousIcon onClick={() => { skipPrevNextSong(false) }} />
    //                 {props.playState === 'play' &&
    //                     <PlayCircleOutlineIcon id="footer_icon" fontSize="large" onClick={toggleResumePause} />}
    //                 {props.playState === 'pause' && <PauseCircleOutlineIcon id="footer_icon" fontSize="large" onClick={toggleResumePause} />}
    //                 <SkipNextIcon onClick={() => { skipPrevNextSong(true) }} />
    //                 <RepeatControl />
    //             </div>
    //             <div id="footer_center_slider">
    //                 <SongProgressBar toggleResumePause={toggleResumePause} />
    //             </div>
    //         </div>
    //         <div id="footer_right">
    //             <Grid container className={classes.root} spacing={2}>
    //                 <Grid item>
    //                     <PlaylistPlayIcon />
    //                 </Grid>
    //                 <VolumeControl />
    //             </Grid>
    //         </div>
    //     </div>
    // )
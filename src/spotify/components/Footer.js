import React, { Component, useEffect, useParams, useState } from 'react';
import '../styles/Footer.css';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';


function Footer() {

    const [shuffle, setshuffle] = useState(false)
    const [currentSongDetails, setcurrentSongDetails] = useState(null)
    const [currentPlaylistShuffleList, setcurrentPlaylistShuffleList] = useState(null)
    const [currentPlaylist, setcurrentPlaylist] = useState({
        id: null,
        noOfSongs: 0
    })
    const [shuffleListIndex, setshuffleListIndex] = useState(0)
    const [isPlaying, setisPlaying] = useState(false)
    const [repeat, setrepeat] = useState(false)
    const [isaudio, setisaudio] = useState(false)
    localStorage.setItem("volume", 80)
    let audio = document.getElementById("globalAudio")

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();

    let footerSongInfo = (e) => {
        setrepeat(false)
        setcurrentSongDetails({
            name: e.detail.name,
            artists: e.detail.artists,
            cover: e.detail.cover,
            index: e.detail.index
        })
        setisPlaying(true)
        setisaudio(!isaudio)
    }

    useEffect(() => {
        document.addEventListener("songPlaying", footerSongInfo)
        return () => {
            document.removeEventListener("songPlaying", footerSongInfo)
        }
    }, [isaudio])



    const footerPlayPause = (play) => {
        if (currentSongDetails) {
            play ? audio.play() : audio.pause()
        }
    }
    const loopControl = (loop) => {
        if (currentSongDetails) {
            if (loop) {
                audio.loop = true
                setrepeat(true)
            }
            else {
                audio.loop = false
                setrepeat(false)
            }
        }
    }
    const handlePlay = () => {
        setisPlaying(true)
    }
    const handlePause = () => {
        setisPlaying(false)
    }

    const playNextSong = () => {
        if (currentSongDetails) {
            let playNext = new CustomEvent("playNext", { detail: { currentIndex: currentSongDetails.index } })
            document.dispatchEvent(playNext)
        }
    }
    const playPreviousSong = () => {
        if (currentSongDetails) {
            let playNext = new CustomEvent("playPrev", { detail: { currentIndex: currentSongDetails.index } })
            document.dispatchEvent(playNext)
        }
    }

    useEffect(() => { // 
        if (audio) {
            audio.addEventListener("play", handlePlay)
            audio.addEventListener("pause", handlePause)
            audio.addEventListener("ended", playNextSong)

            return () => {
                audio.removeEventListener("play", handlePlay)
                audio.removeEventListener("pause", handlePause)
                audio.removeEventListener("ended", playNextSong)
            }
        }
    }, [isaudio])

    const getShuffleList = (noOfSongs) => {
        let shuffleList = []
        while (shuffleList.length != noOfSongs) {
            let newIndex = Math.floor(Math.random() * (noOfSongs + 1))
            if (!shuffleList.includes(newIndex) && newIndex) {
                shuffleList.push(newIndex)
            }
        }
        return shuffleList
    }

    const handleNoOfPlaylistSongs = (e) => {
        if (currentPlaylist.id != e.detail.playlistId) {
            setcurrentPlaylist({
                noOfSongs: e.detail.noOfSongs,
                id: e.detail.playlistId
            })
            if (shuffle) {
                setshuffleListIndex(0)
                setcurrentPlaylistShuffleList(getShuffleList(e.detail.noOfSongs))
            }
        }
    }

    useEffect(() => {
        document.addEventListener("newPlaylist", handleNoOfPlaylistSongs)

        return () => {
            document.removeEventListener("newPlaylist", handleNoOfPlaylistSongs)
        }
    })


    const playShuffleNextSong = () => {
        if (shuffleListIndex < currentPlaylist.noOfSongs) {
            let playShuffleNext = new CustomEvent("playShuffleNext", { detail: { index: currentPlaylistShuffleList[shuffleListIndex] } })
            document.dispatchEvent(playShuffleNext)
            setshuffleListIndex(shuffleListIndex + 1)
        }
    }

    const handleShuffle = () => {
        if (currentSongDetails) {
            setcurrentPlaylistShuffleList(getShuffleList(currentPlaylist.noOfSongs))
            setshuffle(!shuffle)
        }
    }

    return (
        <div id="footer_body">
            <div id="footer_left">
                {currentSongDetails ?
                <>
                    <img id="footer_albumCover" src={currentSongDetails && currentSongDetails.cover} alt="cover" />
                    <div id="footer_songInfo">
                        <strong id="footer_songTitle">{currentSongDetails && currentSongDetails.name}</strong>
                        <div id="footer_songArtists">{currentSongDetails && currentSongDetails.artists.join(", ")}</div>
                    </div> 
                </>
                    : <h4>Play any song!!</h4>}
            </div>
            <div id="footer_center">
                <div id="footer_center_controls">
                    {shuffle ? <ShuffleIcon style={{ color: "#3F51B5" }} onClick={() => setshuffle(!shuffle)} /> : <ShuffleIcon onClick={() => handleShuffle()} />}
                    <SkipPreviousIcon onClick={() => shuffle ? playShuffleNextSong() : playPreviousSong()} />
                    {isPlaying ? <PauseCircleOutlineIcon id="footer_icon" fontSize="large" onClick={() => footerPlayPause(false)} /> :
                        <PlayCircleOutlineIcon id="footer_icon" fontSize="large" onClick={() => footerPlayPause(true)} />}
                    <SkipNextIcon onClick={() => shuffle ? playShuffleNextSong() : playNextSong()} />
                    {repeat ? <RepeatOneIcon style={{ color: "#3F51B5" }} onClick={() => loopControl(false)} /> : <RepeatIcon onClick={() => loopControl(true)} />}
                </div>
                <div id="footer_center_slider">
                    <SongProgressBar currentSongDetails={currentSongDetails} />
                </div>
            </div>
            <div id="footer_right">
                <Grid container className={classes.root} spacing={2}>
                    <VolumeControl currentSongDetails={currentSongDetails}/>
                </Grid>
            </div>
        </div>
    )
}

export default Footer



function VolumeControl(props) {

    const [mute, setmute] = useState(false)
    const [seekvolume, setseekvolume] = useState(80)
    let audio = document.getElementById("globalAudio")

    const handleVolume = (event, newVolume) => {
        if (props.currentSongDetails) {
            if (newVolume) {
                setmute(false)
                setseekvolume(newVolume)
                audio.volume = newVolume / 100
                localStorage.setItem("volume", newVolume)
            }
            else {
                audio.volume = 0
                setseekvolume(0)
                setmute(true)
            }
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

    let audio = document.getElementById("globalAudio")

    const handleSeek = (event, newValue, currentSongDetails) => {
        if (currentSongDetails) {
            audio.currentTime = (audio.duration / 100) * newValue
            setseekValue(newValue);
        }
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
        if (audio) {
            setcurrentSongDuration(getMinSec(audio.duration))
        }
    }, [playing])

    useEffect(() => {
        if (audio) {
            audio.addEventListener("timeupdate", () => {
                setplaying(true)
                setseekValue(getSeekValue(audio.currentTime, audio.duration))
                setcurrentSongTime(getMinSec(audio.currentTime))
            })
            audio.addEventListener("ended", () => {
                setcurrentSongTime("00:00")
                setseekValue(0)
                setplaying(false)
            })
            audio.addEventListener("durationchange", () => {
                setplaying(!playing)
            })
        }
    })

    return (
        <>
            <div>{currentSongTime}</div>
            <div id="seekbar">
                <Grid container>
                    <Grid item xs>
                        <Slider value={seekValue} onChange={(e, newValue) => handleSeek(e, newValue, props.currentSongDetails)} aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
            <div>{currentSongDuration}</div>
        </>
    )
}
import React, { Component, useEffect, useParams, useState } from 'react';
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
import { ContactSupport, FormatColorResetRounded, FormatListBulletedTwoTone } from '@material-ui/icons';


function Footer(props) {
    // const [songChanged, setsongChanged] = useState(false)
    const [shuffle, setshuffle] = useState(false)
    const [currentSongDetails, setcurrentSongDetails] = useState(null)
    const [currentPlaylistShuffleList, setcurrentPlaylistShuffleList] = useState(null)
    const [currentPlaylist, setcurrentPlaylist] = useState({
        id: null,
        noOfSongs: 0
    })
    const [shuffleListIndex, setshuffleListIndex] = useState(0)
    console.log("footer rendered", currentPlaylistShuffleList)
    //     name: null,
    //     cover: null,
    //     artists :null,
    //     index: null
    // })
    const [isPlaying, setisPlaying] = useState(false)
    const [repeat, setrepeat] = useState(false)
    const [isaudio, setisaudio] = useState(false)
    localStorage.setItem("volume", 80)
    let audio = document.getElementById("globalAudio")


    // const toggleResumePause = () => {
    //     if (props.playState === 'pause') {
    //         props.updatePlayState('pause')
    //         pause()
    //     }
    //     else {
    //         props.updatePlayState('resume')
    //         resume()
    //     }
    // }

    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    const classes = useStyles();



    // const skipPrevNextSong = (next) => {
    //     if (next) {

    //     }
    //     else {
    //         let playPrev = new CustomEvent("playPrev", { detail: { currentIndex: currentSongDetails.index } })
    //         document.dispatchEvent(playPrev)
    //     }
    // let indexOfCurrentSong = audios.currentSource.id
    // indexOfCurrentSong = (indexOfCurrentSong + 1 === audios.currentPlaylistSongsSources.length) ? -1 : indexOfCurrentSong
    // next ? play(indexOfCurrentSong + 1) : (indexOfCurrentSong - 1) < 0 ? play(0) : play(indexOfCurrentSong - 1)
    // console.log("skip", audios.currentSource.id)
    // setsongChanged(!songChanged)
    // }

    // let noOfPlaylistSongs = audios.currentPlaylistSongsSources.length

    // const getShuffledMusicIndexes = () => {
    //     let shuffledIndexes = []
    //     while (shuffledIndexes.length != noOfPlaylistSongs) {
    //         let newIndex = Math.floor(Math.random() * noOfPlaylistSongs)
    //         !shuffledIndexes.includes(newIndex) && shuffledIndexes.push(newIndex)
    //     }
    //     console.log(shuffledIndexes)
    //     return shuffledIndexes
    // }

    // let shuffledIndexesList = getShuffledMusicIndexes()

    // const skipPrevNextShuffleList = (shuffledIndexesList) => {
    //     console.log("unshifted", shuffledIndexesList)
    //     play(shuffledIndexesList[0])
    //     shuffledIndexesList.push(shuffledIndexesList.shift())
    //     console.log("shifted", shuffledIndexesList)
    // shuffledIndexesList = shuffledIndexesList.length <= 0 ? getShuffledMusicIndexes() : shuffledIndexesList
    // }

    // useEffect(() => { // sets footer song details
    //     console.log("footer current source changed")
    //     setsongChanged(!songChanged)
    // }, [audios.currentSource])
    let footerSongInfo = (e) => {
        // console.log("songPlaying event triggered", e.detail)
        setrepeat(false)
        setcurrentSongDetails({
            name: e.detail.name,
            artists: e.detail.artists,
            cover: e.detail.cover,
            index: e.detail.index
        })
        setisPlaying(true)
        // console.log("handleEvent",isaudio, !isaudio)
        setisaudio(!isaudio)
    }

    useEffect(() => {
        document.addEventListener("songPlaying", footerSongInfo)
        return () => {
            document.removeEventListener("songPlaying", footerSongInfo)
        }
    }, [isaudio])



    const footerPlayPause = (play) => {
        // console.log("playpause clicked", play, audio.src)
        play ? audio.play() : audio.pause()
        // setisPlaying(!isPlaying)
    }
    const loopControl = (loop) => {
        if (loop) {
            audio.loop = true
            setrepeat(true)
        }
        else {
            audio.loop = false
            setrepeat(false)
        }
    }
    const handlePlay = () => {
        console.log("footer play")
        setisPlaying(true)
    }
    const handlePause = () => {
        console.log("footer pause")
        setisPlaying(false)
    }

    const playNextSong = () => {
        let playNext = new CustomEvent("playNext", { detail: { currentIndex: currentSongDetails.index } })
        console.log("dispatched", currentSongDetails.index)
        document.dispatchEvent(playNext)
    }
    const playPreviousSong = () => {
        let playNext = new CustomEvent("playPrev", { detail: { currentIndex: currentSongDetails.index } })
        document.dispatchEvent(playNext)
    }

    useEffect(() => { // 
        console.log("okokko", isaudio)
        // if (audio) {
        //     console.log("if inner")
        //     audio.addEventListener("ended", () => isPlaying ? setisPlaying(false) : setisPlaying(isPlaying))
        // }
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
        // console.log("shuffleList", shuffleList)
        return shuffleList
    }

    const handleNoOfPlaylistSongs = (e) => {
        console.log("newPlaylist", e.detail.noOfSongs)
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
        console.log("shuffle next", shuffleListIndex)
        if (shuffleListIndex < currentPlaylist.noOfSongs) {
            let playShuffleNext = new CustomEvent("playShuffleNext", { detail: { index: currentPlaylistShuffleList[shuffleListIndex] } })
            document.dispatchEvent(playShuffleNext)
            setshuffleListIndex(shuffleListIndex + 1)
        }
    }

    const handleShuffle = () => {
        console.log("handleShuffle")
        setcurrentPlaylistShuffleList(getShuffleList(currentPlaylist.noOfSongs))
        setshuffle(!shuffle)
    }

    return (
        <div id="footer_body">
            <div id="footer_left">
                <img id="footer_albumCover" src={currentSongDetails && currentSongDetails.cover} alt="cover" />
                <div id="footer_songInfo">
                    <strong id="footer_songTitle">{currentSongDetails && currentSongDetails.name}</strong>
                    <div id="footer_songArtists">{currentSongDetails && currentSongDetails.artists.join(", ")}</div>
                </div>
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
                    <SongProgressBar currentSongdetails={currentSongDetails} />
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



function VolumeControl() {

    const [mute, setmute] = useState(false)
    const [seekvolume, setseekvolume] = useState(80)
    let audio = document.getElementById("globalAudio")

    const handleVolume = (event, newVolume) => {
        // console.log("volume", audios.currentPlaylistSongsSources)
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

    const handleSeek = (event, newValue) => {
        // console.log("Seek", audio)
        audio.currentTime = (audio.duration / 100) * newValue
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
        if (audio) {
            setcurrentSongDuration(getMinSec(audio.duration))
        }
    }, [playing])

    useEffect(() => {
        // console.log("seek useEffected", currentSongDuration);
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
                // props.toggleResumePause()
            })
            audio.addEventListener("durationchange", () => {
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
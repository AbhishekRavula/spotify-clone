import React, {useState, useEffect} from 'react';
import '../styles/SongView.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { HOSTNAME } from '../spotify.constants.js'

function IsLikedIcon(props) {
    if (props.songData.liked) {
        return <FavoriteIcon onClick={() => props.unlikeMusic(props.songData)} />
    }
    return <FavoriteBorderIcon onClick={() => props.likeMusic(props.songData)} />
}


function Song(props) {
    const [songData, setsongData] = useState(null)
    const [isPlaying, setisPlaying] = useState(false)
    let token = localStorage.getItem('token')
    let audio = document.getElementById("globalAudio")


    const onPlaySong = () => {
        setisPlaying(audio.src == songData.music_path)
    }
    const onPauseSong = () => {
        setisPlaying(false)
    }

    const handleNext = (e) => {
        if ((e.detail.currentIndex + 1 <= props.noOfSongs) && (props.index == e.detail.currentIndex + 1)) {
            onSongClick()
        }
    }

    const handlePrev = (e) => {
        if ((e.detail.currentIndex - 1) && (props.index == e.detail.currentIndex - 1)) {
            onSongClick()
        }
    }

    const playShuffle = (e) => {
        if (e.detail.index == props.index) {
            onSongClick()
        }
    }

    useEffect(() => {

        if (songData) {
            audio.addEventListener('play', onPlaySong)
            audio.addEventListener('pause', onPauseSong)
            document.addEventListener("playNext", handleNext)
            document.addEventListener("playPrev", handlePrev)
            document.addEventListener("playShuffleNext", playShuffle)

            // returned function will be called on component unmount 
            return () => {
                audio.removeEventListener('play', onPlaySong)
                audio.removeEventListener('pause', onPauseSong)
                document.removeEventListener("playNext", handleNext)
                document.removeEventListener("playPrev", handlePrev)
            }
        }
    }, [songData]);


    useEffect(() => {
        fetch(props.song, { //song api
            "headers": {
                "Authorization": `Token ${token}`
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setsongData(jsonData)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])


    const likeMusic = (songData) => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` }
        }
        fetch(HOSTNAME + `musics/${songData.id}/like/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setsongData(json)
                props.updateLikedMusicData()
            })
            .catch(err => {
                console.log(err)
            });
    }

    const unlikeMusic = (songData) => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` }
        }
        fetch(HOSTNAME + `musics/${songData.id}/unlike/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setsongData(json)
                props.updateLikedMusicData()
            })
            .catch(err => {
                console.log(err)
            });
    }


    const onSongClick = () => {
        if (audio.src == songData.music_path) {
            audio.paused ? audio.play() : audio.pause()
        }
        else {
            audio.currentTime = 0
            audio.pause()
            audio.src = songData.music_path
            audio.play()
            audio.loop = audio.loop ? false : audio.loop
            let songPlaying = new CustomEvent("songPlaying", {
                detail: {
                    name: songData.name,
                    artists: songData.artist,
                    cover: songData.album.image,
                    index: props.index
                }
            })
            document.dispatchEvent(songPlaying)
        }
    }

    return (
        <div id="song">
            <div id="numberOrIcon">
                {isPlaying ? <img width="15" src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
                    alt="playingGif" /> : props.index}
            </div>
            <div id="songNamenArtists" onClick={onSongClick}>
                <div>{songData ? songData.name : ""}</div>
                <div id="songArtists">{songData ? songData.artist.join(", ") : ""}</div>
            </div>
            <div id="songAlbum">
                <div>{songData ? songData.album.name : ""}</div>
            </div>
            <div id="songActions">
                <div>
                    {songData && <IsLikedIcon songData={songData} likeMusic={likeMusic} unlikeMusic={unlikeMusic} />}
                </div>
                <div>
                    <HighlightOffIcon onClick={() => props.updateMusicData(songData.url, true)} />
                </div>
            </div>
        </div>
    )
}

export default Song


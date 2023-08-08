import { useEffect, useState } from 'react';
import '../styles/Search.css';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Button from '@material-ui/core/Button';
import { HOSTNAME } from '../spotify.constants.js'


function Search(props) {
    const [musicData, setmusicData] = useState("")
    const [searchTerm, setsearchTerm] = useState("")
    const token = localStorage.getItem('token')
    let audio = document.getElementById("globalAudio")

    useEffect(() => {
        fetch(HOSTNAME + "musics/", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                setmusicData(jsonData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleKeyDown = (event) => {
        if (event.code === "Escape") {
            setsearchTerm("");
        }
    }

    function addSongToPlaylist(song) {
        props.updateMusicData(song.url, false)
    }

    const playSong = (song) => {
        audio.currentTime = 0
        audio.pause()
        audio.src = song.music_path
        audio.play()
        let songPlaying = new CustomEvent("songPlaying", {
            detail: {
                name: song.name,
                artists: song.artist,
                cover: song.album.image,
            }
        })
        document.dispatchEvent(songPlaying)
    }

    return (
        <div>
            <div>
                <input id="field" type="text" placeholder="Search Songs.."
                    value={searchTerm} onKeyDown={handleKeyDown}
                    onChange={(event) => { setsearchTerm(event.target.value) }} />
                {searchTerm.length > 0 && !!musicData?.length && musicData.filter((song) => {
                    if (searchTerm === "") {
                        return song
                    }
                    else if (song.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return song
                    }
                }).map((song, key) => {
                    return (
                        <div key={key}>
                            <div id="searchBody"  >
                                <div style={{ flex: "0.05" }}>
                                    <MusicNoteIcon/>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0.95" }}>
                                    <div id="searchItems" onClick={() => playSong(song)}>
                                        <strong id="searchItemSongs">{song.name}</strong>
                                        <div id="searchItemSongArtists">{song.artist.join(", ")}</div>
                                    </div>
                                    {props.add &&
                                        <div onClick={() => addSongToPlaylist(song)}>
                                            <Button variant="outlined" size="small"
                                                style={{ color: "white", border: "1px solid white" }}
                                            >Add</Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search

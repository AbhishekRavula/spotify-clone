import { useEffect, useState } from 'react';
import '../styles/Search.css';
import { play, pause, resume } from '../libs/globalAudio'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Button from '@material-ui/core/Button';



function Search(props) {
    const [musicData, setmusicData] = useState("");
    const [searchTerm, setsearchTerm] = useState("");
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch("http://127.0.0.1:8000/musics/", {
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


    function onSongClicked(props, song) {
        play(song.music_path)
        props.footerCurrentSongDetails(song)
        props.updatePlayState("play")
    }

    const handleKeyDown = (event) => {
        if (event.code === "Escape") {
            setsearchTerm("");
        }
    }
   
    function addSongToPlaylist(song) {
        console.log("addSong", song.url, props.playlistId);
        props.updateMusicData(song.url, false)
    }

    return (
        <div>
            <div>
                <input id="field" type="text" placeholder="Search Songs.."
                    value={searchTerm} onKeyDown={handleKeyDown}
                    onChange={(event) => { setsearchTerm(event.target.value) }} />
                {searchTerm.length > 0 && musicData.filter((song) => {
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
                                    <MusicNoteIcon onClick={() => onSongClicked(props, song)}/>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0.95" }}>
                                    <div id="searchItems">
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
        </div >
    )
}

export default Search

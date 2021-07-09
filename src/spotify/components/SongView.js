import React, { Component, useState, useEffect } from 'react';
import { play, pause, resume } from '../libs/globalAudio'
import '../styles/SongView.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { audios } from '../libs/globalAudio'



function IsLikedIcon(props) {
    if (props.songData.liked) {
        return <FavoriteIcon onClick={() => props.unlikeMusic(props.songData)} />
    }
    return <FavoriteBorderIcon onClick={() => props.likeMusic(props.songData)} />
}

function PlayPauseIcon(props) {
    if (props.currentPlayingSong && props.currentPlayingSong.id === props.songData.id) {
        if (props.playState === "play") {
            return <PlayArrowIcon />
        }
        return <PauseIcon />
    }
    return <PlayArrowIcon />
}




function Song(props) {
    // console.log("song rendered")
    const [songData, setsongData] = useState(null)
    const [isPlaying, setisPlaying] = useState(false)
    let token = localStorage.getItem('token')
    // var audio = null

    useEffect(() => {
        fetch(props.song, { //song api
            "headers": {
                "Authorization": `Token ${token}`
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                audios.currentPlaylistSongsSources[props.index - 1] = {
                    name: myJson.name,
                    artists: myJson.artist,
                    music_path: myJson.music_path,
                    cover: myJson.album.image,
                    // audio: new Audio(myJson.music_path)
                }
                setsongData(myJson)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])


    useEffect(() => {
        console.log("songView effected", audios.currentSource.id)
        if (audios.currentSource.id != props.index - 1 && isPlaying) {
            setisPlaying(false)
        }
    }, [audios.currentSource])


    const likeMusic = (songData) => {
        console.log('like  id', songData.id)
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` }
        }
        fetch(`http://127.0.0.1:8000/musics/${songData.id}/like/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log('json', json)
                setsongData(json)
                props.updateLikedMusicData()
            })
            .catch(err => {
                console.log(err)
            });
    }

    const unlikeMusic = (songData) => {
        console.log('unlike  id', songData.id)
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` }
        }
        fetch(`http://127.0.0.1:8000/musics/${songData.id}/unlike/`, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log('json', json)
                setsongData(json)
                props.updateLikedMusicData()
            })
            .catch(err => {
                console.log(err)
            });
    }


    const onSongClick = () => {

        console.log("song")
        if (audios.currentSource.id === props.index - 1) {
            console.log('same id');
            audios.currentSource.audio.paused ? resume() : pause()
            props.updatePlayState('resume');
        }
        else {
            // console.log("linkkkkkkkkkk", audios.currentPlaylistSongsSources[props.index - 1])
            play(props.index - 1);
            props.changeCurrentPlayingSong(songData)
            props.updatePlayState('play');
        }
        setisPlaying(!isPlaying)
    }



    return (
        <div id="song">
            <div id="numberOrIcon">
                {/* <div id="songNumber">
                    <div >{props.index}</div>
                </div>
                <div id="playPauseIcon" >
                    <PlayPauseIcon  {...props} songData={songData} />
                </div> */}
                {/* {console.log(audios.currentSource.id, props.index - 1)} */}
                {(audios.currentSource.id == props.index - 1) && isPlaying ? <img width="15" src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
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





// class Song extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             songData: null,
//             isPlaying: false
//         }
//     }
//     token = localStorage.getItem('token')

//     componentDidMount() {

//         console.log('class')  
//         fetch(this.props.song, { //song api
//             "headers": { "Authorization": `Token ${this.token}` },
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((myJson) => {
//                 this.setState({ songData: myJson })
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }

//     static getDerivedStateFromProps(props, state) {
//         // console.log("getderivedsate is called");
//         if (props.currentPlayingSong && props.currentPlayingSong.id !== state.songData.id) {
//             return {
//                 isPlaying: false
//             }
//         }
//         return null;
//     }

//     likeMusic = (songData) => {
//         console.log('like  id', songData.id)
//         const requestOptions = {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Authorization": `Token ${this.token}` }
//         }
//         fetch(`http://127.0.0.1:8000/musics/${songData.id}/like/`, requestOptions)
//             .then(response => {
//                 return response.json()
//             })
//             .then(json => {
//                 this.setState({ songData: json })
//                 this.props.updateLikedMusicData()
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }

//     unlikeMusic = (songData) => {
//         console.log('unlike  id', songData.id)
//         const requestOptions = {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Authorization": `Token ${this.token}` }
//         }
//         fetch(`http://127.0.0.1:8000/musics/${songData.id}/unlike/`, requestOptions)
//             .then(response => {
//                 return response.json()
//             })
//             .then(json => {
//                 this.setState({ songData: json })
//                 this.props.updateLikedMusicData()
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }


//     onSongClick = () => {
//         if (this.state.isPlaying) {
//             pause();
//             this.props.updatePlayState('pause');
//         }
//         else if (this.props.currentPlayingSong && this.props.currentPlayingSong.id === this.state.songData.id) {
//             resume();
//             this.props.updatePlayState('resume');
//         }
//         else {
//             play(this.state.songData.music_path);
//             this.props.changeCurrentPlayingSong(this.state.songData)
//             this.props.updatePlayState('play');
//         }
//         this.setState({ isPlaying: !this.state.isPlaying })
//     }

//     render() {
//         console.log("song rendered");
//         return (
//             <div id="song">
//                 <div id="numberOrIcon">
//                     <div id="songNumber">
//                         <div >{this.props.index}</div>
//                     </div>
//                     <div id="playPauseIcon" >
//                         <PlayPauseIcon  {...this.props} songData={this.state.songData} />
//                     </div>
//                 </div>
//                 <div id="songNamenArtists" onClick={this.onSongClick}>
//                     <div>{this.state.songData ? this.state.songData.name : ""}</div>
//                     <div id="songArtists">{this.state.songData ? this.state.songData.artist.join(", ") : ""}</div>
//                 </div>
//                 <div id="songAlbum">
//                     <div>{this.state.songData ? this.state.songData.album.name : ""}</div>
//                 </div>
//                 <div id="songActions">
//                     <div>
//                         {this.state.songData && <IsLikedIcon songData={this.state.songData} likeMusic={this.likeMusic} unlikeMusic={this.unlikeMusic} />}
//                     </div>
//                     <div>
//                         {this.props.created_by !== "SpotifyAdmin" && <HighlightOffIcon onClick={() => this.props.updateMusicData(this.state.songData.url, true)} />}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }





// class Song extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             songData: null,
//             isPlaying: false
//         }
//     }
//     token = localStorage.getItem('token')

//     componentDidMount() {

//         fetch(this.props.song, { //song api
//             "headers": { "Authorization": `Token ${this.token}` },
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((myJson) => {
//                 // console.log("json song link", myJson.music_path)
//                 audios.currentPlaylistSongsSources[this.props.index - 1] = {
//                     name: myJson.name,
//                     artists: myJson.artist,
//                     music_path: myJson.music_path,
//                     cover: myJson.album.image
//                 }
//                 this.setState({ songData: myJson })
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }

//     // static getDerivedStateFromProps(props, state) {
//     //     // console.log("getderivedstate is called");
//     //     if (props.currentPlayingSong && props.currentPlayingSong.id !== state.songData.id) {
//     //         return {
//     //             isPlaying: false
//     //         }
//     //     }
//     //     return null;
//     // }

//     likeMusic = (songData) => {
//         console.log('like  id', songData.id)
//         const requestOptions = {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Authorization": `Token ${this.token}` }
//         }
//         fetch(`http://127.0.0.1:8000/musics/${songData.id}/like/`, requestOptions)
//             .then(response => {
//                 return response.json()
//             })
//             .then(json => {
//                 this.setState({ songData: json })
//                 this.props.updateLikedMusicData()
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }

//     unlikeMusic = (songData) => {
//         console.log('unlike  id', songData.id)
//         const requestOptions = {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Authorization": `Token ${this.token}` }
//         }
//         fetch(`http://127.0.0.1:8000/musics/${songData.id}/unlike/`, requestOptions)
//             .then(response => {
//                 return response.json()
//             })
//             .then(json => {
//                 this.setState({ songData: json })
//                 this.props.updateLikedMusicData()
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }


//     // onSongClick = () => {
//     //     if (this.state.isPlaying) {
//     //         pause();
//     //         this.props.updatePlayState('pause');
//     //     }
//     //     else if (this.props.currentPlayingSong && this.props.currentPlayingSong.id === this.state.songData.id) {
//     //         resume();
//     //         this.props.updatePlayState('resume');
//     //     }
//     //     else {
//     //         console.log("linkkkkkkkkkk", audios.currentPlaylistSongsSources[this.props.index-1])
//     //         play(this.props.index - 1);
//     //         this.props.changeCurrentPlayingSong(this.state.songData)
//     //         this.props.updatePlayState('play');
//     //     }
//     //     this.setState({ isPlaying: !this.state.isPlaying })
//     // }
//     onSongClick = () => {
//         console.log("song")
//         // if (this.state.isPlaying) {
//         //     pause();
//         //     this.props.updatePlayState('pause');
//         // }
//         if (audios.currentSource.id === this.props.index - 1) {
//             console.log('same id');
//             audios.currentSource.audio.paused ? resume() : pause()
//             this.props.updatePlayState('resume');
//         }
//         else {
//             console.log("linkkkkkkkkkk", audios.currentPlaylistSongsSources[this.props.index - 1])
//             play(this.props.index - 1);
//             this.props.changeCurrentPlayingSong(this.state.songData)
//             this.props.updatePlayState('play');
//         }

//         this.setState({ isPlaying: !this.state.isPlaying })
//     }

//     render() {
//         console.log("songggggggggggggggggggggggg rendered", audios.currentSource.audio.id == this.props.index - 1);
//         return (
//             <div id="song">
//                 <div id="numberOrIcon">
//                     {/* <div id="songNumber">
//                         <div >{this.props.index}</div>
//                     </div>
//                     <div id="playPauseIcon" >
//                         <PlayPauseIcon  {...this.props} songData={this.state.songData} />
//                     </div> */}
//                     {audios.currentSource.id == this.props.index - 1 ? <img width="15" src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
//                         alt="playingGif" /> : this.props.index}
//                 </div>
//                 <div id="songNamenArtists" onClick={this.onSongClick}>
//                     <div>{this.state.songData ? this.state.songData.name : ""}</div>
//                     <div id="songArtists">{this.state.songData ? this.state.songData.artist.join(", ") : ""}</div>
//                 </div>
//                 <div id="songAlbum">
//                     <div>{this.state.songData ? this.state.songData.album.name : ""}</div>
//                 </div>
//                 <div id="songActions">
//                     <div>
//                         {this.state.songData && <IsLikedIcon songData={this.state.songData} likeMusic={this.likeMusic} unlikeMusic={this.unlikeMusic} />}
//                     </div>
//                     <div>
//                         {this.props.created_by !== "SpotifyAdmin" && <HighlightOffIcon onClick={() => this.props.updateMusicData(this.state.songData.url, true)} />}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default Song


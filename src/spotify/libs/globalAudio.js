// import { useEffect, useRef } from "react"

// // var audios = {
// //     'currentPlaying': null
// // }

// // export const play = (source) => {
// //     if (audios['currentPlaying']) {
// //         audios['currentPlaying'].pause()
// //     }
// //     audios['currentPlaying'] = new Audio(source)
// //     audios['currentPlaying'].play()
// //     console.log("edeeeeeeee", audios['currentPlaying'].loop)
// //     audios['currentPlaying'].loop = true
// //     console.log("edeeeeeeee", audios['currentPlaying'].loop)
// // }

// // export const pause = () => {
// //     audios['currentPlaying'].pause()
// // }

// // export const resume = () => {
// //     audios['currentPlaying'].play()
// // }

// // export default {
// //     // pause,
// //     play
// // };

// export var audios = {
//     "currentSource": {
//         "audio": new Audio("https://s9.as09210315.pw/2103152315/tely138nkr2ncsa/Jaanu%20-%20(2020)/[iSongs.info]%2003%20-%20Life%20Of%20Ram.mp3"),
//         "id": null
//     } ,
//     "currentPlaylistSongsSources" : []
// }

// export const play = (id) => {
//     if (audios.currentSource.audio) {
//         audios.currentSource.audio.pause()
//     }
//     audios.currentSource = {
//         audio: new Audio(audios.currentPlaylistSongsSources[id].music_path),
//         id : id
//     }
//     console.log("globall", audios.currentSource.id)
//     audios.currentSource.audio.play()
// }

// export const pause = () => {
//     audios.currentSource.audio.pause()
// }

// export const resume = () => {
//     audios.currentSource.audio.play()
// }

// // export default play()

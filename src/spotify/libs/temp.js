// // const quadraCover = (
// //     <div id="outer">
// //         <div id="row">
// //             <div id="block">
// //                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
// //             </div>
// //             <div id="block">
// //                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
// //             </div>
// //         </div>
// //         <div id="row">
// //             <div id="block">
// //                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
// //             </div>
// //             <div id="block">
// //                 <img src="https://i.scdn.co/image/ab67616d00001e02ec012b8f136b71395881309d" />
// //             </div>
// //         </div>
// //     </div>
// // )

// // import React from 'react';
// // import PropTypes from 'prop-types';
// // import { withStyles, makeStyles } from '@material-ui/core/styles';
// // import Slider from '@material-ui/core/Slider';
// // import Typography from '@material-ui/core/Typography';
// // import Tooltip from '@material-ui/core/Tooltip';

// // const useStyles = makeStyles((theme) => ({
// //     root: {
// //         width: 300 + theme.spacing(3) * 2,
// //     },
// //     margin: {
// //         height: theme.spacing(3),
// //     },
// // }));

// // function ValueLabelComponent(props) {
// //     const { children, open, value } = props;

// //     return (
// //         <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
// //             {children}
// //         </Tooltip>
// //     );
// // }

// // ValueLabelComponent.propTypes = {
// //     children: PropTypes.element.isRequired,
// //     open: PropTypes.bool.isRequired,
// //     value: PropTypes.number.isRequired,
// // };

// // export default function CustomizedSlider() {
// //     const classes = useStyles();

// //     return (
// //         <div className={classes.root}>
// //             <Typography gutterBottom>Tooltip value label</Typography>
// //             <Slider
// //                 ValueLabelComponent={ValueLabelComponent}
// //                 aria-label="custom thumb label"
// //                 // defaultValue={20}
// //             />
// //         </div>
// //     );
// // }



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import VolumeDown from '@material-ui/icons/VolumeDown';
// import VolumeUp from '@material-ui/icons/VolumeUp';

// const useStyles = makeStyles({
//     root: {
//         width: 400,
//     },
// });

// export default function ContinuousSlider() {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(30);

//     const handleChange = (event, newValue) => {
//         console.log(newValue)
//         setValue(newValue);
//     };

//     return (
//         <div className={classes.root}>
//             <Grid container spacing={2}>
//                 <Grid item xs>
//                     <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }







// const useMultiAudio = urls => {
//     const [sources] = useState(
//         urls.map(url => {
//             return {
//                 url,
//                 audio: new Audio(url),
//             }
//         }),
//     )

//     const [players, setPlayers] = useState(
//         urls.map(url => {
//             return {
//                 url,
//                 playing: false,
//             }
//         }),
//     )

//     const toggle = targetIndex => () => {
//         const newPlayers = [...players]
//         const currentIndex = players.findIndex(p => p.playing === true)
//         if (currentIndex !== -1 && currentIndex !== targetIndex) {
//             newPlayers[currentIndex].playing = false
//             newPlayers[targetIndex].playing = true
//         } else if (currentIndex !== -1) {
//             newPlayers[targetIndex].playing = false
//         } else {
//             newPlayers[targetIndex].playing = true
//         }
//         setPlayers(newPlayers)
//     }

//     useEffect(() => {
//         sources.forEach((source, i) => {
//             players[i].playing ? source.audio.play() : source.audio.pause()
//         })
//     }, [sources, players])

//     useEffect(() => {
//         sources.forEach((source, i) => {
//             source.audio.addEventListener('ended', () => {
//                 const newPlayers = [...players]
//                 newPlayers[i].playing = false
//                 setPlayers(newPlayers)
//             })
//         })
//         return () => {
//             sources.forEach((source, i) => {
//                 source.audio.removeEventListener('ended', () => {
//                     const newPlayers = [...players]
//                     newPlayers[i].playing = false
//                     setPlayers(newPlayers)
//                 })
//             })
//         }
//     }, [])

//     return [players, toggle]
// }

// const MultiPlayer = ({ urls }) => {
//     const [players, toggle] = useMultiAudio(urls)

//     return (
//         <div>
//             {players.map((player, i) => (
//                 <Player key={i} player={player} toggle={toggle(i)} />
//             ))}
//         </div>
//     )
// }

// const Player = ({ player, toggle }) => (
//     <div>
//         <p>Stream URL: {player.url}</p>
//         <button onClick={toggle}>{player.playing ? 'Pause' : 'Play'}</button>
//     </div>
// )


// // export default MultiPlayer

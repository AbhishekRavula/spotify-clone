import '../styles/Playlist.css'
import { useHistory } from 'react-router-dom';

export function Playlist(props) {
  
  const history = useHistory();

  return (
    <div id="card-container" onClick={() => history.push(`/playlists/${props.id}`)}>
      <div id="card-img">
        <img id="img" src={props.image} alt="playlist_cover"></img>
      </div>
      <div id="card-content">
        <div id="playlist_name">{props.name}</div>
        <div id="playlist_desc">{props.description}</div>
      </div>
    </div>
  )
};

export default Playlist

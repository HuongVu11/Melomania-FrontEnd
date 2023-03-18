import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

function SongShow (props) {
    const {id} = useParams()
    const Navigate = useNavigate()
    const songData = props.song
    const song = songData.find((s)=> s._id === id)
    
    const handleDelete = () => {
        props.deleteSong(id)
        Navigate('/')
    }
    
    return (
        <div className="container"> 
            <h1>{song.title}</h1>
            <div style={{width: 50 + 'vw'}}>
                <img src={song.image} alt={song.title} className="img-fluid p-5"/>
            </div>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <a href={song.link} className="badge badge-info">Listen</a>
            <div>
                <Link to={`/song/${id}/update`}>
                    <button className="btn btn-secondary m-1">
                        EDIT
                    </button>
                </Link>
                <button id='delete' onClick={handleDelete} className="btn btn-secondary m-1" >
                    DELETE
                </button>
            </div>
        </div>
    )
}

export default SongShow
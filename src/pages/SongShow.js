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
            <img src={song.img} alt={song.title}/>
            <p>Artist: {song.artist}</p>
            <p>Album: {song.album}</p>
            <a href="https://www.youtube.com/watch?v=Xc0_zxvZ5Lw">Listen</a>
            <div>
                <Link to={`/song/${id}/update`}>
                    <button>
                        EDIT
                    </button>
                </Link>
                <button id='delete' onClick={handleDelete}>
                    DELETE
                </button>
            </div>
        </div>
    )
}

export default SongShow
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Lyrics from "../components/Lyrics"

function SongShow (props) {
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [song, setSong] = useState(null)
    const handleDelete = () => {
        props.deleteSong(id)
        navigate('/song')
    }
    const URL = `${props.URL}/songs/${id}`

    useEffect(() => {
        const getaSong = async () => {
          const response = await fetch(URL);
          const data = await response.json();
          setSong(data);
        };
        getaSong();
      }, [URL]);


    const Loaded = () => {
        return (
            <div className="container"> 
                <h1>{song.title}</h1>
                <div style={{width: 50 + 'vw'}}>
                    <img src={song.image} alt={song.title} className="img-fluid p-5"/>
                </div>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <audio controls src={song.link}></audio>
                <div className="mt-3">
                    <Link to={`/song/${id}/update`}>
                        <button className="btn btn-secondary m-1">
                            EDIT
                        </button>
                    </Link>
                    <button id='delete' onClick={handleDelete} className="btn btn-secondary m-1" >
                        DELETE
                    </button>
                </div>
                <Lyrics song={song}/>
            </div>
        )
    }

    const Loading = () => {
        return <div className='loader'></div>
    };

    return song?  <Loaded /> : <Loading />
}

export default SongShow
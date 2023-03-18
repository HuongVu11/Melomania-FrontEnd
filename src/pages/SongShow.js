import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"
import { useState,useEffect } from "react"

function SongShow (props) {
    const {id} = useParams()
    const Navigate = useNavigate()
    
    const [song, setSong] = useState(null)
    const handleDelete = () => {
        props.deleteSong(id)
        Navigate('/')
    }
    const URL = `${props.URL}/${id}`

    useEffect(() => {
        const getaSong = async () => {
          const response = await fetch(URL);
          console.log(response)
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
        </div>
        )
    }

    const Loading = () => {
        return <h1>Loading...</h1>;
    };

    return song?  <Loaded /> : <Loading />
}

export default SongShow
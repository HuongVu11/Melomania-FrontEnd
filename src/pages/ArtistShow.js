import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

function ArtistShow (props) {
    const {id} = useParams()

    const [artist, setArtist] = useState(null)

    const getArtistsData = async () => {
        const response = await fetch (`${props.URL}/artists/${id}`)
        const data = await response.json()
        setArtist(data)
    }

    const ArtistSongs = () => {
        return artist.songs.map(song => (
            <div key={song._id} className='artistSong'>
                <p className="gridItem">{song.title}</p>
                <audio className="gridItem" controls src={song.link}></audio>
            </div>
        ))
    }

    const Loading = () => {
        return (
            <div>Loading</div>
        )
    }

    const Loaded = () => {
        return ( 
            <div className="ctn">
                <h1 className="my-3">{artist.name}</h1>
                <img src={artist.image} alt={artist.title} className="img-fluid p-5"/>
                    <ArtistSongs />
            </div>
        )
    }
    useEffect(()=> {
        getArtistsData()
        // eslint-disable-next-line
      }, [])

    return artist ? <Loaded /> : <Loading />
}

export default ArtistShow
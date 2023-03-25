import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

function ArtistShow (props) {
    const {id} = useParams()

    const [artist, setArtist] = useState(null)

    const getArtistsData = async () => {
        const response = await fetch (`${props.URL}/artists/${id}`)
        const data = await response.json()
        // console.log(data)
        setArtist(data)
    }

    const ArtistSongs = () => {
        return artist.songs.map(song => (
            <div key={song._id} className='artistSong'>
                <p>{song.title}</p>
                <audio controls src={song.link}></audio>
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
            <div className="container">
                <h1>{artist.name}</h1>
                <h2>Albums: {artist.nb_album}</h2>
                <h2>Fans: {artist.nb_fan.toLocaleString('en-US')}</h2>
                <img src={artist.image} alt={artist.title} className="img-fluid p-5"/>
                <ArtistSongs />
            </div>
        )
    }

    useEffect(()=> {
        getArtistsData()
      }, [])

    return artist ? <Loaded /> : <Loading />
}

export default ArtistShow
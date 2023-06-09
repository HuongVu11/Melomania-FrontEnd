import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'

const ArtistIndex = (props) => {

    const [artists, setArtists] = useState(null)

    const getArtistsData = async () => {
        const response = await fetch (`${props.URL}/artists`)
        const data = await response.json()
        // console.log(data)
        setArtists(data)
    }
    useEffect(()=> {
      getArtistsData()
      // eslint-disable-next-line
    }, [])

    const loaded = () => {
      return artists.map((artist)=> (
        <div key={artist._id} className="artist">
            <Link to={`/artist/${artist._id}`}>
                <img className="artistImage" alt={artist.name} src ={artist.image}/>
            </Link>
          <h1>{artist.name}</h1>
          <h2>Albums: {artist.nb_album}</h2>
          <h2>Fans: {artist.nb_fan.toLocaleString('en-US')}</h2>
        </div>
      ))
    }

    const loading = () => {
      return <h1>Loading...</h1>
    }

    return (
        <div className="artistContainer">
            {artists ? loaded() : loading()}
        </div>
    )
  }

export default ArtistIndex
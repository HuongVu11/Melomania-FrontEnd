import { useEffect, useState } from "react"

const ArtistIndex = (props) => {

    const [artists, setArtists] = useState(null)

    const getArtistsData = async () => {
      const response = await fetch (`${props.URL}/artists`)
      const data = await response.json()
    console.log(data)
      setArtists(data)
    }
    useEffect(()=> {
      getArtistsData()
    }, [])

    const loaded = () => {
      return artists.map((artist)=> (
        <div className="artist">
          <h1>{artist.name}</h1>
          <img src ={artist.image}/>
          <h2>Albums: {artist.nb_album}</h2>
          <h2>Fans: {artist.nb_fan}</h2>
        </div>
      ))
    }

    const loading = () => {
      return <h1>Loading...</h1>
    }

    return artists ? loaded() : loading()
  }

export default ArtistIndex
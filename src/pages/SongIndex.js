import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { BsSortAlphaUpAlt, BsSortAlphaUp, BsList } from "react-icons/bs";
import Form from "../components/Form";

function SongIndex (props) {

    const [songs, setSongs] = useState(props.song)
    const [asc, setAscen] = useState(true)
    const [column, setColumn] = useState({name: 'image'})

    const getSong = async () => {
        const response = await fetch(`https://melomania-adh.herokuapp.com/songs`)
        const data = await response.json()
        setSongs(data)
    };

    const sortByTitle = () => {
        setColumn({name: 'song'})
        const songsSorted = [...songs].sort((a, b) => {
            const itemA = a.title.toUpperCase()
            const itemB = b.title.toUpperCase()
            return itemA.localeCompare(itemB)
        })
        if (asc) {
            setSongs(songsSorted)
            setAscen(false)
        } else {
            const reversedSongs = songsSorted.reverse()
            setSongs(reversedSongs)
            setAscen(true)
        }
    }

    const sortByArtist = () => {
        setColumn({name: 'artist'})
        const songsSorted = [...songs].sort((a, b) => {
            const nameA = a.artist.toUpperCase()
            const nameB = b.artist.toUpperCase()
            return nameA.localeCompare(nameB)
         })
         if (asc) {
            setSongs(songsSorted)
            setAscen(false)
        } else {
            const reversedSongs = songsSorted.reverse()
            setSongs(reversedSongs)
            setAscen(true)
        }
    }

    const Loaded = () => {

        const getSongList = () => {
            return songs.map(song => (
                <tr key={song._id}>
                    <td>  
                        <img src={song.image} alt={song.title} />   
                    </td>
                    <td>
                        <Link to={`/song/${song._id}`}>
                            {song.title}
                        </Link>
                    </td>
                    <td>{song.artist}</td>
                </tr>
            ))
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className='sortHeader' onClick={sortByTitle}>Song 
                            {column.name === 'song' ? 
                                (asc ? <BsSortAlphaUpAlt/> : <BsSortAlphaUp/>) 
                                : <BsList/>
                            }
                        </th>
                        <th className='sortHeader' onClick={sortByArtist}>Artist
                            {column.name === 'artist' ? 
                                (asc ? <BsSortAlphaUpAlt/> : <BsSortAlphaUp/>) 
                                : <BsList/>
                            }
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {getSongList()}
                </tbody>
            </table>
        )
    }

    const Loading = () => {
        return <div className='loader'></div>
    }

    useEffect(() => {
        getSong()
    }, [])

    return (
        <div className="container">
            <Form setSongs={setSongs}/>
            <h1 className="mt-3">Song List</h1>
            <div className="my-3">
                {props.song ? <Loaded /> : <Loading />}
            </div>
        </div>
    )
}

export default SongIndex
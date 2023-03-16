import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

function SongUpdate (props) {
    const {id} = useParams()
    const navigate = useNavigate()
    const songData = props.song
    const song = songData.find((s)=> s._id === id)
  
    const [editForm, setEditForm] = useState(song)

    const handleChange = (e) => {
        setEditForm(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateSong(editForm, id)
        navigate('/')
    }

    return (
        <div>
            <h1>Update</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={editForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.artist}
                    name='artist'
                    placeholder='artist'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.album}
                    name='album'
                    placeholder='album'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.image}
                    name='image'
                    placeholder='image'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={editForm.link}
                    name='link'
                    placeholder='link'
                    onChange={handleChange}
                />
                <input type='submit' value='Update' />
            </form>
        </div>
    )
}

export default SongUpdate
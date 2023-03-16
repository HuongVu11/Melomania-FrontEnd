import {useState} from 'react'
import { useNavigate } from "react-router-dom"

function SongCreate (props) {
    const navigate = useNavigate()
    const [newForm, setNewForm] = useState({
        title: '',
        artist: '',
        album: '',
        image: '',
        link: ''
    })

    const handleChange = (e) => {
        setNewForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newForm)
        props.createSong(newForm)
        setNewForm({
            title: '',
            artist: '',
            album: '',
            image: '',
            link: ''
        })
        navigate('/')
    }

    return (
        <div>
            <h1>Add new song</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.artist}
                    name='artist'
                    placeholder='artist'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.album}
                    name='album'
                    placeholder='album'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.image}
                    name='image'
                    placeholder='image'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    value={newForm.link}
                    name='link'
                    placeholder='link'
                    onChange={handleChange}
                />
                <input type='submit' value='Add new' />
            </form>
        </div>
    )
}

export default SongCreate